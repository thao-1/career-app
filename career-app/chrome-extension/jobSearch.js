class JobSearchAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://jsearch.p.rapidapi.com';
  }

  async searchJobs(query, options = {}) {
    const defaultOptions = {
      page: 1,
      num_pages: 1,
      date_posted: 'month',
      employment_types: 'FULLTIME',
      remote_jobs_only: false,
      ...options
    };

    const params = new URLSearchParams({
      query: query,
      page: defaultOptions.page,
      num_pages: defaultOptions.num_pages,
      date_posted: defaultOptions.date_posted,
      employment_types: defaultOptions.employment_types,
      remote_jobs_only: defaultOptions.remote_jobs_only.toString(),
    });

    try {
      const response = await fetch(`${this.baseUrl}/search?${params}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }

  async getJobDetails(jobId) {
    try {
      const response = await fetch(`${this.baseUrl}/job-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        body: JSON.stringify({
          job_id: jobId,
          extended_publisher_details: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data[0] || null;
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  }

  async getEstimatedSalaries(jobTitle, location, radius = 50) {
    try {
      const response = await fetch(`${this.baseUrl}/estimated-salary`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
          job_title: jobTitle,
          location: location,
          radius: radius
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('Error fetching salary estimates:', error);
      throw error;
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JobSearchAPI;
}
