var swiper = new Swiper(".swiperPhimSapChieu", {
  slidesPerView: 1,
  grid: {
    rows: 3,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 300,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".swiperSuKien", {
  slidesPerView: 1,
  grid: {
    rows: 3,
  },
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
  },
  speed: 300,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".swiperSuKienTablet", {
  slidesPerView: 2,
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
  },
  speed: 300,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    760: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
})

var swiper = new Swiper(".swiperKhuyenMaiTablet", {
  slidesPerView: 2,
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
  },
  speed: 300,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    760: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
})

var swiper = new Swiper(".swiperPhimSapChieuTablet", {
  slidesPerView: 'auto',
  spaceBetween: 30,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".swiperPhimDangChieuTablet", {
  slidesPerView: 3,
  spaceBetween: 0,
  preloadImages: true,
  loopAdditionalSlides: 4,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 320,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 4,
    },
  },
});