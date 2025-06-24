class CareerHackOptions {
  constructor() {
    this.init()
  }

  async init() {
    await this.loadSettings()
    this.bindEvents()
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get(["profile", "settings"])
      this.populateForm(result.profile || {}, result.settings || this.getDefaultSettings())
    } catch (error) {
      console.error("Error loading settings:", error)
      this.showMessage("Error loading settings", "error")
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

  populateForm(profile, settings) {
    // Personal information
    document.getElementById("firstName").value = profile.firstName || ""
    document.getElementById("lastName").value = profile.lastName || ""
    document.getElementById("email").value = profile.email || ""
    document.getElementById("phone").value = profile.phone || ""
    document.getElementById("address").value = profile.address || ""
    document.getElementById("city").value = profile.city || ""
    document.getElementById("state").value = profile.state || ""
    document.getElementById("zipCode").value = profile.zipCode || ""
    document.getElementById("country").value = profile.country || "United States"
    document.getElementById("coverLetter").value = profile.coverLetter || ""

    // Site settings
    document.getElementById("enableLinkedIn").checked = settings.enabledSites.linkedin
    document.getElementById("enableIndeed").checked = settings.enabledSites.indeed
    document.getElementById("enableGlassdoor").checked = settings.enabledSites.glassdoor
    document.getElementById("enableZipRecruiter").checked = settings.enabledSites.ziprecruiter

    // Application settings
    document.getElementById("requireConfirmation").checked = settings.requireConfirmation
    document.getElementById("preventDuplicates").checked = settings.preventDuplicates
    document.getElementById("respectRateLimit").checked = settings.respectRateLimit
    document.getElementById("autoFillDelay").value = settings.autoFillDelay

    // Update site card states
    this.updateSiteCards()

    // Update resume info if available
    if (profile.resumeFileName) {
      document.getElementById("resumeInfo").textContent = `Current: ${profile.resumeFileName}`
    }
  }

  bindEvents() {
    document.getElementById("saveBtn").addEventListener("click", () => this.saveSettings())
    document.getElementById("resetBtn").addEventListener("click", () => this.resetSettings())

    // Resume file upload
    document.getElementById("resume").addEventListener("change", (e) => this.handleResumeUpload(e))

    // Site toggle changes
    document.querySelectorAll('.site-card input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => this.updateSiteCards())
    })
  }

  async handleResumeUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      this.showMessage("Please upload a PDF, DOC, or DOCX file", "error")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      this.showMessage("File size must be less than 5MB", "error")
      return
    }

    try {
      // Convert file to base64 for storage
      const base64 = await this.fileToBase64(file)

      // Store resume data
      const resumeData = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        data: base64,
      }

      // Update UI
      document.getElementById("resumeInfo").textContent = `Selected: ${file.name} (${this.formatFileSize(file.size)})`

      // Store temporarily (will be saved when user clicks save)
      this.tempResumeData = resumeData

      this.showMessage("Resume uploaded successfully", "success")
    } catch (error) {
      console.error("Error uploading resume:", error)
      this.showMessage("Error uploading resume", "error")
    }
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  updateSiteCards() {
    document.querySelectorAll(".site-card").forEach((card) => {
      const checkbox = card.querySelector('input[type="checkbox"]')
      if (checkbox.checked) {
        card.classList.add("enabled")
        card.classList.remove("disabled")
      } else {
        card.classList.add("disabled")
        card.classList.remove("enabled")
      }
    })
  }

  async saveSettings() {
    try {
      console.log('Saving settings...')
      const profile = this.getProfileData()
      const settings = this.getSettingsData()

      console.log('Profile data:', profile)
      console.log('Settings data:', settings)

      // Add resume data if uploaded
      if (this.tempResumeData) {
        console.log('Including resume data')
        profile.resume = this.tempResumeData
        profile.resumeFileName = this.tempResumeData.fileName
      }

      // Validate required fields
      if (!profile.firstName || !profile.lastName || !profile.email) {
        throw new Error('Please fill in all required fields (First Name, Last Name, and Email)')
      }

      // Save to storage
      await chrome.storage.local.set({ profile, settings })
      
      // Verify the save
      const result = await chrome.storage.local.get(['profile', 'settings'])
      console.log('Saved data verification:', result)
      
      this.showMessage("Profile saved successfully! Redirecting to job search...", "success")
      console.log('Settings saved successfully')
      
      // Redirect to job search after a short delay
      setTimeout(() => {
        // Close the options page
        window.close()
        
        // Open the job search page in a new tab
        chrome.tabs.create({
          url: 'https://www.linkedin.com/jobs/' // Change this to your preferred job search URL
        })
      }, 1500)
    } catch (error) {
      console.error("Error saving settings:", error)
      const errorMessage = error.message || 'An unknown error occurred while saving settings'
      this.showMessage(errorMessage, "error")
    }
  }

  getProfileData() {
    return {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value.trim(),
      zipCode: document.getElementById("zipCode").value.trim(),
      country: document.getElementById("country").value.trim(),
      coverLetter: document.getElementById("coverLetter").value.trim(),
    }
  }

  getSettingsData() {
    return {
      enabledSites: {
        linkedin: document.getElementById("enableLinkedIn").checked,
        indeed: document.getElementById("enableIndeed").checked,
        glassdoor: document.getElementById("enableGlassdoor").checked,
        ziprecruiter: document.getElementById("enableZipRecruiter").checked,
      },
      autoFillDelay: Number.parseInt(document.getElementById("autoFillDelay").value),
      requireConfirmation: document.getElementById("requireConfirmation").checked,
      preventDuplicates: document.getElementById("preventDuplicates").checked,
      respectRateLimit: document.getElementById("respectRateLimit").checked,
    }
  }

  async resetSettings() {
    if (confirm("Are you sure you want to reset all settings to defaults?")) {
      const defaultSettings = this.getDefaultSettings()
      const emptyProfile = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        coverLetter: "",
      }

      this.populateForm(emptyProfile, defaultSettings)
      await chrome.storage.local.set({ profile: emptyProfile, settings: defaultSettings })
      this.showMessage("Settings reset to defaults", "success")
    }
  }

  showMessage(message, type) {
    console.log(`[${type.toUpperCase()}] ${message}`)
    let messageEl = document.getElementById("statusMessage")
    
    // Create message element if it doesn't exist
    if (!messageEl) {
      messageEl = document.createElement('div')
      messageEl.id = 'statusMessage'
      messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease-in-out;
        max-width: 300px;
      `
      document.body.appendChild(messageEl)
    }
    
    // Set message and style based on type
    messageEl.textContent = message
    messageEl.style.backgroundColor = type === 'error' ? '#ff4444' : '#4CAF50'
    messageEl.style.display = 'block'
    messageEl.style.opacity = '1'
    
    // Auto-hide after 5 seconds
    clearTimeout(this.messageTimeout)
    this.messageTimeout = setTimeout(() => {
      messageEl.style.opacity = '0'
      setTimeout(() => {
        messageEl.style.display = 'none'
      }, 300)
    }, 5000)
  }
}

// Initialize options page
document.addEventListener("DOMContentLoaded", () => {
  new CareerHackOptions()
})
