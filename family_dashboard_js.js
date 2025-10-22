// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.getAttribute('data-section');
        
        // Update active states
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });
    });
});

// Photo Gallery
const addPhotoBtn = document.getElementById('addPhotoBtn');
const photoModal = document.getElementById('photoModal');
const savePhotoBtn = document.getElementById('savePhoto');
const cancelPhotoBtn = document.getElementById('cancelPhoto');
const galleryGrid = document.getElementById('galleryGrid');

let photos = JSON.parse(localStorage.getItem('photos')) || [];

function renderPhotos() {
    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.style.background = `linear-gradient(135deg, ${photo.color} 0%, ${adjustColor(photo.color, -30)} 100%)`;
        photoCard.innerHTML = `
            <div class="photo-placeholder">📷</div>
            <p>${photo.title}</p>
        `;
        galleryGrid.appendChild(photoCard);
    });
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

addPhotoBtn.addEventListener('click', () => {
    photoModal.classList.add('active');
});

cancelPhotoBtn.addEventListener('click', () => {
    photoModal.classList.remove('active');
    document.getElementById('photoTitle').value = '';
});

savePhotoBtn.addEventListener('click', () => {
    const title = document.getElementById('photoTitle').value;
    const color = document.getElementById('photoColor').value;
    
    if (title) {
        const newPhoto = { title, color };
        photos.push(newPhoto);
        localStorage.setItem('photos', JSON.stringify(photos));
        
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 100%)`;
        photoCard.innerHTML = `
            <div class="photo-placeholder">📷</div>
            <p>${title}</p>
        `;
        galleryGrid.appendChild(photoCard);
        
        photoModal.classList.remove('active');
        document.getElementById('photoTitle').value = '';
    }
});

// Event Calendar
const addEventBtn = document.getElementById('addEventBtn');
const eventModal = document.getElementById('eventModal');
const saveEventBtn = document.getElementById('saveEvent');
const cancelEventBtn = document.getElementById('cancelEvent');
const eventsList = document.getElementById('eventsList');

let events = JSON.parse(localStorage.getItem('events')) || [];

function renderEvents() {
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        const date = new Date(event.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        eventCard.innerHTML = `
            <div class="event-date">${dateStr}</div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p>${event.emoji || '📅'} ${event.time} - ${event.description}</p>
            </div>
        `;
        eventsList.appendChild(eventCard);
    });
}

addEventBtn.addEventListener('click', () => {
    eventModal.classList.add('active');
});

cancelEventBtn.addEventListener('click', () => {
    eventModal.classList.remove('active');
    clearEventForm();
});

saveEventBtn.addEventListener('click', () => {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const description = document.getElementById('eventDescription').value;
    
    if (title && date && time) {
        const emojis = ['🎉', '🎂', '⚽', '🎬', '🍽️', '📚', '🎮', '🏖️'];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const newEvent = { title, date, time, description, emoji };
        events.push(newEvent);
        events.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('events', JSON.stringify(events));
        
        // Clear and re-render all events
        eventsList.innerHTML = '';
        renderEvents();
        
        eventModal.classList.remove('active');
        clearEventForm();
    }
});

function clearEventForm() {
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventDescription').value = '';
}

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! Your family member will get back to you soon. 💌');
    contactForm.reset();
});

// Initialize
renderPhotos();
renderEvents();