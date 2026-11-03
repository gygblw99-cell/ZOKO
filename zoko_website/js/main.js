// Mobile menu elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Smooth scrolling + close mobile menu on link click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Contact form submission via Formspree
const FORMSPREE_ID = 'xojnvkjb';
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-primary');
    submitBtn.textContent = 'שולח...';
    submitBtn.disabled = true;

    fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            guests: this.querySelector('input[type="number"]').value,
            notes: this.querySelector('textarea').value
        })
    }).then(function (response) {
        if (response.ok) {
            submitBtn.textContent = 'ההזמנה נשלחה בהצלחה!';
            e.target.reset();
            setTimeout(function () {
                submitBtn.textContent = 'שלח הזמנה';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            submitBtn.textContent = 'שגיאה, נסה שוב';
            submitBtn.disabled = false;
        }
    }).catch(function () {
        submitBtn.textContent = 'שגיאה, נסה שוב';
        submitBtn.disabled = false;
    });
});

// Chatbot
const chatbotResponses = [
    {
        keywords: ['שעות', 'פתיחה', 'סגור', 'פתוח', 'מתי'],
        response: '🕐 שעות הפתיחה שלנו:\nראשון - חמישי: 10:00 - 17:00\n\nלמידע נוסף: <a href="tel:03-5745033">03-5745033</a>'
    },
    {
        keywords: ['כתובת', 'איפה', 'מיקום', 'נמצא', 'נמצאים', 'להגיע'],
        response: '📍 אנחנו נמצאים במגדלי אלון 94, תל אביב\n\n<a href="https://maps.google.com/?q=יגאל+אלון+94+תל+אביב" target="_blank">פתח ב-Google Maps</a>'
    },
    {
        keywords: ['תפריט', 'אוכל', 'מנה', 'מנות', 'בשר', 'מה יש', 'מה אתם'],
        response: '🍖 התפריט שלנו:\n• בריסקט\n• אונטריב\n• אסאדו\n• קציצות בקר של אמא\n• קציצות עוף של אמא\n• כריכים\n\n<a href="#menu">לתפריט המלא</a>'
    },
    {
        keywords: ['הזמנה', 'הזמין', 'מקום', 'שולחן', 'לשמור', 'שריין'],
        response: '📋 להזמנת מקום:\n\n<a href="#contact">מלא את הטופס באתר</a>\nאו התקשר: <a href="tel:03-5745033">03-5745033</a>'
    },
    {
        keywords: ['כשר', 'כשרות', 'רבנות'],
        response: '✅ ZOKO כשר בהשגחת רבנות תל אביב'
    },
    {
        keywords: ['happy', 'hour', 'האפי', 'אאוור', 'הנחה'],
        response: '🍺 Happy Hour ב-ZOKO!\n\nמתרון מושלם לפגישות צוות וקבוצות. בחרו את הבשר שאתם אוהבים ותהנו!\n\nלפרטים: <a href="tel:03-5745033">03-5745033</a>'
    },
    {
        keywords: ['טלפון', 'להתקשר', 'מספר', 'phone'],
        response: '📞 <a href="tel:03-5745033">03-5745033</a>'
    },
    {
        keywords: ['אירוע', 'אירועים', 'יום הולדת', 'בר מצווה', 'מסיבה', 'חגיגה', 'קבוצה'],
        response: '🎉 ZOKO מושלם לאירועים!\n\nמארחים קבוצות ואירועים פרטיים.\nלמידע נוסף: <a href="tel:03-5745033">03-5745033</a>\nאו: <a href="mailto:zokoya94@gmail.com">zokoya94@gmail.com</a>'
    },
    {
        keywords: ['מייל', 'אימייל', 'email', 'mail'],
        response: '📧 <a href="mailto:zokoya94@gmail.com">zokoya94@gmail.com</a>'
    },
    {
        keywords: ['חניה', 'חנייה', 'parking'],
        response: '🅿️ יש חניה זמינה באזור מגדלי אלון.\nלפרטים נוספים התקשרו: <a href="tel:03-5745033">03-5745033</a>'
    }
];

function toggleChat() {
    const win = document.getElementById('chatbot-window');
    const btn = document.getElementById('chatbot-btn');
    win.classList.toggle('active');
    btn.classList.toggle('active');
}

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    for (const item of chatbotResponses) {
        if (item.keywords.some(k => lowerMsg.includes(k))) {
            return item.response;
        }
    }
    return 'מצטער, לא הבנתי 😊 נסה לשאול על שעות פתיחה, כתובת, תפריט, או הזמנת מקום. אפשר גם להתקשר: <a href="tel:03-5745033">03-5745033</a>';
}

function addChatMessage(text, isUser) {
    const messages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'chatbot-message ' + (isUser ? 'user' : 'bot');
    msg.innerHTML = '<p>' + text.replace(/\n/g, '<br>') + '</p>';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;
    const qr = document.getElementById('quick-replies');
    if (qr) qr.style.display = 'none';
    addChatMessage(text, true);
    input.value = '';
    setTimeout(function() { addChatMessage(getBotResponse(text), false); }, 500);
}

function sendQuickReply(text) {
    const qr = document.getElementById('quick-replies');
    if (qr) qr.style.display = 'none';
    addChatMessage(text, true);
    setTimeout(function() { addChatMessage(getBotResponse(text), false); }, 500);
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// Mute/Unmute toggle for about video
function toggleMute() {
    const video = document.getElementById('about-video');
    const btn = document.getElementById('mute-btn');
    const icon = btn.querySelector('.mute-icon');

    if (video.muted) {
        video.muted = false;
        icon.textContent = '\u{1F50A}';
    } else {
        video.muted = true;
        icon.textContent = '\u{1F507}';
    }
}
