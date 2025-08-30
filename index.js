const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const langToggleButton = document.getElementById('lang-toggle-button');
const body = document.body;
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('contact-success-message');

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });
});

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

let currentLang = 'ar';
const updateLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-ar], [data-en]');
    
    elements.forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText) {
            el.textContent = newText;
        }
    });

    const placeholders = {
        ar: {
            name: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            message: 'رسالتك',
            phone:'رقم الهاتف'
        },
        en: {
            name: 'Full Name',
            email: 'Email',
            message: 'Your Message',
            phone:'phone'
        }
    };
    document.getElementById('name').placeholder = placeholders[lang].name;
    document.getElementById('email').placeholder = placeholders[lang].email;
    document.getElementById('message').placeholder = placeholders[lang].message;
    document.getElementById('phone').placeholder = placeholders[lang].phone;

    if (lang === 'en') {
        body.setAttribute('dir', 'ltr');
        body.classList.add('en');
        langToggleButton.textContent = 'العربية';
    } else {
        body.setAttribute('dir', 'rtl');
        body.classList.remove('en');
        langToggleButton.textContent = 'English';
    }
    currentLang = lang;
};

langToggleButton.addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage(newLang);
});

updateLanguage('ar');

// Formspree submission handler
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const statusButton = form.querySelector('button[type="submit"]');
    statusButton.textContent = '...جاري الإرسال';
    statusButton.disabled = true;

    const data = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        successMessage.classList.remove('hidden');
        form.reset();
    } else {
        const errorText = 'حدث خطأ. الرجاء المحاولة مرة أخرى.';
        const errorMessageElement = document.createElement('div');
        errorMessageElement.textContent = errorText;
        errorMessageElement.classList.add('mt-4', 'text-red-600', 'font-semibold');
        form.appendChild(errorMessageElement);
    }
    statusButton.textContent = 'أرسل الرسالة';
    statusButton.disabled = false;
});