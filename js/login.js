const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

function login() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (item) => item.email === email.value && item.password === password.value,
  );

  if (!user) {
    alert("Email or Password is incorrect!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Welcome " + user.username);

  location.href = "index.html";
};
