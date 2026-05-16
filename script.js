// ============================================
// Contact Form Handler with Formspree
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const contactBtn = document.querySelector('.contact-btn');

    // Smooth scroll to contact form when clicking contact button
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'لم يتم التحديد',
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري الإرسال...';
            formStatus.textContent = '';

            try {
                // Send email using Formspree
                // استبدل البريد الإلكتروني التالي ببريدك الفعلي
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        service: data.service,
                        message: data.message,
                        _subject: `رسالة جديدة من ${data.name} - خدمة: ${data.service}`
                    })
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = '✓ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
                    formStatus.classList.add('success');
                    formStatus.classList.remove('error');
                    contactForm.reset();
                    
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.classList.remove('success');
                    }, 5000);
                } else {
                    throw new Error('فشل الإرسال');
                }
            } catch (error) {
                // Error
                console.error('Form submission error:', error);
                formStatus.textContent = '✗ حدث خطأ أثناء الإرسال. يرجى محاولة إرسال رسالة مباشرة عبر البريد الإلكتروني.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and portfolio items
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Navbar active link highlighting on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle (if you add a hamburger menu)
    // This is a placeholder for future mobile menu functionality

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Alternative: EmailJS Solution (No Formspree needed)
// If you prefer EmailJS, uncomment this section and comment Formspree above
// ============================================

/*
// Initialize EmailJS (replace 'YOUR_SERVICE_ID' with your EmailJS service ID)
// emailjs.init('YOUR_PUBLIC_KEY');

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                to_email: 'ahmed@example.com', // Replace with your email
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'لم يتم التحديد',
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري الإرسال...';
            
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    formStatus.textContent = '✓ تم إرسال رسالتك بنجاح!';
                    formStatus.classList.add('success');
                    contactForm.reset();
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.classList.remove('success');
                    }, 5000);
                }, function(error) {
                    formStatus.textContent = '✗ حدث خطأ. يرجى المحاولة لاحقاً.';
                    formStatus.classList.add('error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }
});
*/

// ============================================
// Utility Functions
// ============================================

// Format phone number
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.substring(0, 12);
    }
    input.value = value;
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add animation class on scroll
function addScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize all functions
window.addEventListener('load', () => {
    addScrollAnimation();
});
