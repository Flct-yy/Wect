const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const navMenu = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

// 切换菜单
function toggleMenu() {
  if(!showMenu) {
    hamburger.classList.add('open');
    showMenu = true;
  }else {
    hamburger.classList.remove('open');
    showMenu = false;
  }
  // toggle 有这个类名的话就移除，没有的话就添加
  nav.classList.toggle('open');
  navMenu.classList.toggle('open');
  for(let i = 0; i < navItems.length; i++) {
    navItems[i].classList.toggle('open');
  }

}