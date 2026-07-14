const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  location.href = "login.html";
}

const profileImage = document.getElementById("profileImage");
const username = document.getElementById("username");
const email = document.getElementById("email");
const imageInput = document.getElementById("imageInput");
const saveImage = document.getElementById("saveImage");
const logoutBtn = document.getElementById("logoutBtn");

username.textContent = currentUser.username;
email.textContent = currentUser.email;

if (currentUser.image) {
  profileImage.src = currentUser.image;
}

saveImage.addEventListener("click", () => {
  const file = imageInput.files[0];

  if (!file) {
    alert("Choose an image");
    return;
  }

  // აუცილებელია ფოტოს ატვირთვისთვის ;დ
  const reader = new FileReader();

  reader.onload = function () {
    currentUser.image = reader.result;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex((user) => user.email === currentUser.email);

    if (index !== -1) {
      users[index] = currentUser;

      localStorage.setItem("users", JSON.stringify(users));
    }

    profileImage.src = reader.result;

    alert("Photo Updated!");
  };

  reader.readAsDataURL(file);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");

  location.href = "login.html";
});
