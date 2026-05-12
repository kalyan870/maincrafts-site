document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = toggle.closest('.dropdown');
                parent.classList.toggle('active');
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const fields = {
            name: {
                element: document.getElementById('name'),
                validate: (val) => {
                    if (!val.trim()) return 'Name is required';
                    if (val.trim().length < 2) return 'Name must be at least 2 characters';
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                validate: (val) => {
                    if (!val.trim()) return 'Email is required';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val.trim())) return 'Please enter a valid email';
                    return '';
                }
            },
            subject: {
                element: document.getElementById('subject'),
                validate: (val) => {
                    if (!val.trim()) return 'Subject is required';
                    if (val.trim().length < 3) return 'Subject must be at least 3 characters';
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                validate: (val) => {
                    if (!val.trim()) return 'Message is required';
                    if (val.trim().length < 10) return 'Message must be at least 10 characters';
                    return '';
                }
            }
        };

        function showError(input, message) {
            const errorSpan = input.parentElement.querySelector('.error-message');
            input.classList.remove('success');
            input.classList.add('error');
            if (errorSpan) errorSpan.textContent = message;
        }

        function showSuccess(input) {
            const errorSpan = input.parentElement.querySelector('.error-message');
            input.classList.remove('error');
            input.classList.add('success');
            if (errorSpan) errorSpan.textContent = '';
        }

        function validateField(fieldName) {
            const field = fields[fieldName];
            if (!field) return true;
            const error = field.validate(field.element.value);
            if (error) {
                showError(field.element, error);
                return false;
            }
            showSuccess(field.element);
            return true;
        }

        Object.keys(fields).forEach((key) => {
            const field = fields[key];
            field.element.addEventListener('blur', () => validateField(key));
            field.element.addEventListener('input', () => {
                if (field.element.classList.contains('error')) {
                    validateField(key);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            Object.keys(fields).forEach((key) => {
                if (!validateField(key)) isValid = false;
            });

            if (isValid) {
                contactForm.classList.add('hidden');
                document.getElementById('formSuccess').classList.remove('hidden');
            }
        });
    }
});