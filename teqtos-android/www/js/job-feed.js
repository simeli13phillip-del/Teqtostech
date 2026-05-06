// Job Feed Functionality
class JobFeed {
    constructor(containerId, maxPosts = 4) {
        this.container = document.getElementById(containerId);
        this.maxPosts = maxPosts;
        this.init();
    }

    init() {
        if (this.container) {
            this.loadJobs();
        }
    }

    loadJobs() {
        const jobs = this.getJobs();
        const recentJobs = jobs.slice(0, this.maxPosts);

        if (recentJobs.length === 0) {
            this.showEmptyState();
        } else {
            this.renderJobs(recentJobs);
        }
    }

    getJobs() {
        const jobs = localStorage.getItem('teqtos_jobs');
        return jobs ? JSON.parse(jobs) : [];
    }

    renderJobs(jobs) {
        const jobsHtml = jobs.map(job => this.createJobCard(job)).join('');
        this.container.innerHTML = jobsHtml;
    }

    createJobCard(job) {
        const postedDate = new Date(job.postedDate);
        const timeAgo = this.getTimeAgo(postedDate);

        return `
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition duration-200">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                            ${job.companyName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-white">${job.jobTitle}</h3>
                            <p class="text-gray-400 text-sm">${job.companyName} • ${job.location}</p>
                        </div>
                    </div>
                    <span class="text-xs text-gray-500">${timeAgo}</span>
                </div>

                <div class="mb-4">
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-full">${job.jobType}</span>
                        ${job.experience ? `<span class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">${job.experience}</span>` : ''}
                        ${job.salary ? `<span class="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">${job.salary}</span>` : ''}
                    </div>
                    <p class="text-gray-300 text-sm line-clamp-3">${job.description}</p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center text-xs text-gray-500">
                        <span>Posted by ${job.recruiterName}</span>
                    </div>
                    <button onclick="window.location.href='mailto:${job.contactEmail}?subject=Application for ${job.jobTitle} position'"
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200">
                        Apply Now
                    </button>
                </div>
            </div>
        `;
    }

    showEmptyState() {
        this.container.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
                <div class="text-4xl mb-4">💼</div>
                <h3 class="text-lg font-semibold text-white mb-2">No Job Opportunities Yet</h3>
                <p class="text-gray-400 mb-4">Be the first to post a job opportunity and connect with skilled professionals.</p>
                <a href="pages/post-job.html" class="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 inline-block">
                    Post a Job
                </a>
            </div>
        `;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

        return date.toLocaleDateString();
    }
}

// Initialize job feed when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobFeed('jobFeed');
});