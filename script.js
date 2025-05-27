document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Сброс ошибок
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
    
    // Валидация
    if (!validateEmail(email)) {
        showError('email', 'Введите корректный email');
        return;
    }
    
    if (password.length < 6) {
        showError('password', 'Пароль должен содержать минимум 6 символов');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Пароли не совпадают');
        return;
    }
    
    // Регистрация (в реальном проекте здесь будет запрос к серверу)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.email === email)) {
        showError('email', 'Этот email уже зарегистрирован');
        return;
    }
    
    const newUser = {
        email: email,
        password: password, // В реальном проекте пароль должен быть хеширован!
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Перенаправление после успешной регистрации
    alert('Регистрация прошла успешно! Теперь вы можете войти.');
    window.location.href = 'login.html';
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    input.classList.add('error');
    
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}