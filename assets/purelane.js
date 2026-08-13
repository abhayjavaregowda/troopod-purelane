(function () {
  if (window.__purelaneSectionsLoaded) {
    if (window.__purelaneInit) window.__purelaneInit(document);
    return;
  }

  window.__purelaneSectionsLoaded = true;

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function reducedMotion() {
    return motionQuery.matches;
  }

  function markPurelaneHome() {
    var main = document.querySelector('main[data-template="index"]');
    var isPurelaneHome = Boolean(main && main.querySelector('.purelane-section'));
    document.documentElement.classList.toggle('purelane-home', isPurelaneHome);
  }

  function initReveal(root) {
    var items = root.querySelectorAll('.purelane-rv');
    if (!items.length) return;

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function setHeroSlide(hero, index) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.purelane-hero__slide'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('.purelane-hero__dot'));
    if (!slides.length) return;

    var nextIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === nextIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    dots.forEach(function (dot, dotIndex) {
      var isActive = dotIndex === nextIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    hero.dataset.purelaneSlide = String(nextIndex);
  }

  function initHero(root) {
    var heroes = root.querySelectorAll('[data-purelane-hero]');
    heroes.forEach(function (hero) {
      if (hero.dataset.purelaneInitialized === 'true') return;
      hero.dataset.purelaneInitialized = 'true';

      var dots = Array.prototype.slice.call(hero.querySelectorAll('.purelane-hero__dot'));
      var timer = null;

      function currentIndex() {
        return Number(hero.dataset.purelaneSlide || 0);
      }

      function stop() {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
      }

      function play() {
        if (timer || reducedMotion() || dots.length < 2) return;
        timer = window.setInterval(function () {
          setHeroSlide(hero, currentIndex() + 1);
        }, 3800);
      }

      dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
          stop();
          setHeroSlide(hero, index);
          play();
        });
      });

      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', play);
      hero.addEventListener('focusin', stop);
      hero.addEventListener('focusout', play);

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                play();
              } else {
                stop();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(hero);
      } else {
        play();
      }

      setHeroSlide(hero, 0);
    });
  }

  function initScrollButtons(root) {
    root.querySelectorAll('[data-purelane-scroll]').forEach(function (button) {
      if (button.dataset.purelaneInitialized === 'true') return;
      button.dataset.purelaneInitialized = 'true';

      button.addEventListener('click', function () {
        var targetSelector = button.getAttribute('data-purelane-scroll');
        var direction = button.getAttribute('data-purelane-direction') === 'prev' ? -1 : 1;
        var scroller = targetSelector ? root.querySelector(targetSelector) || document.querySelector(targetSelector) : null;
        if (!scroller) return;

        var amount = Math.max(240, Math.round(scroller.clientWidth * 0.86));
        scroller.scrollBy({ left: amount * direction, behavior: reducedMotion() ? 'auto' : 'smooth' });
      });
    });
  }

  function initPurelane(root) {
    var scope = root || document;
    markPurelaneHome();
    initReveal(scope);
    initHero(scope);
    initScrollButtons(scope);
  }

  window.__purelaneInit = initPurelane;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPurelane(document);
    });
  } else {
    initPurelane(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initPurelane(event.target);
  });

  document.addEventListener('shopify:section:select', function (event) {
    initPurelane(event.target);
  });
})();
