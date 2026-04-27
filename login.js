const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("email").value;

    document.cookie = "username=" + encodeURIComponent(username) + "; path=/";

    window.location.href = "index.html";
});
