document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const remember = document.querySelector('input[name="remember"]').checked;

        // Aquí iría la lógica de autenticación
        // Por ahora solo mostraremos un mensaje de éxito
        showNotification('Iniciando sesión...', 'success');
        
        // Simular un retraso de autenticación
        setTimeout(() => {
            // Redirigir al usuario a la página principal
            window.location.href = 'index.html';
        }, 1500);
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`Iniciando sesión con ${provider}...`, 'info');
        });
    });
});

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                    'linear-gradient(135deg, #3b82f6, #2563eb)'};
    `;

    document.body.appendChild(notification);

    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Añadir efectos de hover a los botones
document.querySelectorAll('.login-button, .social-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Validación de formulario en tiempo real
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function validateEmail() {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        setInputError(emailInput, 'El correo electrónico es requerido');
    } else if (!emailRegex.test(email)) {
        setInputError(emailInput, 'Ingresa un correo electrónico válido');
    } else {
        setInputSuccess(emailInput);
    }
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        setInputError(passwordInput, 'La contraseña es requerida');
    } else if (password.length < 6) {
        setInputError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
    } else {
        setInputSuccess(passwordInput);
    }
}

function setInputError(input, message) {
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Remover mensaje de error anterior si existe
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear y añadir nuevo mensaje de error
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.cssText = `
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
    `;
    errorMessage.textContent = message;
    input.parentElement.appendChild(errorMessage);
}

function setInputSuccess(input) {
    input.style.borderColor = '#10b981';
    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    
    // Remover mensaje de error si existe
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
} 