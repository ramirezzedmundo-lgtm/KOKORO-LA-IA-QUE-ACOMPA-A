// =============================================
// 🌸 KOKORO - SISTEMA DE SONIDOS
// Efectos mágicos estilo anime
// =============================================

// Crear contenedor de audio si no existe
(function() {
    // Verificar si ya existen los audios
    if (!document.getElementById('kokoro-click')) {
        const audioContainer = document.createElement('div');
        audioContainer.innerHTML = `
            <audio id="kokoro-click" preload="auto">
                <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg">
            </audio>
            <audio id="kokoro-star" preload="auto">
                <source src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3" type="audio/mpeg">
            </audio>
            <audio id="kokoro-welcome" preload="auto">
                <source src="https://www.soundjay.com/human/voices/children-laughing-01.mp3" type="audio/mpeg">
            </audio>
        `;
        document.body.appendChild(audioContainer);
    }

    // Elementos del DOM
    const boton = document.querySelector('.kokoro-button');
    const fondoEspecial = document.createElement('div');
    fondoEspecial.className = 'fondo-especial';
    fondoEspecial.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, #FFD1DC, #B0E0E6);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        z-index: 9999;
    `;
    document.body.appendChild(fondoEspecial);

    const audioClick = document.getElementById('kokoro-click');
    const audioStar = document.getElementById('kokoro-star');
    const audioWelcome = document.getElementById('kokoro-welcome');

    // Precargar audios
    if (audioClick) audioClick.load();
    if (audioStar) audioStar.load();
    if (audioWelcome) audioWelcome.load();

    // Función para reproducir sonido (con manejo de errores)
    function playSound(audioElement) {
        if (!audioElement) return;
        audioElement.currentTime = 0;
        audioElement.play().catch(error => {
            console.log('🔇 Error al reproducir audio (normal por políticas de navegadores):', error);
        });
    }

    // Función para activar fondo especial
    function activateFondo() {
        fondoEspecial.classList.add('activo');
        setTimeout(() => {
            fondoEspecial.classList.remove('activo');
        }, 500);
    }

    // Evento para el botón principal
    if (boton) {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            playSound(audioClick);
            activateFondo();
            
            setTimeout(() => {
                alert('🌸 ¡Gracias por querer conocer a KOKORO! Te contactaremos pronto.');
                playSound(audioWelcome);
            }, 600);
        });
    }

    // Evento para el formulario
    const betaForm = document.getElementById('beta-form');
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            playSound(audioStar);
            activateFondo();
            
            // Recoger datos (opcional - podrías enviarlos a un servidor después)
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            setTimeout(() => {
                alert(`🌸 ¡Gracias ${nombre || 'por tu interés'}! Te contactaremos a ${email || 'tu email'} cuando la beta esté lista.`);
                playSound(audioWelcome);
            }, 600);
        });
    }

    // Efectos adicionales para hover en botones
    const allButtons = document.querySelectorAll('.kokoro-button');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });

    console.log('🌸 KOKORO - Sistema de sonidos activado');
})();
