document.addEventListener("DOMContentLoaded", () => {
  const banners = document.querySelectorAll(".carousel-item");
  const nextButton = document.querySelector(".carousel-control.right");
  const prevButton = document.querySelector(".carousel-control.left");

  banners.forEach((banner) => {
    banner.addEventListener("click", () => {
      window.open("cardapio.html", "_blank");
    });
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    nextItem();
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    prevItem();
  });

  let currentIndex = 0;
  const totalItems = banners.length;
  let carouselInterval;

  function updateCarousel() {
    document.querySelector(".carousel-inner").style.transform = `translateX(-${
      currentIndex * 100
    }%)`;
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
    carouselInterval = setInterval(showNextItem, 3000);
  }

  function prevItem() {
    clearInterval(carouselInterval);
    showPrevItem();
    carouselInterval = setInterval(showNextItem, 3000);
  }

  updateCarousel();
  carouselInterval = setInterval(showNextItem, 3000);
});
