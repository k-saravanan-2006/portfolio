document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 50, // offset (in px) from the original trigger point
        easing: 'ease-out-cubic', // default easing for AOS animations
    });

    // 2. Sticky Header blur effect on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mini Gallery Modal logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 4. Testimonial active state toggle logic (simple hover enhancement for the horizontal slider)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove active from all
            testimonialCards.forEach(c => c.classList.remove('active'));
            // Add to current
            card.classList.add('active');
        });
    });

    // 5. Contact Form Submission Bounce effect
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add a temporary pop effect
        submitBtn.style.transform = 'scale(0.9)';
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1.05)';
            submitBtn.style.boxShadow = '0 0 40px var(--accent-glow)';
            
            setTimeout(() => {
                submitBtn.style.transform = '';
                submitBtn.style.boxShadow = '';
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4BB543'; // Success color
                submitBtn.style.color = '#fff';
                
                // Reset form
                contactForm.reset();
                
                // Restore button after 3s
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = ''; // Reverts to CSS class defined bg
                    submitBtn.style.color = '';
                }, 3000);

            }, 200);
        }, 150);
    });
});
