class CareerHackContentScript {
  constructor() {
    this.site = this.detectSite()
    this.formHandler = this.createFormHandler()
    this.init()
  }

  init() {
    this.addCareerHackUI()
    this.setupMessageListener()
    this.observePageChanges()
  }

  detectSite() {
    const hostname = window.location.hostname.toLowerCase()

    if (hostname.includes("linkedin.com")) return "linkedin"
    if (hostname.includes("indeed.com")) return "indeed"
    if (hostname.includes("glassdoor.com")) return "glassdoor"
    if (hostname.includes("ziprecruiter.com")) return "ziprecruiter"

    return null
  }

  createFormHandler() {
    switch (this.site) {
      case "linkedin":
        return new LinkedInFormHandler()
      case "indeed":
        return new IndeedFormHandler()
      case "glassdoor":
        return new GlassdoorFormHandler()
      case "ziprecruiter":
        return new ZipRecruiterFormHandler()
      default:
        return new GenericFormHandler()
    }
  }

  addCareerHackUI() {
    // Add floating action button
    const fab = document.createElement("div")
    fab.id = "careerhack-fab"
    fab.innerHTML = `
      <div class="careerhack-fab-button">
        <span>⚡</span>
      </div>
    `

    fab.addEventListener("click", () => {
      this.showQuickActions()
    })

    document.body.appendChild(fab)
  }

  showQuickActions() {
    // Remove existing panel
    const existing = document.getElementById("careerhack-panel")
    if (existing) {
      existing.remove()
      return
    }

    const panel = document.createElement("div")
    panel.id = "careerhack-panel"
    panel.innerHTML = `
      <div class="careerhack-panel-content">
        <div class="careerhack-panel-header">
          <h3>CareerHack Assistant</h3>
          <button class="careerhack-close">×</button>
        </div>
        <div class="careerhack-panel-body">
          <button class="careerhack-btn primary" id="careerhack-fill">
            📝 Fill Form
          </button>
          <button class="careerhack-btn secondary" id="careerhack-preview">
            👁️ Preview
          </button>
          <button class="careerhack-btn secondary" id="careerhack-settings">
            ⚙️ Settings
          </button>
        </div>
      </div>
    `

    // Bind events
    panel.querySelector(".careerhack-close").addEventListener("click", () => {
      panel.remove()
    })

    panel.querySelector("#careerhack-fill").addEventListener("click", () => {
      this.requestFormFill()
      panel.remove()
    })

    panel.querySelector("#careerhack-preview").addEventListener("click", () => {
      this.showPreview()
      panel.remove()
    })

    panel.querySelector("#careerhack-settings").addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "openSettings" })
      panel.remove()
    })

    document.body.appendChild(panel)
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case "detectForms":
          sendResponse({ formDetected: this.formHandler.detectForms() })
          break

        case "fillForm":
          this.fillForm(message.profile, message.settings)
            .then((result) => sendResponse(result))
            .catch((error) => sendResponse({ success: false, error: error.message }))
          return true // Keep message channel open

        case "previewForm":
          this.previewForm(message.profile)
            .then((result) => sendResponse(result))
            .catch((error) => sendResponse({ success: false, error: error.message }))
          return true

        case "getJobDetails":
          sendResponse({ jobDetails: this.formHandler.getJobDetails() })
          break
      }
    })
  }

  observePageChanges() {
    // Watch for dynamic content changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Check if new forms were added
          this.formHandler.detectForms()
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  async fillForm(profile, settings) {
    try {
      // Show confirmation dialog if required
      if (settings.requireConfirmation) {
        const confirmed = await this.showConfirmationDialog(profile)
        if (!confirmed) {
          return { success: false, error: "User cancelled" }
        }
      }

      // Check for duplicates
      if (settings.preventDuplicates) {
        const isDuplicate = await this.checkDuplicate()
        if (isDuplicate) {
          return { success: false, error: "Already applied to this job" }
        }
      }

      // Fill the form
      const result = await this.formHandler.fillForm(profile, settings)

      if (result.success) {
        this.showSuccessMessage()
      }

      return result
    } catch (error) {
      console.error("Error filling form:", error)
      return { success: false, error: error.message }
    }
  }

  async previewForm(profile) {
    try {
      const preview = await this.formHandler.generatePreview(profile)
      return { success: true, preview }
    } catch (error) {
      console.error("Error generating preview:", error)
      return { success: false, error: error.message }
    }
  }

  async showConfirmationDialog(profile) {
    return new Promise((resolve) => {
      const modal = document.createElement("div")
      modal.id = "careerhack-confirmation-modal"
      modal.innerHTML = `
        <div class="careerhack-modal-overlay">
          <div class="careerhack-modal-content">
            <h3>Confirm Application</h3>
            <p>Fill job application form with your profile data?</p>
            <div class="careerhack-profile-preview">
              <p><strong>Name:</strong> ${profile.firstName} ${profile.lastName}</p>
              <p><strong>Email:</strong> ${profile.email}</p>
              <p><strong>Phone:</strong> ${profile.phone}</p>
            </div>
            <div class="careerhack-modal-actions">
              <button class="careerhack-btn secondary" id="careerhack-cancel">Cancel</button>
              <button class="careerhack-btn primary" id="careerhack-confirm">Fill Form</button>
            </div>
          </div>
        </div>
      `

      modal.querySelector("#careerhack-cancel").addEventListener("click", () => {
        modal.remove()
        resolve(false)
      })

      modal.querySelector("#careerhack-confirm").addEventListener("click", () => {
        modal.remove()
        resolve(true)
      })

      document.body.appendChild(modal)
    })
  }

  async checkDuplicate() {
    try {
      const jobDetails = this.formHandler.getJobDetails()
      const result = await chrome.storage.local.get(["appliedJobs"])
      const appliedJobs = result.appliedJobs || []

      return appliedJobs.some((job) => job.title === jobDetails.title && job.company === jobDetails.company)
    } catch (error) {
      console.error("Error checking duplicates:", error)
      return false
    }
  }

  showSuccessMessage() {
    const message = document.createElement("div")
    message.id = "careerhack-success-message"
    message.innerHTML = `
      <div class="careerhack-success-content">
        <span>✅</span>
        <span>Form filled successfully!</span>
      </div>
    `

    document.body.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 3000)
  }

  requestFormFill() {
    // Send message to popup to trigger form fill
    chrome.runtime.sendMessage({ action: "requestFormFill" })
  }

  showPreview() {
    chrome.runtime.sendMessage({ action: "requestPreview" })
  }
}

// Base form handler class
class BaseFormHandler {
  constructor() {
    this.formSelectors = {}
    this.fieldMappings = {}
  }

  detectForms() {
    const forms = document.querySelectorAll("form")
    return Array.from(forms).some((form) => this.isJobApplicationForm(form))
  }

  isJobApplicationForm(form) {
    // Override in subclasses
    return false
  }

  async fillForm(profile, settings) {
    const forms = this.getJobApplicationForms()
    if (forms.length === 0) {
      throw new Error("No job application forms found")
    }

    const results = []
    for (const form of forms) {
      const result = await this.fillSingleForm(form, profile, settings)
      results.push(result)

      if (settings.respectRateLimit) {
        await this.delay(settings.autoFillDelay || 1000)
      }
    }

    return { success: true, results }
  }

  async fillSingleForm(form, profile, settings) {
    const fields = this.getFormFields(form)
    const filledFields = []

    for (const field of fields) {
      try {
        const value = this.getFieldValue(field, profile)
        if (value) {
          await this.fillField(field, value, settings)
          filledFields.push({ field: field.name || field.id, value })
        }
      } catch (error) {
        console.error("Error filling field:", error)
      }
    }

    return { form: form.id || "unnamed", filledFields }
  }

  getJobApplicationForms() {
    const forms = document.querySelectorAll("form")
    return Array.from(forms).filter((form) => this.isJobApplicationForm(form))
  }

  getFormFields(form) {
    return form.querySelectorAll("input, textarea, select")
  }

  getFieldValue(field, profile) {
    const fieldName = this.identifyField(field)
    return this.mapProfileToField(fieldName, profile)
  }

  identifyField(field) {
    const name = (field.name || "").toLowerCase()
    const id = (field.id || "").toLowerCase()
    const placeholder = (field.placeholder || "").toLowerCase()
    const label = this.getFieldLabel(field)

    // Common field patterns
    if (this.matchesPattern(name, id, placeholder, label, ["first", "fname", "given"])) {
      return "firstName"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["last", "lname", "family", "surname"])) {
      return "lastName"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["email", "mail"])) {
      return "email"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["phone", "mobile", "tel"])) {
      return "phone"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["address", "street"])) {
      return "address"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["city"])) {
      return "city"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["state", "province"])) {
      return "state"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["zip", "postal"])) {
      return "zipCode"
    }
    if (this.matchesPattern(name, id, placeholder, label, ["cover", "letter", "message"])) {
      return "coverLetter"
    }

    return null
  }

  matchesPattern(name, id, placeholder, label, patterns) {
    const text = `${name} ${id} ${placeholder} ${label}`.toLowerCase()
    return patterns.some((pattern) => text.includes(pattern))
  }

  getFieldLabel(field) {
    // Try to find associated label
    if (field.id) {
      const label = document.querySelector(`label[for="${field.id}"]`)
      if (label) return label.textContent.toLowerCase()
    }

    // Check parent elements for label text
    let parent = field.parentElement
    while (parent && parent !== document.body) {
      const label = parent.querySelector("label")
      if (label) return label.textContent.toLowerCase()
      parent = parent.parentElement
    }

    return ""
  }

  mapProfileToField(fieldName, profile) {
    const mapping = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      zipCode: profile.zipCode,
      coverLetter: profile.coverLetter,
    }

    return mapping[fieldName] || null
  }

  async fillField(field, value, settings) {
    // Focus the field
    field.focus()

    // Clear existing value
    field.value = ""

    // Type the value with human-like delay
    if (settings.respectRateLimit) {
      await this.typeText(field, value)
    } else {
      field.value = value
    }

    // Trigger events
    field.dispatchEvent(new Event("input", { bubbles: true }))
    field.dispatchEvent(new Event("change", { bubbles: true }))
    field.blur()
  }

  async typeText(field, text) {
    for (let i = 0; i < text.length; i++) {
      field.value += text[i]
      field.dispatchEvent(new Event("input", { bubbles: true }))
      await this.delay(50 + Math.random() * 100) // 50-150ms per character
    }
  }

  async generatePreview(profile) {
    const forms = this.getJobApplicationForms()
    if (forms.length === 0) {
      throw new Error("No forms found")
    }

    const preview = {}
    const fields = this.getFormFields(forms[0])

    for (const field of fields) {
      const fieldName = this.identifyField(field)
      const value = this.getFieldValue(field, profile)
      if (fieldName && value) {
        preview[fieldName] = value
      }
    }

    return preview
  }

  getJobDetails() {
    // Override in subclasses to extract job-specific details
    return {
      title: document.title,
      company: "Unknown",
      location: "Unknown",
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// LinkedIn-specific form handler
class LinkedInFormHandler extends BaseFormHandler {
  isJobApplicationForm(form) {
    return (
      form.querySelector('[data-test-modal="jobs-apply-modal"]') ||
      form.querySelector(".jobs-apply-form") ||
      form.closest(".jobs-apply-modal")
    )
  }

  getJobDetails() {
    const titleEl = document.querySelector(".jobs-unified-top-card__job-title")
    const companyEl = document.querySelector(".jobs-unified-top-card__company-name")
    const locationEl = document.querySelector(".jobs-unified-top-card__bullet")

    return {
      title: titleEl?.textContent?.trim() || "Unknown",
      company: companyEl?.textContent?.trim() || "Unknown",
      location: locationEl?.textContent?.trim() || "Unknown",
    }
  }
}

// Indeed-specific form handler
class IndeedFormHandler extends BaseFormHandler {
  isJobApplicationForm(form) {
    return (
      form.querySelector('[data-testid="ApplyButtonContainer"]') ||
      form.querySelector(".ia-ApplyForm") ||
      form.closest(".ia-Modal")
    )
  }

  getJobDetails() {
    const titleEl = document.querySelector('[data-testid="jobsearch-JobInfoHeader-title"]')
    const companyEl = document.querySelector('[data-testid="inlineHeader-companyName"]')
    const locationEl = document.querySelector('[data-testid="job-location"]')

    return {
      title: titleEl?.textContent?.trim() || "Unknown",
      company: companyEl?.textContent?.trim() || "Unknown",
      location: locationEl?.textContent?.trim() || "Unknown",
    }
  }
}

// Glassdoor-specific form handler
class GlassdoorFormHandler extends BaseFormHandler {
  isJobApplicationForm(form) {
    return (
      form.querySelector(".JobApplicationForm") ||
      form.querySelector('[data-test="apply-form"]') ||
      form.closest(".JobApplyModal")
    )
  }

  getJobDetails() {
    const titleEl = document.querySelector('[data-test="job-title"]')
    const companyEl = document.querySelector('[data-test="employer-name"]')
    const locationEl = document.querySelector('[data-test="job-location"]')

    return {
      title: titleEl?.textContent?.trim() || "Unknown",
      company: companyEl?.textContent?.trim() || "Unknown",
      location: locationEl?.textContent?.trim() || "Unknown",
    }
  }
}

// ZipRecruiter-specific form handler
class ZipRecruiterFormHandler extends BaseFormHandler {
  isJobApplicationForm(form) {
    return (
      form.querySelector(".apply_form") ||
      form.querySelector('[data-testid="apply-form"]') ||
      form.closest(".apply-modal")
    )
  }

  getJobDetails() {
    const titleEl = document.querySelector(".job_title")
    const companyEl = document.querySelector(".company_name")
    const locationEl = document.querySelector(".location")

    return {
      title: titleEl?.textContent?.trim() || "Unknown",
      company: companyEl?.textContent?.trim() || "Unknown",
      location: locationEl?.textContent?.trim() || "Unknown",
    }
  }
}

// Generic form handler for other sites
class GenericFormHandler extends BaseFormHandler {
  isJobApplicationForm(form) {
    const formText = form.textContent.toLowerCase()
    const keywords = ["apply", "application", "resume", "cover letter", "submit"]
    return keywords.some((keyword) => formText.includes(keyword))
  }
}

// Initialize content script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CareerHackContentScript()
  })
} else {
  new CareerHackContentScript()
}
