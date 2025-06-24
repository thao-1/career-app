class CareerHackPopup {
  constructor() {
    this.currentTab = null
    this.currentSite = null
    this.formDetected = false
    this.profile = null
    this.settings = null
    this.init()
  }

  async init() {
    await this.loadData()
    
    // Check if profile is complete
    if (!this.isProfileComplete()) {
      this.showProfileIncompleteUI()
      return
    }
    
    // If profile is complete, continue with normal flow
    await this.detectCurrentSite()
    this.bindEvents()
    this.updateUI()
    this.checkFormDetection()
  }
  
  isProfileComplete() {
    return this.profile && 
           this.profile.firstName && 
           this.profile.lastName && 
           this.profile.email
  }
  
  showProfileIncompleteUI() {
    const container = document.getElementById('mainContent')
    container.innerHTML = `
      <div class="profile-incomplete">
        <h3>Profile Incomplete</h3>
        <p>Please complete your profile to start using CareerHack</p>
        <button id="completeProfileBtn" class="button primary">
          Complete Profile
        </button>
      </div>
    `
    
    document.getElementById('completeProfileBtn').addEventListener('click', () => {
      chrome.runtime.openOptionsPage()
    })
  }

  async loadData() {
    try {
      const result = await chrome.storage.local.get(["profile", "settings", "appliedJobs"])
      this.profile = result.profile || {}
      this.settings = result.settings || this.getDefaultSettings()
      this.appliedJobs = result.appliedJobs || []
    } catch (error) {
      console.error("Error loading data:", error)
      this.showNotification("Error loading profile data", "error")
    }
  }

  getDefaultSettings() {
    return {
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
  }

  async detectCurrentSite() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      this.currentTab = tab

      if (!tab.url) return

      // Detect which job site we're on
      if (tab.url.includes("linkedin.com")) {
        this.currentSite = "linkedin"
      } else if (tab.url.includes("indeed.com")) {
        this.currentSite = "indeed"
      } else if (tab.url.includes("glassdoor.com")) {
        this.currentSite = "glassdoor"
      } else if (tab.url.includes("ziprecruiter.com")) {
        this.currentSite = "ziprecruiter"
      }

      if (this.currentSite) {
        document.getElementById("currentSite").style.display = "block"
        document.getElementById("siteName").textContent = this.getSiteDisplayName(this.currentSite)
      }
    } catch (error) {
      console.error("Error detecting current site:", error)
    }
  }

  getSiteDisplayName(site) {
    const names = {
      linkedin: "LinkedIn",
      indeed: "Indeed",
      glassdoor: "Glassdoor",
      ziprecruiter: "ZipRecruiter",
    }
    return names[site] || site
  }

  async checkFormDetection() {
    if (!this.currentTab || !this.currentSite) return

    try {
      // Send message to content script to check for forms
      const response = await chrome.tabs.sendMessage(this.currentTab.id, {
        action: "detectForms",
      })

      if (response && response.formDetected) {
        this.formDetected = true
        document.getElementById("formDetected").style.display = "block"
        document.getElementById("fillFormBtn").disabled = false
        document.getElementById("previewBtn").disabled = false
      }
    } catch (error) {
      // Content script might not be loaded yet
      console.log("Content script not ready:", error)
    }
  }

  bindEvents() {
    // Add event listener for options page updates
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.profile) {
        this.profile = changes.profile.newValue
        if (this.isProfileComplete()) {
          // Reload the popup to show the main UI
          window.location.reload()
        }
      }
    })
    
    // Site toggles - using event delegation for dynamically added elements
    const siteContainer = document.querySelector('.site-status')
    if (siteContainer) {
      siteContainer.addEventListener('click', (e) => {
        const toggle = e.target.closest('.site-toggle')
        if (toggle) {
          const site = toggle.dataset.site
          this.toggleSite(site)
        }
      })
    }

    // Checkbox toggles
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]')
    toggleSwitches.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const site = e.target.dataset.site
        if (site) {
          this.toggleSite(site, e.target.checked)
        }
      })
    })

    // Main action buttons
    const fillFormBtn = document.getElementById("fillFormBtn")
    if (fillFormBtn) {
      fillFormBtn.addEventListener("click", () => this.fillForm())
    }

    const previewBtn = document.getElementById("previewBtn")
    if (previewBtn) {
      previewBtn.addEventListener("click", () => this.previewForm())
    }

    // Footer links
    const helpLink = document.getElementById("helpLink")
    if (helpLink) {
      helpLink.addEventListener("click", (e) => {
        e.preventDefault()
        chrome.tabs.create({ url: "https://github.com/yourusername/careerhack#readme" })
      })
    }

    const aboutLink = document.getElementById("aboutLink")
    if (aboutLink) {
      aboutLink.addEventListener("click", (e) => {
        e.preventDefault()
        chrome.tabs.create({ url: "https://careerhack.com/about" })
      })
    }

    const feedbackLink = document.getElementById("feedbackLink")
    if (feedbackLink) {
      feedbackLink.addEventListener("click", (e) => {
        e.preventDefault()
        chrome.tabs.create({ url: "https://careerhack.com/feedback" })
      })
    }

    const privacyLink = document.getElementById("privacyLink")
    if (privacyLink) {
      privacyLink.addEventListener("click", (e) => {
        e.preventDefault()
        chrome.tabs.create({ url: "https://github.com/yourusername/careerhack/privacy" })
      })
    }
  }

  updateUI() {
    this.updateProfileStatus()
    this.updateSiteToggles()
    this.updateActionButtons()
  }

  updateProfileStatus() {
    const requiredFields = ["firstName", "lastName", "email", "phone"]
    const completedFields = requiredFields.filter((field) => this.profile[field] && this.profile[field].trim())

    const isComplete = completedFields.length === requiredFields.length
    const statusEl = document.getElementById("profileStatus")
    const summaryEl = document.getElementById("profileSummary")

    if (isComplete) {
      statusEl.textContent = "Complete"
      statusEl.className = "status-badge ready"
      summaryEl.textContent = `Profile ready for ${this.profile.firstName} ${this.profile.lastName}`
    } else {
      statusEl.textContent = "Incomplete"
      statusEl.className = "status-badge incomplete"
      summaryEl.textContent = `${completedFields.length}/${requiredFields.length} required fields completed`
    }
  }

  updateSiteToggles() {
    document.querySelectorAll(".site-toggle").forEach((toggle) => {
      const site = toggle.dataset.site
      const isEnabled = this.settings.enabledSites[site]
      toggle.classList.toggle("active", isEnabled)
    })
  }

  updateActionButtons() {
    const profileComplete = this.isProfileComplete()
    const siteEnabled = this.currentSite && this.settings.enabledSites[this.currentSite]

    const canFill = profileComplete && siteEnabled && this.formDetected

    document.getElementById("fillFormBtn").disabled = !canFill
    document.getElementById("previewBtn").disabled = !canFill
  }

  isProfileComplete() {
    const requiredFields = ["firstName", "lastName", "email", "phone"]
    return requiredFields.every((field) => this.profile[field] && this.profile[field].trim())
  }

  async toggleSite(site) {
    this.settings.enabledSites[site] = !this.settings.enabledSites[site]
    await chrome.storage.local.set({ settings: this.settings })
    this.updateSiteToggles()
    this.updateActionButtons()
  }

  async fillForm() {
    if (!this.currentTab || !this.currentSite) {
      this.showNotification("Please navigate to a job site first", "error")
      return
    }

    if (!this.isProfileComplete()) {
      this.showNotification("Please complete your profile first", "error")
      return
    }

    try {
      this.showNotification("Filling form...", "info")

      const response = await chrome.tabs.sendMessage(this.currentTab.id, {
        action: "fillForm",
        profile: this.profile,
        settings: this.settings,
      })

      if (response && response.success) {
        this.showNotification("Form filled successfully!", "success")

        // Track this application
        await this.trackApplication()
      } else {
        this.showNotification(response?.error || "Failed to fill form", "error")
      }
    } catch (error) {
      console.error("Error filling form:", error)
      this.showNotification("Error filling form", "error")
    }
  }

  async previewForm() {
    if (!this.currentTab) return

    try {
      const response = await chrome.tabs.sendMessage(this.currentTab.id, {
        action: "previewForm",
        profile: this.profile,
      })

      if (response && response.preview) {
        this.showPreviewModal(response.preview)
      }
    } catch (error) {
      console.error("Error generating preview:", error)
      this.showNotification("Error generating preview", "error")
    }
  }

  showPreviewModal(preview) {
    // Create a simple preview display
    const previewText = Object.entries(preview)
      .map(([field, value]) => `${field}: ${value}`)
      .join("\n")

    alert(`Form Preview:\n\n${previewText}\n\nClick "Fill Application Form" to proceed.`)
  }

  async trackApplication() {
    if (!this.currentTab) return

    try {
      // Get job details from the page
      const response = await chrome.tabs.sendMessage(this.currentTab.id, {
        action: "getJobDetails",
      })

      if (response && response.jobDetails) {
        const application = {
          id: Date.now().toString(),
          ...response.jobDetails,
          site: this.currentSite,
          url: this.currentTab.url,
          appliedAt: new Date().toISOString(),
          status: "applied",
        }

        this.appliedJobs.push(application)
        await chrome.storage.local.set({ appliedJobs: this.appliedJobs })
      }
    } catch (error) {
      console.error("Error tracking application:", error)
    }
  }

  openHistory() {
    chrome.tabs.create({ url: chrome.runtime.getURL("history.html") })
  }

  openSettings() {
    chrome.runtime.openOptionsPage()
  }

  showNotification(message, type = "info") {
    const notification = document.getElementById("notification")
    notification.textContent = message
    notification.className = `notification show ${type}`

    setTimeout(() => {
      notification.classList.remove("show")
    }, 3000)
  }
}

// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CareerHackPopup()
})
