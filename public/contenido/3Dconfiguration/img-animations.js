        // ANIMACION IMAGENES
        const observer = new IntersectionObserver((entries) =>{
        
            entries.forEach((entry) => {
              if (entry.isIntersecting){
                entry.target.classList.add('show');
              } /*else{
                entry.target.classList.remove('show');
              }*/
            });
          });
  
          const hiddenElementsFR = document.querySelectorAll('.hiddenFromRight');
          hiddenElementsFR.forEach((el) => observer.observe(el));
          const hiddenElementsFL = document.querySelectorAll('.hiddenFromLeft');
          hiddenElementsFL.forEach((el) => observer.observe(el));
  