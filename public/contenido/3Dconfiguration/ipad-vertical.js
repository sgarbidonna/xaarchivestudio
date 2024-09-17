function isTabletOrIpadInPortrait() {
    // Detectar si es un iPad o un dispositivo con pantalla táctil
    const isIpadOrTablet = /iPad|Android/.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    // opcion alternativa p ver si estoy o no con portrait const isPortrait = window.orientation === 0 || window.orientation === 180;
  
    if (isIpadOrTablet && isPortrait) {
      console.log("Estás utilizando una tablet o iPad en modo vertical.");
      //alert('si');
      return true;
    } else {
      console.log("No estás usando una tablet o el dispositivo está en modo horizontal.");
      return false;
    }
  }
  
  // Llamar a la función para hacer la detección
  isTabletOrIpadInPortrait();
  
  // Escuchar cambios de orientación
  window.addEventListener("orientationchange", isTabletOrIpadInPortrait);
  