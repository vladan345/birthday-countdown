const menuIcon = document.querySelector(".ham-menu");
const menu = document.querySelector(".menu");
const background = document.querySelector(".background");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("opened");
  background.classList.toggle("bg-opened");
  menu.classList.toggle("menu-opened");
});
