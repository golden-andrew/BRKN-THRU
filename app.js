// App initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeBreakerName();
        initializeCountdown();
        initializeFileUpload();
        initializeChecklist();
        initializeDownloadHandlers();
        initializeUploadTrigger();
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

// Initialize download handlers with event delegation
function initializeDownloadHandlers() {
    console.log('Initializing download handlers...');
    
    // Event delegation for download buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('download-btn')) {
            downloadFile(e.target.dataset.file);
        }
    });
}

// Initialize upload trigger button
function initializeUploadTrigger() {
    console.log('Initializing upload trigger...');
    
    const uploadTriggerBtn = document.querySelector('.upload-trigger-btn');
    if (uploadTriggerBtn) {
        uploadTriggerBtn.addEventListener('click', () => {
            document.getElementById('upload-area').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('file-input').click();
        });
    }
}

// Function to trigger upload
function triggerUpload() {
    document.getElementById('upload-area').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('file-input').click();
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

// File upload functionality
function initializeFileUpload() {
    console.log('Initializing file upload...');
    
    const ua = document.getElementById('upload-area');
    const fi = document.getElementById('file-input');
    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const uf = document.getElementById('upload-files');
    
    console.log('Upload area:', ua);
    console.log('File input:', fi);
    
    let uploadedFiles = [];
    
    if (!ua || !fi) {
        console.error('Upload elements not found');
        return;
    }
    
    // Make sure the file input is properly configured
    fi.style.display = 'none';
    fi.style.position = 'absolute';
    fi.style.left = '-9999px';
    
    // Click handler for upload area
    function handleUploadClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Upload area clicked');
        fi.click();
    }
    
    // Add multiple event listeners to ensure clicking works
    ua.addEventListener('click', handleUploadClick);
    ua.addEventListener('mousedown', function(e) {
        e.preventDefault();
    });
    
    // Add click handler to specific elements within upload area
    const uploadContent = ua.querySelector('.upload-content');
    const uploadTitle = ua.querySelector('.upload-title');
    const uploadDescription = ua.querySelector('.upload-description');
    const uploadLink = ua.querySelector('.upload-link');
    
    if (uploadContent) {
        uploadContent.addEventListener('click', handleUploadClick);
    }
    if (uploadTitle) {
        uploadTitle.addEventListener('click', handleUploadClick);
    }
    if (uploadDescription) {
        uploadDescription.addEventListener('click', handleUploadClick);
    }
    if (uploadLink) {
        uploadLink.addEventListener('click', handleUploadClick);
    }
    
    // Drag and drop events
    ua.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ua.classList.add('drag-over');
    });
    
    ua.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ua.classList.remove('drag-over');
    });
    
    ua.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        ua.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
    
    // File input change
    fi.addEventListener('change', function(e) {
        console.log('File input changed, files:', e.target.files.length);
        const files = Array.from(e.target.files);
        handleFiles(files);
    });
    
    function handleFiles(files) {
        console.log('Handling files:', files.length);
        
        const validFiles = files.filter(file => {
            const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            return validTypes.includes(file.type);
        });
        
        if (validFiles.length === 0) {
            alert('Please select valid files (PDF, JPG, PNG)');
            updateStatus('error', 'Failed');
            return;
        }
        
        validFiles.forEach(file => {
            uploadFile(file);
        });
    }
    
    function uploadFile(file) {
        const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add file to display
        const fileItem = createFileItem(file, fileId);
        if (uf) {
            uf.appendChild(fileItem);
        }
        
        // Show progress
        if (uploadProgress) {
            uploadProgress.classList.remove('hidden');
        }
        
        // Simulate upload process
        simulateUpload(file, fileId);
    }
    
    function createFileItem(file, fileId) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.id = `file-${fileId}`;
        
        const fileIcon = getFileIcon(file.type);
        const fileSize = formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${fileIcon}</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <div class="file-status" id="status-${fileId}">Uploading...</div>
        `;
        
        return fileItem;
    }
    
    function getFileIcon(fileType) {
        if (fileType === 'application/pdf') return '📄';
        if (fileType.startsWith('image/')) return '🖼️';
        return '📁';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function simulateUpload(file, fileId) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `Uploading... ${Math.round(progress)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                completeUpload(fileId);
            }
        }, 200);
    }
    
    function completeUpload(fileId) {
        const statusElement = document.getElementById(`status-${fileId}`);
        if (statusElement) {
            statusElement.textContent = 'Uploaded';
            statusElement.className = 'file-status success';
        }
        
        uploadedFiles.push(fileId);
        
        // Hide progress after a delay
        setTimeout(() => {
            if (uploadProgress) uploadProgress.classList.add('hidden');
            if (progressFill) progressFill.style.width = '0%';
            if (progressText) progressText.textContent = 'Uploading...';
        }, 1000);
        
        // Handle upload success
        handleUploadSuccess();
        
        // Check if all required files are uploaded
        if (uploadedFiles.length >= 2) {
            setTimeout(() => {
                showConfirmation();
            }, 2000);
        }
    }
    
    // Handle successful upload
    function handleUploadSuccess() {
        // Auto-check step 4 when files are uploaded
        const step4 = document.getElementById('step4');
        if (step4) {
            step4.checked = true;
        }
        
        updateStatus('success', 'Completed');
        
        // Auto-check step 5 after brief delay
        setTimeout(() => {
            const step5 = document.getElementById('step5');
            if (step5) {
                step5.checked = true;
            }
        }, 1000);
    }
    
    function showConfirmation() {
        const cs = document.getElementById('confirmation-section');
        if (cs) {
            cs.classList.remove('hidden');
            
            // Scroll to confirmation
            cs.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// Download functionality
function downloadFile(filename) {
    console.log('Download requested for:', filename);
    
    // Update checklist based on downloaded file
    if (filename === 'break-explainer.pdf') {
        const step1 = document.getElementById('step1');
        if (step1) step1.checked = true;
    }
    
    // Show download notification
    showDownloadNotification(filename);
}

function showDownloadNotification(filename) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    notification.textContent = `${filename} downloaded successfully!`;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

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

// Add some interactive polish to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(4);
        opacity: 0;
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});