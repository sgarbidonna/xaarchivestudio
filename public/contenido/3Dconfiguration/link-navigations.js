const offsetHeight = 140;

// NAVBAR NAVIGATION q 
  document.querySelectorAll('.dropdown a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
     
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = targetElement.offsetTop - offsetHeight;
      if (targetElement) {
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        history.pushState(null, null, ' ');
      }
    });
  });

// NAVBAR NAVIGATION CONTACT US q 
  document.querySelectorAll('.contact-us').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
     
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = targetElement.offsetTop - offsetHeight;
      if (targetElement) {
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        history.pushState(null, null, ' ');
      }
    });
  });

  // NAVBAR NAVIGATION  DROPDOWN TABLET 
  document.querySelectorAll('.dropdown-tablet a').forEach(anchor => {
   if (anchor.className == 'menu-options' ){
      anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = targetElement.offsetTop - offsetHeight;
      if (targetElement) {
        closeMenu();
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        history.pushState(null, null, ' ');
      }
    });
    } 
  });


  // NAVBAR NAVIGATION  DROPDOWN TABLET LANGUAGES

  document.getElementById('ita').addEventListener('click', function(e) {
      location.href =this.getAttribute('href');
  });
  document.getElementById('eng').addEventListener('click', function(e) {
      location.href =this.getAttribute('href');
  });
  document.getElementById('es').addEventListener('click', function(e) {
      location.href =this.getAttribute('href');
  });

//ARROWS NAVIGATION 
  document.getElementById('arrows').addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const offset = targetElement.offsetTop - offsetHeight;
    if (targetElement) {
        window.scrollTo({
          top: offset,
          behavior: 'smooth'  
        });
        history.pushState(null, null, ' ');
      }
  });

//LOGO NAVIGATION 
  document.getElementById('xaa-logo').addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
//            const offset = targetElement.offsetTop - offsetHeight;
    if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'  
        });
        history.pushState(null, null, ' ');
      }
  });