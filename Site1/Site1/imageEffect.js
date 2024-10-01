document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('changing-image');
    const body = document.body;
    let isDistorted = false;

    image.addEventListener('click', function() {
        if (!isDistorted) {
            isDistorted = true;
            
            // Aplicar efeito de distorção
            body.style.filter = 'blur(10px) hue-rotate(90deg) contrast(150%)';
            body.style.transition = 'filter 2s';

            // Trocar a imagem
            setTimeout(() => {
                image.src = 'imagens/Design sem nome.png'; // Substitua pelo caminho da nova imagem
            }, 250);

            // Remover efeito de distorção
            setTimeout(() => {
                body.style.filter = 'none';
                isDistorted = false;
            }, 500);
        }
    });
});