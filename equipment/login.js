document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error message
    errorMessage.textContent = '';
    
    // Simple validation
    if (!email || !password) {
        errorMessage.textContent = 'Please fill in all fields';
        return;
    }
    
    // For demo purposes, accept any non-empty email/password
    // In production, you would validate against a backend server
    if (email && password) {
        // Redirect to the main page
        window.location.href = 'indes.html';
    }
});