document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea'); // Selecciona todos los campos de entrada y áreas de texto

    inputs.forEach((input, index) => {
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') { 
          event.preventDefault(); 
          const nextInput = inputs[index + 1]; 
          if (nextInput) {
            nextInput.focus(); 
          }
      }
    });
  });
});
