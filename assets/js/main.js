document.addEventListener('DOMContentLoaded', function () {
  // Sticky header shadow on scroll
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // Hero photo slideshow
  var slideshow = document.getElementById('hero-slideshow');
  if (slideshow) {
    var slides = slideshow.querySelectorAll('.hero-photo');
    if (slides.length > 1) {
      var current = 0;
      setInterval(function () {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
      }, 3500);
    }
  }

  // Price calculator
  var calcBox = document.getElementById('price-calculator');
  var updateCalculator = null;
  if (calcBox) {
    var calcDataEl = document.getElementById('price-calculator-data');
    var pricing = JSON.parse(calcDataEl.textContent);
    var sizeSelect = document.getElementById('calc-size');
    var hoursInput = document.getElementById('calc-hours');
    var resultValue = document.getElementById('calc-result-value');
    var noteEl = document.getElementById('calc-note');

    var getActiveScheme = function () {
      var activeTab = document.querySelector('.pricing-tab.is-active');
      return activeTab ? activeTab.getAttribute('data-target') : 'mall';
    };

    updateCalculator = function () {
      var scheme = getActiveScheme();
      var sizeId = sizeSelect.value;
      var hours = parseInt(hoursInput.value, 10);
      noteEl.textContent = '';

      if (!hours || hours < 1) {
        resultValue.textContent = '— AZN';
        return;
      }

      if (scheme === 'mall') {
        var mallPlan = pricing.mall.plans.filter(function (p) { return p.id === sizeId; })[0];
        var tierIndex = hours <= 4 ? 0 : hours <= 8 ? 1 : hours <= 12 ? 2 : -1;
        if (tierIndex === -1 || !mallPlan) {
          resultValue.textContent = '— AZN';
          noteEl.textContent = noteEl.getAttribute('data-over-limit');
        } else {
          resultValue.textContent = mallPlan.prices[tierIndex] + ' AZN';
        }
      } else {
        var icPlan = pricing.icherisheher.plans.filter(function (p) { return p.id === sizeId; })[0];
        if (!icPlan) { resultValue.textContent = '— AZN'; return; }
        var extraHours = Math.max(0, hours - icPlan.base_hours);
        var blocks = Math.ceil(extraHours / pricing.icherisheher.extra_block_hours);
        var price = icPlan.base_price + (blocks * pricing.icherisheher.extra_block_price);
        resultValue.textContent = price + ' AZN';
      }
    };

    sizeSelect.addEventListener('change', updateCalculator);
    hoursInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // Pricing tabs
  var pricingTabs = document.querySelectorAll('.pricing-tab');
  if (pricingTabs.length) {
    pricingTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');

        pricingTabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab);
        });

        document.querySelectorAll('.pricing-panel').forEach(function (panel) {
          panel.classList.toggle('is-active', panel.getAttribute('data-panel') === target);
        });

        if (updateCalculator) { updateCalculator(); }
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.accordion-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
});
