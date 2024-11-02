document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    
    loginButton.addEventListener('click', function(e) {
        e.preventDefault(); // Belum ada verifikasi disini
        window.location.href = 'index.html'; // Langsung direct ke index.html
    });
});