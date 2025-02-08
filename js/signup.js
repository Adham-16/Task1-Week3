
// *************************************************************************
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";
});



