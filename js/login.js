

// ***********************************************************************
if (localStorage.getItem("loggedIn") === "true") {
  window.location.href = "index.html";
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
    alert("Invalid email or password!");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
});
