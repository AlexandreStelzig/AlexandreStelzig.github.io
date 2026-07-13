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
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function next() {
    show((currentIndex + 1) % images.length);
  }

  function prev() {
    show((currentIndex - 1 + images.length) % images.length);
  }

  images.forEach(function (img, i) {
    img.addEventListener('click', function () { show(i); });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', hide);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
  lightbox.querySelector('.lightbox-next').addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) hide();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  var touchStartX = 0;
  var touchStartY = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    if (!lightbox.classList.contains('active')) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) next();
    else prev();
  }, { passive: true });
});
