// Import config
const CONFIG = window.CONFIG || {};

class CareerHackBackground {
  constructor() {
    this.apiKey = CONFIG.JSEARCH_API_KEY;
    this.init();
  }

  init() {
    // Handle extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstallation(details)
    })

    // Handle messages from content scripts and popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse)
      return true // Keep message channel open for async responses
    })

    // Handle tab updates to inject content scripts
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.handleTabUpdate(tabId, changeInfo, tab)
    })

    // Set up periodic cleanup
    this.setupPeriodicTasks()
  }

  handleInstallation(details) {
    console.log("CareerHack installed:", details)

    if (details.reason === "install") {
      // First time installation
      this.showWelcomeNotification()
      this.setDefaultSettings()
      chrome.tabs.create({ url: chrome.runtime.getURL("options.html") })
    } else if (details.reason === "update") {
      // Extension updated
      this.showUpdateNotification()
    }
  }

  setDefaultSettings() {
    const defaultSettings = {
      enabledSites: {
        linkedin: true,
        indeed: true,
        glassdoor: true,
        ziprecruiter: true,
      },
      autoFillDelay: 1000,
      requireConfirmation: true,
      preventDuplicates: true,
      respectRateLimit: true,
    }

    const defaultProfile = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      coverLetter: "",
      resume: null,
    }

    chrome.storage.local.set({
      settings: defaultSettings,
      profile: defaultProfile,
      appliedJobs: [],
    })
  }

  async handleMessage(message, sender, sendResponse) {
    try {
      switch (message.action) {
        case "getApiKey":
          sendResponse({ apiKey: this.apiKey });
          return true;
        case "openSettings":
          chrome.runtime.openOptionsPage()
          sendResponse({ success: true })
          break

        case "requestFormFill":
          // Handle form fill request from content script
          const result = await this.handleFormFillRequest(sender.tab)
          sendResponse(result)
          break

        case "requestPreview":
          // Handle preview request from content script
          const previewResult = await this.handlePreviewRequest(sender.tab)
          sendResponse(previewResult)
          break

        case "trackApplication":
          await this.trackApplication(message.application)
          sendResponse({ success: true })
          break

        case "getApplicationHistory":
          const history = await this.getApplicationHistory()
          sendResponse({ success: true, history })
          break

        default:
          sendResponse({ error: "Unknown action" })
      }
    } catch (error) {
      console.error("Background message error:", error)
      sendResponse({ error: error.message })
    }
  }

  handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && this.isJobSite(tab.url)) {
      // Inject content script if not already present
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          files: ["content.js"],
        })
        .catch((error) => {
          // Content script might already be injected
          console.log("Content script injection skipped:", error)
        })
    }
  }

  isJobSite(url) {
    if (!url) return false
    return (
      url.includes("linkedin.com") ||
      url.includes("indeed.com") ||
      url.includes("glassdoor.com") ||
      url.includes("ziprecruiter.com")
    )
  }

  async handleFormFillRequest(tab) {
    try {
      // Get user profile and settings
      const data = await chrome.storage.local.get(["profile", "settings"])

      if (!this.isProfileComplete(data.profile)) {
        return { success: false, error: "Profile incomplete" }
      }

      // Send fill request to content script
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "fillForm",
        profile: data.profile,
        settings: data.settings,
      })

      return response
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async handlePreviewRequest(tab) {
    try {
      const data = await chrome.storage.local.get(["profile"])

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "previewForm",
        profile: data.profile,
      })

      return response
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  isProfileComplete(profile) {
    const requiredFields = ["firstName", "lastName", "email", "phone"]
    return requiredFields.every((field) => profile[field] && profile[field].trim())
  }

  async trackApplication(application) {
    try {
      const result = await chrome.storage.local.get(["appliedJobs"])
      const appliedJobs = result.appliedJobs || []

      appliedJobs.push({
        ...application,
        id: Date.now().toString(),
        appliedAt: new Date().toISOString(),
      })

      await chrome.storage.local.set({ appliedJobs })
    } catch (error) {
      console.error("Error tracking application:", error)
    }
  }

  async getApplicationHistory() {
    try {
      const result = await chrome.storage.local.get(["appliedJobs"])
      return result.appliedJobs || []
    } catch (error) {
      console.error("Error getting application history:", error)
      return []
    }
  }

  setupPeriodicTasks() {
    // Clean up old application data (keep last 30 days)
    setInterval(
      () => {
        this.cleanupOldApplications()
      },
      24 * 60 * 60 * 1000,
    ) // Daily
  }

  async cleanupOldApplications() {
    try {
      const result = await chrome.storage.local.get(["appliedJobs"])
      const appliedJobs = result.appliedJobs || []

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentJobs = appliedJobs.filter((job) => new Date(job.appliedAt) > thirtyDaysAgo)

      await chrome.storage.local.set({ appliedJobs: recentJobs })
    } catch (error) {
      console.error("Error cleaning up applications:", error)
    }
  }

  showWelcomeNotification() {
    try {
      chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("chromeicon.png"),
        title: "Welcome to CareerHack!",
        message: "Your smart job application assistant is ready. Set up your profile to get started.",
      })
    } catch (error) {
      console.log("Could not show welcome notification:", error)
    }
  }

  showUpdateNotification() {
    try {
      chrome.notifications.create({
        type: "basic",
        iconUrl: chrome.runtime.getURL("chromeicon.png"),
        title: "CareerHack Updated!",
        message: "Thank you for updating to the latest version of CareerHack.",
      })
    } catch (error) {
      console.log("Could not show update notification:", error)
    }
  }
}

// Initialize background service
new CareerHackBackground()
