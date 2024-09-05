document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea'); // Selecciona todos los campos de entrada y áreas de texto

    inputs.forEach((input, index) => {
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') { // Comprueba si se presiona Enter
          event.preventDefault(); // Evita que el formulario se envíe
          const nextInput = inputs[index + 1]; // Selecciona el siguiente campo
          if (nextInput) {
            nextInput.focus(); // Mueve el foco al siguiente campo
          }
      }
    });
  });
});
