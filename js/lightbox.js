document.addEventListener('DOMContentLoaded', function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var images = Array.from(document.querySelectorAll('.gallery-grid img'));
  var currentIndex = 0;

  function show(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add('active');
  }

  function hide() {
    lightbox.classList.remove('active');
  }

  images.forEach(function (img, i) {
    img.addEventListener('click', function () { show(i); });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', hide);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
    show((currentIndex - 1 + images.length) % images.length);
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
    show((currentIndex + 1) % images.length);
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowRight') show((currentIndex + 1) % images.length);
    if (e.key === 'ArrowLeft') show((currentIndex - 1 + images.length) % images.length);
  });
});
