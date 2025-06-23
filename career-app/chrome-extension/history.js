class ApplicationHistory {
  constructor() {
    this.applications = []
    this.filteredApplications = []
    this.init()
  }

  async init() {
    await this.loadApplications()
    this.bindEvents()
    this.updateStats()
    this.renderApplications()
  }

  async loadApplications() {
    try {
      const result = await chrome.storage.local.get(["appliedJobs"])
      this.applications = result.appliedJobs || []
      this.filteredApplications = [...this.applications]
    } catch (error) {
      console.error("Error loading applications:", error)
    }
  }

  bindEvents() {
    // Filter events
    document.getElementById("searchFilter").addEventListener("input", () => this.applyFilters())
    document.getElementById("siteFilter").addEventListener("change", () => this.applyFilters())
    document.getElementById("statusFilter").addEventListener("change", () => this.applyFilters())
    document.getElementById("dateFilter").addEventListener("change", () => this.applyFilters())

    // Export button
    document.getElementById("exportBtn").addEventListener("click", () => this.exportToCSV())
  }

  applyFilters() {
    const searchTerm = document.getElementById("searchFilter").value.toLowerCase()
    const siteFilter = document.getElementById("siteFilter").value
    const statusFilter = document.getElementById("statusFilter").value
    const dateFilter = document.getElementById("dateFilter").value

    this.filteredApplications = this.applications.filter((app) => {
      // Search filter
      if (
        searchTerm &&
        !app.title.toLowerCase().includes(searchTerm) &&
        !app.company.toLowerCase().includes(searchTerm)
      ) {
        return false
      }

      // Site filter
      if (siteFilter && app.site !== siteFilter) {
        return false
      }

      // Status filter
      if (statusFilter && app.status !== statusFilter) {
        return false
      }

      // Date filter
      if (dateFilter) {
        const appDate = new Date(app.appliedAt)
        const now = new Date()

        switch (dateFilter) {
          case "today":
            if (appDate.toDateString() !== now.toDateString()) return false
            break
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            if (appDate < weekAgo) return false
            break
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            if (appDate < monthAgo) return false
            break
        }
      }

      return true
    })

    this.renderApplications()
  }

  updateStats() {
    const total = this.applications.length
    const thisWeek = this.applications.filter((app) => {
      const appDate = new Date(app.appliedAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return appDate >= weekAgo
    }).length

    const interviews = this.applications.filter((app) => app.status === "interview").length
    const responses = this.applications.filter((app) => app.status !== "applied").length
    const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0

    document.getElementById("totalApplications").textContent = total
    document.getElementById("thisWeek").textContent = thisWeek
    document.getElementById("responseRate").textContent = `${responseRate}%`
    document.getElementById("interviews").textContent = interviews
  }

  renderApplications() {
    const container = document.getElementById("applicationsList")

    if (this.filteredApplications.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div>No applications found</div>
          <div style="font-size: 14px; margin-top: 8px;">
            ${
              this.applications.length === 0
                ? "Start applying to jobs to see your history here"
                : "Try adjusting your filters"
            }
          </div>
        </div>
      `
      return
    }

    container.innerHTML = this.filteredApplications
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
      .map((app) => this.renderApplicationItem(app))
      .join("")
  }

  renderApplicationItem(app) {
    const appliedDate = new Date(app.appliedAt)
    const timeAgo = this.getTimeAgo(appliedDate)

    return `
      <div class="application-item">
        <div class="application-info">
          <div class="job-title">${app.title || "Unknown Position"}</div>
          <div class="company-info">
            <span>🏢 ${app.company || "Unknown Company"}</span>
            <span>📍 ${app.location || "Unknown Location"}</span>
            <span class="site-badge site-${app.site}">${app.site || "unknown"}</span>
          </div>
          <div class="application-meta">
            <span>Applied ${timeAgo}</span>
            <span class="status-badge status-${app.status || "applied"}">
              ${this.getStatusLabel(app.status)}
            </span>
          </div>
        </div>
        <div class="action-buttons">
          <a href="${app.url || "#"}" target="_blank" class="btn">View Job</a>
          <button class="btn" onclick="applicationHistory.updateStatus('${app.id}')">Update Status</button>
        </div>
      </div>
    `
  }

  getStatusLabel(status) {
    const labels = {
      applied: "Applied",
      interview: "Interview",
      rejected: "Rejected",
      offer: "Offer",
    }
    return labels[status] || "Applied"
  }

  getTimeAgo(date) {
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`

    return date.toLocaleDateString()
  }

  async updateStatus(applicationId) {
    const newStatus = prompt("Update application status:", "applied")
    if (!newStatus) return

    const validStatuses = ["applied", "interview", "rejected", "offer"]
    if (!validStatuses.includes(newStatus)) {
      alert("Invalid status. Use: applied, interview, rejected, or offer")
      return
    }

    try {
      const appIndex = this.applications.findIndex((app) => app.id === applicationId)
      if (appIndex !== -1) {
        this.applications[appIndex].status = newStatus
        await chrome.storage.local.set({ appliedJobs: this.applications })
        this.filteredApplications = [...this.applications]
        this.updateStats()
        this.renderApplications()
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Error updating status")
    }
  }

  exportToCSV() {
    if (this.applications.length === 0) {
      alert("No applications to export")
      return
    }

    const headers = ["Date Applied", "Job Title", "Company", "Location", "Site", "Status", "URL"]
    const csvContent = [
      headers.join(","),
      ...this.applications.map((app) =>
        [
          new Date(app.appliedAt).toLocaleDateString(),
          `"${app.title || ""}"`,
          `"${app.company || ""}"`,
          `"${app.location || ""}"`,
          app.site || "",
          app.status || "applied",
          app.url || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `careerhack-applications-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.applicationHistory = new ApplicationHistory()
})
