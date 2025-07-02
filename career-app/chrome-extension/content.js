class ResumeParser {
  static async parseResume(file) {
    // This is a placeholder for actual resume parsing logic
    // In a real implementation, you would:
    // 1. Extract text from PDF/DOCX
    // 2. Parse the text to identify sections
    // 3. Return a structured object with the resume data
    
    // For now, we'll return mock data
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate parsing
        setTimeout(() => {
          resolve({
            personalInfo: {
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "(123) 456-7890",
              location: "San Francisco, CA"
            },
            experience: [
              {
                title: "Senior Developer",
                company: "Tech Corp",
                duration: "2020 - Present",
                description: "Led a team of developers and implemented new features."
              }
            ],
            education: [
              {
                degree: "B.S. Computer Science",
                institution: "Stanford University",
                year: "2020"
              }
            ],
            skills: ["JavaScript", "React", "Node.js", "Python"]
          });
        }, 1000);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}

class CareerHackContentScript {
  constructor() {
    this.site = this.detectSite();
    this.formHandler = this.createFormHandler();
    this.resumeData = null;
    this.init();
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

  async addCareerHackUI() {
    // Add floating action button
    const fab = document.createElement("div")
    fab.id = "careerhack-fab"
    fab.innerHTML = `
      <div class="careerhack-fab-button">
        <span>⚡</span>
      </div>
      <div class="careerhack-panel" style="display: none;">
        <div class="careerhack-panel-header">
          <h3>CareerHack Assistant</h3>
          <button class="careerhack-close">×</button>
        </div>
        <div class="careerhack-panel-content">
          <div class="careerhack-upload-section">
            <input type="file" id="resume-upload" accept=".pdf,.docx,.doc" style="display: none;">
            <button id="upload-resume-btn" class="careerhack-btn">
              📄 Upload Resume
            </button>
            <div id="resume-preview" style="display: none; margin-top: 10px;">
              <p>Resume loaded!</p>
              <button id="fill-application-btn" class="careerhack-btn" style="margin-top: 10px;">
                🚀 Fill Application
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(fab);
    
    // Add styles
    this.injectStyles();
    
    // Add event listeners
    const fabButton = fab.querySelector('.careerhack-fab-button');
    const panel = fab.querySelector('.careerhack-panel');
    const closeBtn = fab.querySelector('.careerhack-close');
    const uploadBtn = fab.querySelector('#upload-resume-btn');
    const fileInput = fab.querySelector('#resume-upload');
    const fillBtn = fab.querySelector('#fill-application-btn');
    
    fabButton.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
    
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = 'none';
    });
    
    uploadBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        uploadBtn.textContent = 'Parsing Resume...';
        try {
          this.resumeData = await ResumeParser.parseResume(file);
          document.getElementById('resume-preview').style.display = 'block';
          uploadBtn.textContent = 'Resume Uploaded! ✅';
        } catch (error) {
          console.error('Error parsing resume:', error);
          uploadBtn.textContent = 'Error Uploading. Try Again.';
        }
      }
    });
    
    fillBtn.addEventListener('click', () => {
      if (this.resumeData) {
        this.autoFillApplication();
        panel.style.display = 'none';
      }
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!fab.contains(e.target)) {
        panel.style.display = 'none';
      }
    });
  }
  
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #careerhack-fab {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
      }
      
      .careerhack-fab-button {
        width: 60px;
        height: 60px;
        background: #FF6B00;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
      
      .careerhack-fab-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      }
      
      .careerhack-fab-button span {
        font-size: 28px;
        color: white;
      }
      
      .careerhack-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      
      .careerhack-panel-header {
        padding: 15px;
        background: #2C3E50;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .careerhack-panel-header h3 {
        margin: 0;
        font-size: 16px;
      }
      
      .careerhack-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0 5px;
      }
      
      .careerhack-panel-content {
        padding: 20px;
      }
      
      .careerhack-btn {
        width: 100%;
        padding: 12px;
        background: #3498DB;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .careerhack-btn:hover {
        background: #2980B9;
      }
      
      #resume-preview {
        text-align: center;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 6px;
        margin-top: 15px;
      }
    `;
    document.head.appendChild(style);
  }
  
  async autoFillApplication() {
    if (!this.resumeData) {
      console.error('No resume data available');
      return;
    }
    
    // Use the form handler to fill the application
    const forms = document.querySelectorAll('form');
    let filled = false;
    
    for (const form of forms) {
      if (this.formHandler.isJobApplicationForm(form)) {
        await this.formHandler.fillForm(this.resumeData, {
          autoSubmit: true,
          fillDelay: 100,
          skipOptional: true
        });
        filled = true;
        break;
      }
    }
    
    if (!filled) {
      alert('No job application form detected on this page.');
    }
  }

  showQuickActions() {
    // Remove existing panel
    const existing = document.getElementById("careerhack-panel");
    if (existing) {
      existing.remove();
      return;
    }

    const panel = document.createElement("div");
    panel.id = "careerhack-panel";
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
    `;

    // Bind events
    panel.querySelector(".careerhack-close").addEventListener("click", () => {
      panel.remove();
    });

    panel.querySelector("#careerhack-fill").addEventListener("click", () => {
      this.autoFillApplication();
      panel.remove();
    });

    panel.querySelector("#careerhack-preview").addEventListener("click", () => {
      this.showPreview();
      panel.remove();
    });

    panel.querySelector("#careerhack-settings").addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "openSettings" });
      panel.remove();
    });

    document.body.appendChild(panel);
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

  async fillForm(profile, settings = {}) {
    try {
      // Show confirmation dialog if required
      if (settings.requireConfirmation) {
        const confirmed = await this.showConfirmationDialog(profile);
        if (!confirmed) {
          return { success: false, error: "User cancelled" };
        }
      }

      // Check for duplicates
      if (settings.preventDuplicates) {
        const isDuplicate = await this.checkDuplicate();
        if (isDuplicate) {
          return { success: false, error: "Already applied to this job" };
        }
      }

      // Fill the form
      const result = await this.formHandler.fillForm(profile, settings);

      if (result.success) {
        this.showSuccessMessage();
      }

      return result;
    } catch (error) {
      console.error("Error filling form:", error);
      return { success: false, error: error.message };
    }
  }

  async previewForm(profile) {
    try {
      return await this.showPreview(profile);
    } catch (error) {
      console.error("Error generating preview:", error);
      return { success: false, error: error.message };
    }
  }

  async showPreview(profile) {
    if (!profile) {
      profile = this.resumeData;
    }
    
    if (!profile) {
      console.error('No profile data available for preview');
      return { success: false, error: 'No profile data available' };
    }
    
    try {
      const previewData = this.formHandler.generatePreview(profile);
      
      // Show preview in a modal or side panel
      const previewModal = document.createElement('div');
      previewModal.id = 'careerhack-preview-modal';
      previewModal.innerHTML = `
        <div class="careerhack-modal-content">
          <div class="careerhack-modal-header">
            <h3>Application Preview</h3>
            <button class="careerhack-close">×</button>
          </div>
          <div class="careerhack-modal-body">
            <pre>${JSON.stringify(previewData, null, 2)}</pre>
          </div>
          <div class="careerhack-modal-footer">
            <button id="careerhack-close-preview" class="careerhack-btn">Close</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(previewModal);
      
      // Add styles for the modal if not already added
      if (!document.getElementById('careerhack-preview-styles')) {
        const style = document.createElement('style');
        style.id = 'careerhack-preview-styles';
        style.textContent = `
          #careerhack-preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
          }
          
          .careerhack-modal-content {
            background: white;
            border-radius: 8px;
            width: 80%;
            max-width: 800px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
          }
          
          .careerhack-modal-header {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .careerhack-modal-body {
            padding: 20px;
            overflow-y: auto;
            flex-grow: 1;
          }
          
          .careerhack-modal-body pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: monospace;
            margin: 0;
          }
          
          .careerhack-modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
            text-align: right;
          }
          
          .careerhack-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          }
          
          .careerhack-close:hover {
            color: #333;
          }
          
          .careerhack-btn {
            padding: 8px 16px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
          
          .careerhack-btn:hover {
            background: #2980b9;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Add event listeners
      const closePreview = () => {
        previewModal.remove();
      };
      
      previewModal.querySelector('.careerhack-close').addEventListener('click', closePreview);
      previewModal.querySelector('#careerhack-close-preview').addEventListener('click', closePreview);
      
      return { success: true, preview: previewData };
    } catch (error) {
      console.error('Error showing preview:', error);
      return { success: false, error: error.message };
    }
  }

  async showConfirmationDialog(profile) {
    return new Promise((resolve) => {
      // ...
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
