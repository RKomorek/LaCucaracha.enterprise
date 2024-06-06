let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
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
            carouselInterval = setInterval(showNextItem, 5000);
        }

        function prevItem() {
            clearInterval(carouselInterval);
            showPrevItem();
            carouselInterval = setInterval(showNextItem, 5000);
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateCarousel();
            carouselInterval = setInterval(showNextItem, 5000);
        });