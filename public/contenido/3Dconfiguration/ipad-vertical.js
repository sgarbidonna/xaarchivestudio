function isTabletOrIpadInPortrait() {
    // Detectar si es un iPad o un dispositivo con pantalla táctil
    const isIpadOrTablet = /iPad|Android/.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    // opcion alternativa p ver si estoy o no con portrait const isPortrait = window.orientation === 0 || window.orientation === 180;
  
    if (isIpadOrTablet && isPortrait) {
      console.log("Estás utilizando una tablet o iPad en modo vertical.");
      //alert('si');
      
            const sectionIntro = document.querySelector('.section-intro');
            const canvas = document.querySelector('#canvas');
            const sdControl = document.querySelector('.sd-control');
            const menu = document.querySelector('#menu');
            const intro3D = document.querySelector('.intro-3d');
            const infoMenu = document.querySelector('#info-menu');

            // Aplicar estilos con JavaScript
            sectionIntro.style.position = 'relative';
            sectionIntro.style.maxWidth = '100vw';
            sectionIntro.style.height = 'auto';
            sectionIntro.style.padding = '15vh 3vw 12vh 3vw';
            sectionIntro.style.flexDirection = 'column';

            canvas.style.maxWidth = '63vw';
            canvas.style.maxHeight = '49vw';
            canvas.style.mixBlendMode = 'multiply';
            canvas.style.marginLeft = '16vw';

            sdControl.style.gridTemplateColumns = '17% 64% 25%';

            menu.style.fontSize = 'x-small';

            intro3D.style.marginTop = '2em';
            intro3D.style.display = 'grid';
            intro3D.style.gridTemplateRows = '55%';
            intro3D.style.height = 'auto';
            intro3D.style.maxHeight = '100vh';

            infoMenu.style.maxWidth = '100vw';
            infoMenu.style.gridTemplateColumns = '45% 50%';
            infoMenu.style.marginTop = '3vh';
            infoMenu.style.marginBottom = '1vh';
            infoMenu.style.height = '5vh';
            infoMenu.style.display = 'grid';
            infoMenu.style.alignContent = 'space-between';
            infoMenu.style.justifyContent = 'space-evenly';
            infoMenu.style.alignItems = 'center';
            infoMenu.style.justifyItems = 'stretch';
            infoMenu.style.marginLeft = '50px';

      return true;
    } else {
    }
  }
  
  isTabletOrIpadInPortrait();
  window.addEventListener("orientationchange", isTabletOrIpadInPortrait);
  