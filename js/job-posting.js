// Job Posting Functionality
class JobPosting {
    constructor() {
        this.form = document.getElementById('jobForm');
        this.successMessage = document.getElementById('successMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const jobData = {
            id: Date.now().toString(),
            companyName: document.getElementById('companyName').value,
            recruiterName: document.getElementById('recruiterName').value,
            jobTitle: document.getElementById('jobTitle').value,
            jobType: document.getElementById('jobType').value,
            location: document.getElementById('location').value,
            salary: document.getElementById('salary').value,
            experience: document.getElementById('experience').value,
            description: document.getElementById('jobDescription').value,
            requirements: document.getElementById('requirements').value,
            contactEmail: document.getElementById('contactEmail').value,
            postedDate: new Date().toISOString(),
            status: 'active'
        };

        // Save to localStorage
        this.saveJob(jobData);

        // Show success message
        this.showSuccess();

        // Reset form
        this.form.reset();
    }

    saveJob(jobData) {
        let jobs = this.getJobs();
        jobs.unshift(jobData); // Add to beginning of array (most recent first)

        // Keep only the last 50 jobs to prevent localStorage from getting too large
        if (jobs.length > 50) {
            jobs = jobs.slice(0, 50);
        }

        localStorage.setItem('teqtos_jobs', JSON.stringify(jobs));
    }

    getJobs() {
        const jobs = localStorage.getItem('teqtos_jobs');
        return jobs ? JSON.parse(jobs) : [];
    }

    showSuccess() {
        this.successMessage.classList.remove('hidden');
        this.successMessage.scrollIntoView({ behavior: 'smooth' });

        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Initialize job posting when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobPosting();
});