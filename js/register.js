const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

function register() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find((user) => user.email === email.value);

  if (userExists) {
    alert("Email already exists!");
    return;
  }

  const user = {
    username: username.value,

    email: email.value,

    password: password.value,

    image: "",
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration Successful!");

  location.href = "login.html";
};
