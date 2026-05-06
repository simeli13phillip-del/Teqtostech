// AI Chat Widget JavaScript

class AIChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    createWidget() {
        const widgetHTML = `
            <div class="ai-chat-widget">
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <h3>🤖 AfriGuide - Your AI Assistant</h3>
                        <button class="close-button" id="closeChat">&times;</button>
                    </div>
                    <div class="chat-messages" id="chatMessages"></div>
                    <div class="typing-indicator" id="typingIndicator">AI is typing...</div>
                    <div class="quick-questions">
                        <h4>Quick Questions:</h4>
                        <button class="question-btn" data-question="What is the ranking system?">Ranking System</button>
                        <button class="question-btn" data-question="How do I get certified?">Get Certified</button>
                        <button class="question-btn" data-question="What jobs can I access?">Job Access</button>
                        <button class="question-btn" data-question="How does premium work?">Premium Features</button>
                        <button class="question-btn" data-question="How do I find jobs?">Find Jobs</button>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chatInput" placeholder="Ask me anything about TeQtos..." maxlength="200">
                        <button id="sendButton">Send</button>
                    </div>
                </div>
                <button class="chat-button" id="chatButton">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.05 1.05 4.42L2 22l5.58-1.05C8.95 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    bindEvents() {
        const chatButton = document.getElementById('chatButton');
        const closeButton = document.getElementById('closeChat');
        const sendButton = document.getElementById('sendButton');
        const chatInput = document.getElementById('chatInput');
        const questionButtons = document.querySelectorAll('.question-btn');

        chatButton.addEventListener('click', () => this.toggleChat());
        closeButton.addEventListener('click', () => this.closeChat());
        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        questionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.sendQuickQuestion(question);
            });
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            chatWindow.classList.add('show');
        } else {
            chatWindow.classList.remove('show');
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.remove('show');
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            this.processMessage(message);
        }
    }

    sendQuickQuestion(question) {
        this.addMessage(question, 'user');
        this.processMessage(question);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.textContent = text;

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.add('show');
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.remove('show');
    }

    async processMessage(message) {
        this.showTypingIndicator();

        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        this.hideTypingIndicator();

        const response = this.generateResponse(message.toLowerCase());
        this.addMessage(response, 'bot');
    }

    generateResponse(message) {
        // Ranking System Questions
        if (message.includes('ranking') || message.includes('level') || message.includes('certification')) {
            return "🏆 **TeQtos Ranking System:**\n\nWe have 4 levels:\n\n🟢 **Level 1 (Beginner):** Entry-level, basic jobs\n🔵 **Level 2 (Certified):** CTS/Network+ certs, verified jobs\n🟣 **Level 3 (Advanced):** CTS-I/CCNA, high-paying gigs\n🔴 **Level 4 (Elite):** Expert level, premium opportunities\n\nYour ranking is based on certification points! Check our Rankings page for details.";
        }

        // Certification Questions
        if (message.includes('certified') || message.includes('certification') || message.includes('get certified')) {
            return "🎓 **Getting Certified:**\n\nPopular certifications:\n• **CTS** (AVIXA) - +50 points\n• **CCNA** (Cisco) - +70 points\n• **Network+** (CompTIA) - +40 points\n• **Crestron Certified** - +80 points\n\nUpload your certificates in your profile for verification. Premium members get priority review!";
        }

        // Job Access Questions
        if (message.includes('job') || message.includes('access') || message.includes('opportunity')) {
            return "💼 **Job Access Levels:**\n\n🟢 **Open Jobs:** Everyone (basic installs)\n🔵 **Verified Jobs:** Need certification (better pay)\n🟣 **Professional Jobs:** Level 3+ (corporate AV)\n🔴 **Premium Jobs:** Elite level (international)\n\nHigher rankings = better opportunities!";
        }

        // Premium Questions
        if (message.includes('premium') || message.includes('subscription') || message.includes('pay')) {
            return "💎 **Premium Benefits ($19/month):**\n\n• AI-powered job recommendations\n• Instant email alerts\n• Priority profile visibility\n• Certification ranking boost\n• Advanced networking tools\n\nStart with a free trial and upgrade anytime!";
        }

        // Finding Jobs
        if (message.includes('find') || message.includes('search') || message.includes('how to')) {
            return "🔍 **Finding Jobs on TeQtos:**\n\n1. **Complete your profile** with skills & certs\n2. **Upload certifications** for verification\n3. **Set job preferences** in settings\n4. **Use AI recommendations** (Premium)\n5. **Apply to unlocked jobs** based on your level\n\nPro tip: Higher rankings unlock premium opportunities!";
        }

        // Account/Recruiter Questions
        if (message.includes('recruiter') || message.includes('employer') || message.includes('hire')) {
            return "🏢 **For Employers:**\n\nChoose 'Recruit talent' during signup to:\n• Post jobs for verified technicians\n• Filter by certification & ranking\n• Access premium candidate pool\n• Get priority support\n\nEnterprise plan ($49/month) for teams!";
        }

        // General Help
        if (message.includes('help') || message.includes('what') || message.includes('how')) {
            return "🤖 **How can AfriGuide help you?**\n\nI'm your TeQtos AI assistant! I can help with:\n\n• Understanding our ranking system\n• Certification guidance\n• Job search tips\n• Premium features\n• Account setup\n• Platform navigation\n\nWhat would you like to know?";
        }

        // Default responses
        const defaultResponses = [
            "I'd be happy to help! Could you be more specific about what you're looking for?",
            "That's a great question! Let me provide some guidance on that topic.",
            "I'm AfriGuide, your AI assistant. What specific information do you need?",
            "Thanks for reaching out! I can assist with rankings, certifications, jobs, and more."
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    showWelcomeMessage() {
        setTimeout(() => {
            if (!this.isOpen) {
                this.addMessage("👋 Hi! I'm AfriGuide, your AI assistant. I can help you with rankings, certifications, jobs, and more. Click here to chat!", "bot");
            }
        }, 3000);
    }
}

// Initialize the chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIChatWidget();
});