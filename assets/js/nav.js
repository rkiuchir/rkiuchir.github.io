document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.menu');
  var nav = document.querySelector('.gnav');
  if (!button || !nav) return;

  var desktop = window.matchMedia('(min-width: 1024px)');
  var open = false;

  function setOpen(value, restoreFocus) {
    open = value && !desktop.matches;
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    button.querySelectorAll('.menu__line, .menu_triangle').forEach(function (part) {
      part.classList.toggle('active', open);
    });
    if (restoreFocus) button.focus();
  }

  button.addEventListener('click', function () { setOpen(!open); });
  nav.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (link && open) {
      setOpen(false);
      if (link.hash && link.pathname === window.location.pathname) {
        var target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    }
  });
  document.addEventListener('keydown', function (event) {
    if (!open) return;
    if (event.key === 'Escape') {
      setOpen(false, true);
      return;
    }
    if (event.key === 'Tab') {
      var items = [button].concat(Array.from(nav.querySelectorAll('a[href]')));
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  desktop.addEventListener('change', function () { setOpen(false); });

  function updateScrollStyle() {
    var scrolled = window.scrollY > 200;
    nav.querySelectorAll('.gnav__menu').forEach(function (menu) {
      menu.classList.toggle('change', scrolled);
    });
    nav.querySelectorAll('.gnav__menu__item, .gnav__menu__current').forEach(function (item) {
      item.classList.toggle('change2', scrolled);
    });
  }
  window.addEventListener('scroll', updateScrollStyle, { passive: true });
  updateScrollStyle();
});
