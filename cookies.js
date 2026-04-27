// Utility function to read cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        cookie = cookie.trim();
        if(cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

// Display greeting on page load
document.addEventListener('DOMContentLoaded', function() {
    const username = getCookie('username');
    const greetingEl = document.getElementById('greeting');
    if(greetingEl && username) {
        greetingEl.textContent = 'Hello, ' + username + '!';
    }
});
