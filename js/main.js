// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again later.');
        console.error('Error:', error);
    }
});

// Course Card Animation
const courseCards = document.querySelectorAll('.course-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

courseCards.forEach(card => {
    observer.observe(card);
});

// Faculty Image Lazy Loading
const facultyImages = document.querySelectorAll('.faculty-card img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

facultyImages.forEach(img => {
    imageObserver.observe(img);
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.className = 'scroll-top';
scrollButton.innerHTML = '↑';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function openSignupModal() {
    document.getElementById('signupModal').classList.add('active');
}

function closeModals() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('signupModal').classList.remove('active');
}

function switchToSignup() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('signupModal').classList.add('active');
}

function switchToLogin() {
    document.getElementById('signupModal').classList.remove('active');
    document.getElementById('loginModal').classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    if (event.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (event.target === signupModal) {
        signupModal.classList.remove('active');
    }
}

// Form Submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', data);
        alert('Login functionality will be implemented with backend integration');
        closeModals();
    } catch (error) {
        alert('Login failed. Please try again.');
        console.error('Login error:', error);
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate password match
    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', data);
        alert('Signup functionality will be implemented with backend integration');
        closeModals();
    } catch (error) {
        alert('Signup failed. Please try again.');
        console.error('Signup error:', error);
    }
});

// Chatbot functionality
let isChatbotMinimized = false;

function toggleChatbot() {
    const chatbot = document.querySelector('.chatbot-container');
    const toggleBtn = document.querySelector('.chat-toggle');
    
    if (isChatbotMinimized) {
        chatbot.classList.remove('minimized');
        toggleBtn.classList.add('hidden');
    } else {
        chatbot.classList.add('minimized');
        toggleBtn.classList.remove('hidden');
    }
    
    isChatbotMinimized = !isChatbotMinimized;
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const paragraph = document.createElement('p');
    // Replace newlines with <br> tags for proper formatting
    paragraph.innerHTML = text.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(paragraph);
    messagesDiv.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    messagesDiv.scrollTo({
        top: messagesDiv.scrollHeight,
        behavior: 'smooth'
    });
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Process message and get response
        const response = getBotResponse(message);
        
        // Add bot response with a slight delay to make it feel more natural
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 500);
    }
}

function getBotResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings first
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage === 'hii') {
        return responses['hello'];
    }
    
    // Check for keywords in the message
    for (let key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    // Default response if no specific keyword is found
    return responses['default'];
}

// Define responses object
const responses = {
    'hello': 'Hello! 👋 Welcome to ZPP School Papari. How can I help you today? You can ask me about admissions, fees, timings, or any other school-related information.',
    'hi': 'Hi there! 👋 I\'m here to help you with any questions about ZPP School Papari. What would you like to know?',
    'admission': 'Here\'s detailed information about admissions:\n\n' +
                '1. Age Requirements: 5-6 years for Class 1\n' +
                '2. Required Documents:\n' +
                '   - Birth Certificate\n' +
                '   - Previous School Records (if applicable)\n' +
                '   - Address Proof\n' +
                '   - Parent/Guardian ID Proof\n\n' +
                '3. Admission Process:\n' +
                '   - Visit school office\n' +
                '   - Fill application form\n' +
                '   - Submit required documents\n' +
                '   - Pay admission fee\n\n' +
                'For more details, call us at +91 XXXXXXXXXX or visit our office.',
    
    'fee': 'Our fee structure includes:\n\n' +
           '1. Admission Fee: ₹500 (one-time)\n' +
           '2. Monthly Fee: ₹1000-1500 (varies by grade)\n' +
           '3. Additional Charges:\n' +
           '   - Sports Fee: ₹200/month\n' +
           '   - Computer Lab: ₹300/month\n' +
           '   - Library: ₹100/month\n\n' +
           'Payment Options:\n' +
           '- Cash\n' +
           '- Online Transfer\n' +
           '- Cheque\n\n' +
           'For detailed fee structure, please contact the office.',
    
    'timing': 'School Schedule:\n\n' +
              '1. Regular Hours:\n' +
              '   - Start: 8:00 AM\n' +
              '   - End: 2:00 PM\n\n' +
              '2. Break Times:\n' +
              '   - Morning Break: 10:30 AM - 10:45 AM\n' +
              '   - Lunch Break: 12:30 PM - 1:00 PM\n\n' +
              '3. Office Hours:\n' +
              '   - Monday to Friday: 8:00 AM - 4:00 PM\n' +
              '   - Saturday: 8:00 AM - 1:00 PM',
    
    'location': 'Our School Location:\n\n' +
                'Address: ZPP School Papari\n' +
                'Village Papari, Maharashtra\n\n' +
                'Landmarks:\n' +
                '- Near Main Market\n' +
                '- Opposite Community Hall\n\n' +
                'Transport Options:\n' +
                '1. School Bus Service Available\n' +
                '2. Public Transport Accessible\n' +
                '3. Parking Available for Parents',
    
    'contact': 'Contact Information:\n\n' +
               '1. Office:\n' +
               '   - Phone: +91 XXXXXXXXXX\n' +
               '   - Email: zppschool.papari@edu.in\n\n' +
               '2. Principal:\n' +
               '   - Phone: +91 XXXXXXXXXX\n' +
               '   - Email: principal.zppschool@edu.in\n\n' +
               '3. Emergency Contact:\n' +
               '   - Phone: +91 XXXXXXXXXX',
    
    'faculty': 'Our Teaching Staff:\n\n' +
               '1. Primary Section:\n' +
               '   - Class Teachers for each grade\n' +
               '   - Special Educators\n' +
               '   - Physical Education Teachers\n\n' +
               '2. Subject Specialists:\n' +
               '   - Mathematics\n' +
               '   - Science\n' +
               '   - English\n' +
               '   - Hindi\n' +
               '   - Marathi\n\n' +
               'All teachers are qualified and experienced.',
    
    'sports': 'Sports Activities:\n\n' +
              '1. Indoor Sports:\n' +
              '   - Chess\n' +
              '   - Carrom\n' +
              '   - Table Tennis\n\n' +
              '2. Outdoor Sports:\n' +
              '   - Cricket\n' +
              '   - Football\n' +
              '   - Athletics\n' +
              '   - Kho-Kho\n' +
              '   - Kabaddi\n\n' +
              '3. Competitions:\n' +
              '   - Annual Sports Day\n' +
              '   - Inter-school Tournaments\n' +
              '   - District Level Competitions',
    
    'transport': 'School Transport:\n\n' +
                 '1. Bus Routes:\n' +
                 '   - Route 1: Main Market → School\n' +
                 '   - Route 2: Village Center → School\n' +
                 '   - Route 3: Outer Areas → School\n\n' +
                 '2. Bus Timings:\n' +
                 '   - Morning: 7:00 AM - 7:30 AM\n' +
                 '   - Afternoon: 2:00 PM - 2:30 PM\n\n' +
                 '3. Fees:\n' +
                 '   - Monthly: ₹500\n' +
                 '   - Quarterly: ₹1400\n' +
                 '   - Yearly: ₹5000\n\n' +
                 'Contact transport in-charge for registration.',
    
    'uniform': 'School Uniform:\n\n' +
               '1. Summer Uniform:\n' +
               '   - Boys: White Shirt, Blue Shorts\n' +
               '   - Girls: White Shirt, Blue Skirt\n\n' +
               '2. Winter Uniform:\n' +
               '   - Boys: White Shirt, Blue Trousers\n' +
               '   - Girls: White Shirt, Blue Trousers\n\n' +
               '3. Sports Uniform:\n' +
               '   - White T-shirt, Blue Shorts\n\n' +
               'Available at:\n' +
               '- School Office\n' +
               '- Authorized Vendors',
    
    'holiday': 'School Calendar:\n\n' +
               '1. Regular Holidays:\n' +
               '   - Weekends (Saturday & Sunday)\n' +
               '   - National Holidays\n' +
               '   - State Holidays\n\n' +
               '2. School Holidays:\n' +
               '   - Summer Break: May-June\n' +
               '   - Diwali Break: October\n' +
               '   - Christmas Break: December\n\n' +
               '3. Special Holidays:\n' +
               '   - Annual Day\n' +
               '   - Sports Day\n' +
               '   - Parent-Teacher Meetings',
    
    'default': "I can help you with information about:\n\n" +
               "1. Admissions\n" +
               "2. Fees\n" +
               "3. School Timings\n" +
               "4. Location\n" +
               "5. Contact Information\n" +
               "6. Faculty\n" +
               "7. Sports\n" +
               "8. Transport\n" +
               "9. Uniform\n" +
               "10. Holidays\n\n" +
               "Please ask about any of these topics, or contact the school office for other queries."
};

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.querySelector('.chatbot-container');
    const toggleBtn = document.querySelector('.chat-toggle');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('chatMessages');
    
    // Start minimized
    chatbot.classList.add('minimized');
    toggleBtn.classList.remove('hidden');
    
    // Add event listener for Enter key
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add event listener for scroll
    messagesDiv.addEventListener('scroll', function() {
        // Add shadow to indicate more content
        if (messagesDiv.scrollTop > 0) {
            messagesDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            messagesDiv.style.boxShadow = 'none';
        }
    });
    
    // Add initial greeting
    setTimeout(() => {
        addMessage(responses['hello'], 'bot');
    }, 500);
}); 