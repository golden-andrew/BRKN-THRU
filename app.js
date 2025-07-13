// App initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeBreakerName();
        initializeCountdown();
        initializeChecklist();
    }, 100);
});

// Get breaker name from URL parameter
function initializeBreakerName() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const breakerName = urlParams.get('breaker');
        const breakerNameElement = document.getElementById('breaker-name');
        
        console.log('Current URL:', window.location.href);
        console.log('URL search params:', window.location.search);
        console.log('Breaker name from URL:', breakerName);
        console.log('Breaker name element:', breakerNameElement);
        
        if (breakerNameElement) {
            if (breakerName && breakerName.trim() !== '') {
                breakerNameElement.textContent = breakerName;
                breakerNameElement.innerHTML = breakerName;
                console.log('Set breaker name to:', breakerName);
            } else {
                breakerNameElement.textContent = 'Champion';
                breakerNameElement.innerHTML = 'Champion';
                console.log('Using default name: Champion');
            }
        } else {
            console.error('Breaker name element not found!');
        }
    } catch (error) {
        console.error('Error in initializeBreakerName:', error);
    }
}

// Also try to update the name after a longer delay in case of any timing issues
setTimeout(() => {
    initializeBreakerName();
}, 500);

// Add a manual function to test URL parameter parsing
function testBreakerName() {
    const urlParams = new URLSearchParams(window.location.search);
    const breakerName = urlParams.get('breaker');
    const breakerNameElement = document.getElementById('breaker-name');
    
    console.log('Manual test:');
    console.log('- URL:', window.location.href);
    console.log('- Search params:', window.location.search);
    console.log('- Breaker param:', breakerName);
    console.log('- Element:', breakerNameElement);
    
    if (breakerNameElement && breakerName) {
        breakerNameElement.textContent = breakerName;
        breakerNameElement.innerHTML = breakerName;
        console.log('Manually set name to:', breakerName);
    }
}

// Run test function after page load
window.addEventListener('load', () => {
    setTimeout(testBreakerName, 1000);
});

// Countdown timer functionality
function initializeCountdown() {
    const deadline = new Date('2025-07-18T23:59:00-08:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = deadline - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const d = document.getElementById('days');
            const h = document.getElementById('hours');
            const m = document.getElementById('minutes');
            const s = document.getElementById('seconds');
            
            if (d) d.textContent = days.toString().padStart(2, '0');
            if (h) h.textContent = hours.toString().padStart(2, '0');
            if (m) m.textContent = minutes.toString().padStart(2, '0');
            if (s) s.textContent = seconds.toString().padStart(2, '0');
        } else {
            const d = document.getElementById('days');
            const h = document.getElementById('hours');
            const m = document.getElementById('minutes');
            const s = document.getElementById('seconds');
            
            if (d) d.textContent = '00';
            if (h) h.textContent = '00';
            if (m) m.textContent = '00';
            if (s) s.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Checklist functionality
function initializeChecklist() {
    console.log('Initializing checklist...');
    
    const checklistItems = document.querySelectorAll('.checklist-item');
    console.log('Found checklist items:', checklistItems.length);
    
    checklistItems.forEach((item, index) => {
        const checkbox = item.querySelector('.check-box');
        const label = item.querySelector('.checklist-label');
        
        if (checkbox) {
            console.log(`Setting up checkbox ${index + 1}`);
            
            // Remove any existing event listeners and add new ones
            checkbox.onclick = function(e) {
                console.log(`Checkbox ${index + 1} clicked, checked: ${this.checked}`);
                updateChecklistProgress();
            };
            
            checkbox.onchange = function(e) {
                console.log(`Checkbox ${index + 1} changed, checked: ${this.checked}`);
                handleCheckboxChange(e);
            };
        }
        
        if (label) {
            label.onclick = function(e) {
                e.preventDefault();
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    console.log(`Label clicked, checkbox ${index + 1} now checked: ${checkbox.checked}`);
                    updateChecklistProgress();
                }
            };
        }
        
        // Also make the entire item clickable
        item.onclick = function(e) {
            if (e.target === checkbox || e.target === label) return;
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                console.log(`Item clicked, checkbox ${index + 1} now checked: ${checkbox.checked}`);
                updateChecklistProgress();
            }
        };
        
        item.style.cursor = 'pointer';
    });
    
    // Add event listeners for all checkboxes
    document.querySelectorAll('.check-box').forEach(cb => {
        cb.addEventListener('change', handleCheckboxChange);
    });
}

// Handle checkbox state changes
function handleCheckboxChange(e) {
    updateChecklistProgress();
}

function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.check-box');
    const checkedCount = document.querySelectorAll('.check-box:checked').length;
    const totalCount = checkboxes.length;
    
    console.log(`Checklist progress: ${checkedCount}/${totalCount}`);
}

// Function to update status indicator
function updateStatus(status, text) {
    const indicator = document.getElementById('status-indicator');
    if (indicator) {
        const statusEl = indicator.querySelector('.status');
        if (statusEl) {
            statusEl.className = `status status--${status}`;
            statusEl.textContent = text;
        }
    }
}

// Add some visual polish
document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add entrance animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.break-card, .download-card, .checklist-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});