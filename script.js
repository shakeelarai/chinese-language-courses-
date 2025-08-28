// Registration Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Registration Form Handler
    const registrationForm = document.getElementById('studentRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Here you would typically send the data to your backend
            console.log('Registration data:', data);
            
            // Show success message
            alert('Registration successful! Welcome to lang.io!');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
            modal.hide();
            
            // Reset form
            this.reset();
        });
    }

    // Language Selection in Mobile Mockup
    const languageItems = document.querySelectorAll('.language-item');
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all items
            languageItems.forEach(lang => lang.classList.remove('selected'));
            languageItems.forEach(lang => lang.querySelector('.radio-btn').classList.remove('selected'));
            
            // Add selected class to clicked item
            this.classList.add('selected');
            this.querySelector('.radio-btn').classList.add('selected');
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero Button Functionality
    const joinWaitlistBtn = document.querySelector('.hero-buttons .btn-primary');
    if (joinWaitlistBtn) {
        joinWaitlistBtn.addEventListener('click', function() {
            // Open registration modal
            const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
            modal.show();
        });
    }

    const learnMoreBtn = document.querySelector('.hero-buttons .btn-outline-primary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to about section or show more info
            alert('Learn more about lang.io - Coming soon!');
        });
    }

    // Form Validation Enhancement
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Password Strength Indicator
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // Remove existing strength classes
            this.classList.remove('border-danger', 'border-warning', 'border-success');
            
            // Add appropriate strength class
            if (strength < 3) {
                this.classList.add('border-danger');
            } else if (strength < 5) {
                this.classList.add('border-warning');
            } else {
                this.classList.add('border-success');
            }
        });
    }

    // Mobile Mockup Animation
    const mobileMockup = document.querySelector('.mobile-mockup');
    if (mobileMockup) {
        // Add parallax effect on mouse move
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            if (mobileMockup) {
                const rotateY = -15 + (mouseX - 0.5) * 10;
                const rotateX = 5 + (mouseY - 0.5) * 10;
                mobileMockup.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
    }

    // Floating Flags Animation Enhancement
    const floatingFlags = document.querySelectorAll('.flag-float');
    floatingFlags.forEach((flag, index) => {
        flag.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        flag.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Form Field Auto-save (localStorage)
    const formFields = document.querySelectorAll('#studentRegistrationForm input, #studentRegistrationForm select');
    formFields.forEach(field => {
        // Load saved data
        const savedValue = localStorage.getItem(`langio_${field.id}`);
        if (savedValue) {
            field.value = savedValue;
        }
        
        // Save data on input
        field.addEventListener('input', function() {
            localStorage.setItem(`langio_${this.id}`, this.value);
        });
    });

    // Clear saved data after successful submission
    const clearSavedData = () => {
        formFields.forEach(field => {
            localStorage.removeItem(`langio_${field.id}`);
        });
    };

    // Add clear data to form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', clearSavedData);
    }

    // Loading Animation for Form Submission
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        registrationForm.addEventListener('submit', function() {
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitBtn.innerHTML = 'Create Account';
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Toast Notification System
    const showToast = (message, type = 'success') => {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        document.body.appendChild(toastContainer);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast container after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            document.body.removeChild(toastContainer);
        });
    };

    // Enhanced form submission with toast
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading toast
            showToast('Creating your account...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showToast('Account created successfully! Welcome to lang.io!', 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
                modal.hide();
                
                // Reset form
                this.reset();
                clearSavedData();
            }, 2000);
        });
    }
});
