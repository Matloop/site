document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 200;
    let hue = 0;

    // Carregar a imagem que será usada como partícula
    const particleImage = new Image();
    particleImage.src = 'imagens/314206-1.png'; // Coloque o caminho da sua imagem

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10; // Tamanho ajustado para a imagem
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebater nas bordas do canvas
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }

        draw() {
            // Desenhar a imagem em vez de uma bolinha
            ctx.drawImage(particleImage, this.x, this.y, this.size, this.size);
        }
    }

    function handleParticles() {
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            // Remover partículas antigas
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
            }
        });
    }

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hue += 0.5; // A cor não é mais usada, mas mantida se for necessário adicionar efeitos
        handleParticles();
        requestAnimationFrame(animate);
    }

    // Esperar até a imagem carregar para iniciar a animação
    particleImage.onload = function() {
        createParticles();
        animate();
    };

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles(); // Recriar partículas ao redimensionar
    });
});
