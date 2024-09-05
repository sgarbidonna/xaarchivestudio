
document.getElementById('submit-link').addEventListener('click', function(event) {
          
    event.preventDefault(); 
    document.querySelector("#form").dispatchEvent(new Event('submit', { cancelable: true })); //ver
    
    const form = document.getElementById('form');
    // const submitLink = document.getElementById('submit-link');


    if (validateForm()) {
      sendEmail(document.querySelector('form'));
      clearPlaceholders();
    } 


    function clearPlaceholders(){
        document.getElementById('name').value ="";
        document.getElementById('company-name').value ="";
        document.getElementById('email').value ="";
        document.getElementById('country').value ="";
        document.getElementById('message').value ="";
        document.getElementById('pricing-info').checked  = false;
        
    }

    function cantBeBlankPlaceholder(elements, color) {
      elements.forEach(element => {
        element.style.setProperty('box-shadow', color, 'important');
      });
    }

    function validateEmail(email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
    }

    function validateForm() {
      let isValid = true;
      const requiredFields = document.querySelectorAll('input[required], textarea[required]');
      
      requiredFields.forEach(field => {
            if (!field.value) {
                cantBeBlankPlaceholder([field], '0 0px 12px 0 red');
                setPlaceholderColor(field, 'red');
                isValid = false;
            } else {
                cantBeBlankPlaceholder([field], '0 0px 0px 0 #ffffff');
                setPlaceholderColor(field, 'transparent');
            }
        });

        const emailField = document.getElementById('email');

        if (!validateEmail(emailField.value)) {
            cantBeBlankPlaceholder([emailField], '0 0px 12px 0 red');
            setPlaceholderColor(emailField, 'red');
            setPlaceholderMessage(emailField, 'Invalid email address');
            isValid = false;
        } else {
          cantBeBlankPlaceholder([emailField], '0 0px 0px 0 #ffffff');
          setPlaceholderColor(emailField, 'transparent');
          
        }

        return isValid;
     }

      

      function setPlaceholderColor(element, color) {
          if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
              const placeholderStyle = document.createElement('style');
              placeholderStyle.innerHTML = `
                  #${element.id}::placeholder {
                      color: ${color} !important;
                  }
              `;
              document.head.appendChild(placeholderStyle);
          }
      }

      function setPlaceholderMessage(element, message) {
          element.value=' ' ;
          element.setAttribute('placeholder', message);
      }

      
});


    function sendEmail(form) {
            // usando https://www.emailjs.com/

            const serviceID = 'sgarbidonna';
            const templateID = 'template_lm45psw';
            emailjs.init('ASLOelAm_gLaq_f9X')
         
            emailjs.sendForm(serviceID, templateID, form)
             .then(() => {
                let submitButton = document.getElementById('span-submit');
                submitButton.textContent= 'SENT!';
                setTimeout(() => {       
                    submitButton.textContent = 'SUBMIT';
                  }, 3000);

             }, (err) => {
                console.log(JSON.stringify(err));
             });
    }


    
 