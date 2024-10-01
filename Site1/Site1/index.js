document.addEventListener('DOMContentLoaded', function() {
    // Animação de fade-in para elementos
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Toggle para a seção de experiência
    const experienciaToggle = document.querySelector('.experiencia-toggle');
    const experienciaConteudo = document.querySelector('.experiencia-conteudo');

    experienciaToggle.addEventListener('click', () => {
        experienciaToggle.classList.toggle('ativo');
        if (experienciaConteudo.style.display === 'block') {
            experienciaConteudo.style.display = 'none';
        } else {
            experienciaConteudo.style.display = 'block';
        }
    });

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Atualizar link ativo no menu
    const sections = document.querySelectorAll('.secao');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('ativo');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const photo = document.getElementById('rotating-photo');
    let rotation = 0;
    let scale = 1;
    let isAnimating = false;

    function animatePhoto() {
        if (isAnimating) return;
        isAnimating = true;

        const animation = setInterval(() => {
            rotation += 5;
            scale -= 0.01;
            if (scale < 0) scale = 0;

            photo.style.transform = `rotate(${rotation}deg) scale(${scale})`;

            if (rotation >= 360 || scale <= 0) {
                clearInterval(animation);
                setTimeout(() => {
                    photo.style.transform = 'rotate(0deg) scale(1)';
                    isAnimating = false;
                }, 500);
            }
        }, 20);
    }

    photo.addEventListener('click', animatePhoto);
});

document.addEventListener('DOMContentLoaded', function() {
    const photo = document.getElementById('rotating-photo');
    const changingImage = document.getElementById('changing-image');
    let isChanging = false;

    // Configuração do áudio usando Web Audio API
    let audioContext;
    let audioBuffer;

    fetch('audios/jumpscare-94984.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return audioContext.decodeAudioData(arrayBuffer);
        })
        .then(decodedAudio => {
            audioBuffer = decodedAudio;
        })
        .catch(error => console.error('Erro ao carregar áudio:', error));

    // Função para tocar o áudio
    function playAudio() {
        if (audioContext && audioBuffer) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0);
        } else {
            console.error('Áudio não está pronto para reprodução');
        }
    }

    changingImage.addEventListener('click', function() {
        if (!isChanging) {
            isChanging = true;
            
            // Tocar o áudio
            playAudio();
            
            // Criar uma nova imagem em tela cheia
            const fullscreenImage = document.createElement('img');
            fullscreenImage.src = 'imagens/s200_arquelau.pasta.jpeg';
            fullscreenImage.style.position = 'fixed';
            fullscreenImage.style.top = '0';
            fullscreenImage.style.left = '0';
            fullscreenImage.style.width = '100vw';
            fullscreenImage.style.height = '100vh';
            fullscreenImage.style.objectFit = 'cover';
            fullscreenImage.style.zIndex = '9999';
            fullscreenImage.style.animation = 'spin 1s linear infinite';
            
            document.body.appendChild(fullscreenImage);
            
            // Aplicar efeito de distorção
            document.body.style.transition = 'filter 0.3s';
            document.body.style.filter = 'blur(10px) hue-rotate(90deg)';
            
            // Remover a animação e o efeito de distorção após 5 segundos
            setTimeout(() => {
                fullscreenImage.style.animation = 'none';
                document.body.style.filter = 'none';
                
                // Ajustar a imagem para ficar centralizada e em tamanho apropriado
                fullscreenImage.style.width = '80vw';
                fullscreenImage.style.height = '80vh';
                fullscreenImage.style.top = '10vh';
                fullscreenImage.style.left = '10vw';
                fullscreenImage.style.borderRadius = '10px';
                fullscreenImage.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
                
                // Adicionar um botão para fechar a imagem
                const closeButton = document.createElement('button');
                closeButton.textContent = 'X';
                closeButton.style.position = 'fixed';
                closeButton.style.top = '5vh';
                closeButton.style.right = '5vw';
                closeButton.style.zIndex = '10000';
                closeButton.style.fontSize = '24px';
                closeButton.style.padding = '10px 20px';
                closeButton.style.cursor = 'pointer';
                
                closeButton.addEventListener('click', () => {
                    fullscreenImage.remove();
                    closeButton.remove();
                    isChanging = false;
                });
                
                document.body.appendChild(closeButton);
            }, 1500);
        }
    });

    // ... (mantenha qualquer código existente para a foto rotativa aqui) ...
});