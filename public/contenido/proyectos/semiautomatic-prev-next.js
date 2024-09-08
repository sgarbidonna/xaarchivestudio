console.log('entro');
function updateNavigationButtons(number) {
    if (typeof number !== 'number' || number < 1 || number > 999) {
        console.error('El número debe estar entre 1 y 999');
        return;
    }

    const formattedNumber = number.toString().padStart(3, '0');

    fetch('../.././') 
        .then(response => response.text())
        .then(data => {
            // aca falta q lea los tilde
            let htmlFiles = data.match(/\b\d{3}[\w!._-]*\.html/gi);
            
            // aca faltan  22 23 24 
            //let htmlFiles = data.match(/\b\d{3}[\w!@#$%^&*()_+{}\[\]:;"'<>,.?/\\-]*\.html/g);
            /*
            let htmlFiles = data.match(/\b\d{3}[\w!._-]*\.html/gi);
            let htmlFiles2 = data.match(/\b\d{3}[\w!@#$%^&*()_+{}\[\]:;"'<>,.?/\\-]*\.html/g);
            let combinedHtmlFiles = new Set([...htmlFiles || [], ...htmlFiles2 || []]);
            combinedHtmlFiles = Array.from(combinedHtmlFiles).sort((a, b) => parseInt(a.substring(0, 3)) - parseInt(b.substring(0, 3)));
            htmlFiles= combinedHtmlFiles
           */

            console.log('htmlFiles', htmlFiles);
            htmlFiles.sort((a, b) => parseInt(a.substring(0, 3)) - parseInt(b.substring(0, 3)));
            console.log('ordenados', htmlFiles);
            const currentIndex = htmlFiles.findIndex(file => file.startsWith(formattedNumber));
            console.log(currentIndex);
            if (currentIndex === -1) {
                console.error('Archivo no encontrado');
                return;
            }

            const prevFile = htmlFiles[currentIndex - 1] ? htmlFiles[currentIndex - 1] : null;
            const nextFile = htmlFiles[currentIndex + 1] ? htmlFiles[currentIndex + 1] : '001_m_807.html'; 
 
            //console.log(`archivo actual: ${htmlFiles[currentIndex]}`);
            console.log(`anterior: ${prevFile}`);
            console.log(`posterior: ${nextFile}`);

            if (prevFile) {
                document.querySelector('.boton-prev').setAttribute('href', prevFile);
            }

            if (nextFile) {
                document.querySelector('.boton-next').setAttribute('href', nextFile);
            }
        })
        .catch(error => console.error('Error al obtener los archivos:', error));
}
