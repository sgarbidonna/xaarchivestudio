



// NAV MENU P DISPOSITIVOS MOVIILES Y TABLET
const menuTablet = document.getElementById('menu-tablet');
const dropdownTablet =  document.getElementById('dropdown-tablet');
const screenMine = document.getElementById('smooth-scroll-wrapper');
let menuOpen = 0;
let heightScreen = (window.innerHeight /2) + (window.innerHeight /5);

const isIpadOrTablet = /iPad|Android/.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) && (window.innerWidth > 766);
const isPortrait = window.matchMedia("(orientation: portrait)").matches;

function isTabletOrIpadInPortrait() {
  if (isIpadOrTablet && isPortrait) {
    heightScreen = (window.innerHeight /2) - (window.innerHeight /5);
  
  }
}

isTabletOrIpadInPortrait();

menuTablet.addEventListener('click', function(e) {
  e.preventDefault();
  if (menuOpen == 0){
    openMenu();
    } else {
      closeMenu();
    }
});

document.querySelectorAll('menu-options').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      closeMenu();
  })
});

  function openMenu(){
    menuOpen = 1;
    dropdownTablet.style.zIndex='15';
    menuTablet.style.rotate='0deg';
    menuTablet.style.fontSize='xx-large';
    menuTablet.textContent = 'x';
    
    dropdownTablet.style.height= heightScreen.toString() + 'px'; 
    dropdownTablet.style.opacity='100';
    dropdownTablet.style.top='75px';
    document.querySelectorAll('.dropdown-tablet a').forEach( element => {
      element.style.opacity='1';
    });
  }

  function closeMenu(){
    dropdownTablet.style.zIndex='1';
      menuOpen = 0;
      menuTablet.style.rotate='-90deg';
      menuTablet.style.fontSize='xxx-large';
      menuTablet.textContent = '...';

      dropdownTablet.style.height='0vh'  
      dropdownTablet.style.opacity='0';
      dropdownTablet.style.top='-100vh';
      document.querySelectorAll('.dropdown-tablet a').forEach( element => {
        element.style.opacity='0';
    });
    };
  

  
  isTabletOrIpadInPortrait();
  window.addEventListener("orientationchange", isTabletOrIpadInPortrait);