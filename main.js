(function () {
  'use strict';

  function init() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal animations never hide content if JavaScript is unavailable.
    var motionItems = document.querySelectorAll('[data-motion]');
    if (!reduceMotion && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '120px 0px' });
      Array.prototype.forEach.call(motionItems, function (item) { observer.observe(item); });
    } else {
      Array.prototype.forEach.call(motionItems, function (item) { item.classList.add('is-visible'); });
    }

    // One single, delegated tab handler. This avoids competing handlers.
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-demo-tab]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-demo-panel]'));

    function activateDemo(key) {
      var valid = tabs.some(function (tab) { return tab.getAttribute('data-demo-tab') === key; });
      if (!valid) return;
      tabs.forEach(function (tab) {
        var active = tab.getAttribute('data-demo-tab') === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach(function (panel) {
        var active = panel.getAttribute('data-demo-panel') === key;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    }

    if (tabs.length && panels.length) {
      document.addEventListener('click', function (event) {
        var tab = event.target.closest ? event.target.closest('[data-demo-tab]') : null;
        if (!tab) return;
        event.preventDefault();
        activateDemo(tab.getAttribute('data-demo-tab'));
      });

      document.addEventListener('keydown', function (event) {
        var tab = event.target.closest ? event.target.closest('[data-demo-tab]') : null;
        if (!tab || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
        event.preventDefault();
        var index = tabs.indexOf(tab);
        var nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        var next = tabs[nextIndex];
        activateDemo(next.getAttribute('data-demo-tab'));
        next.focus();
      });

      var initial = tabs.find(function (tab) { return tab.classList.contains('is-active'); });
      activateDemo(initial ? initial.getAttribute('data-demo-tab') : 'search');
    }

    // Search demo interaction.
    var searchButton = document.querySelector('[data-search-run]');
    var searchResult = document.querySelector('.search-demo-right .clean-result');
    if (searchButton && searchResult) {
      searchButton.addEventListener('click', function () {
        var box = searchButton.closest('.query-box');
        var status = box && box.querySelector('.query-status span');
        var count = box && box.querySelector('.query-status b');
        if (box) { box.classList.remove('is-found'); box.classList.add('is-running'); }
        searchResult.classList.remove('is-found-reveal');
        searchResult.classList.add('is-waiting');
        if (status) status.textContent = 'AI шукає в базі';
        if (count) count.textContent = '…';
        searchButton.disabled = true;
        window.setTimeout(function () {
          if (box) { box.classList.remove('is-running'); box.classList.add('is-found'); }
          searchResult.classList.remove('is-waiting');
          searchResult.classList.add('is-found-reveal');
          if (status) status.textContent = 'Збіг знайдено';
          if (count) count.textContent = '20 знайдено';
          searchButton.disabled = false;
        }, reduceMotion ? 20 : 900);
      });
    }

    // Assistant demo: the two answer buttons reveal the result card.
    var chat = document.querySelector('.chat-demo');
    var result = document.querySelector('#client-result');
    var chatActions = Array.prototype.slice.call(document.querySelectorAll('[data-chat-action]'));
    if (result) result.classList.add('is-hidden');
    chatActions.forEach(function (button) {
      button.addEventListener('click', function () {
        chatActions.forEach(function (item) { item.classList.remove('is-picked'); });
        button.classList.add('is-picked');
        if (!result) return;
        if (chat) chat.classList.add('is-expanded');
        chatActions.forEach(function (item) { item.disabled = true; });
        window.setTimeout(function () {
          result.classList.remove('is-hidden', 'result-reveal');
          void result.offsetWidth;
          result.classList.add('result-reveal');
          chatActions.forEach(function (item) { item.disabled = false; });
          if (!reduceMotion && result.scrollIntoView) {
            window.setTimeout(function () { result.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 180);
          }
        }, reduceMotion ? 20 : 500);
      });
    });

    // Hero links switch to the requested demo and scroll to it.
    document.querySelectorAll('[data-jump-demo]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        activateDemo(link.getAttribute('data-jump-demo') || 'assistant');
        var demo = document.querySelector('#try-demo');
        if (demo) {
          demo.classList.remove('demo-focus');
          void demo.offsetWidth;
          demo.classList.add('demo-focus');
          window.setTimeout(function () {
            demo.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
          }, 30);
        }
      });
    });

    // Keep Telegram links as ordinary links; no navigation interception.
    // This is intentionally left to the browser/GitHub Pages.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
