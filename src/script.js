document.addEventListener('DOMContentLoaded', () => {
    const banners = document.querySelectorAll('.carousel-item');

    banners.forEach((banner) => {
        banner.addEventListener('click', () => {
            window.open('produtos.html', '_blank'); // Redireciona para a página de produtos em uma nova aba
        });
    });

    // Funções do carrossel existentes
    let currentIndex = 0;
    const totalItems = banners.length;
    let carouselInterval;

    function updateCarousel() {
        document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function showNextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function showPrevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    function nextItem() {
        clearInterval(carouselInterval);
        showNextItem();
        carouselInterval = setInterval(showNextItem, 3000); // Reinicia o intervalo
    }

    function prevItem() {
        clearInterval(carouselInterval);
        showPrevItem();
        carouselInterval = setInterval(showNextItem, 3000); // Reinicia o intervalo
    }

    updateCarousel();
    carouselInterval = setInterval(showNextItem, 3000); // Inicia o carrossel automático
});
