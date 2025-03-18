'use strict';

// Sticky, Go To Top JS
window.addEventListener('scroll', function () {
    // Header Sticky JS
    if (window.scrollY > 150) {
        document.querySelector('.navbar-black').classList.add("is-sticky");
    } else {
        document.querySelector('.navbar-black').classList.remove("is-sticky");
    }

    // Go To Top JS
    var scrolled = window.scrollY;
    if (scrolled > 300) {
        document.querySelector('.go-top').classList.add('active');
    } else {
        document.querySelector('.go-top').classList.remove('active');
    }
});

// Click Event JS
document.querySelector('.go-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Preloader
// window.addEventListener('load', function () {
//     document.querySelector('.preloader').classList.add('preloader-deactivate');
// });

// Others Option For Responsive JS
// document.querySelector('.others-option-for-responsive .dot-menu').addEventListener('click', function () {
//     document.querySelector('.others-option-for-responsive .container .container').classList.toggle('active');
// });
