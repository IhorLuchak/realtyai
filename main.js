
function replayAIDemo(){
  const stage=document.getElementById('liveDemo');
  if(!stage) return;
  const clone=stage.cloneNode(true);
  stage.parentNode.replaceChild(clone,stage);
  const fill=document.getElementById('progressFill');
  const status=document.getElementById('stageStatus');
  setTimeout(()=>{ if(fill) fill.style.width='46%'; },2500);
  setTimeout(()=>{ if(fill) fill.style.width='72%'; if(status) status.textContent='AI / ЗАПИТ ЗРОЗУМІЛО'; },5000);
  setTimeout(()=>{ if(fill) fill.style.width='100%'; if(status) status.textContent='ГОТОВО / ГАРЯЧИЙ ЛІД'; },7100);
}
window.addEventListener('load',()=>{
  const fill=document.getElementById('progressFill');
  const status=document.getElementById('stageStatus');
  setTimeout(()=>{if(fill)fill.style.width='46%'},2500);
  setTimeout(()=>{if(fill)fill.style.width='72%';if(status)status.textContent='AI / ЗАПИТ ЗРОЗУМІЛО'},5000);
  setTimeout(()=>{if(fill)fill.style.width='100%';if(status)status.textContent='ГОТОВО / ГАРЯЧИЙ ЛІД'},7100);
});


/* ---- Extracted script block ---- */

document.addEventListener("DOMContentLoaded",()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Visible-first reveal: observer only adds animation; it never controls visibility. */
  const els=[...document.querySelectorAll("[data-motion]")];
  if(!reduce && "IntersectionObserver" in window){
    try{
      const io=new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },{threshold:.05,rootMargin:"120px 0px 120px 0px"});
      els.forEach(e=>io.observe(e));
    }catch(e){
      els.forEach(e=>e.classList.add("is-visible"));
    }
  }else{
    els.forEach(e=>e.classList.add("is-visible"));
  }

  /* Demo tabs */
  const tabs=[...document.querySelectorAll("[data-demo-tab]")];
  const panels=[...document.querySelectorAll("[data-demo-panel]")];
  function activate(key){
    const tab=tabs.find(x=>x.dataset.demoTab===key);
    if(!tab)return;
    tabs.forEach(x=>{
      const active=x===tab;
      x.classList.toggle("is-active",active);
      x.setAttribute("aria-selected",active?"true":"false");
    });
    panels.forEach(p=>{
      const active=p.dataset.demoPanel===key;
      p.hidden=!active;
      p.classList.toggle("is-active",active);
      if(active){
        p.classList.remove("is-transitioning");
        if(!reduce)requestAnimationFrame(()=>p.classList.add("is-transitioning"));
      }
    });
  }
  tabs.forEach(t=>{
    t.addEventListener("click",()=>activate(t.dataset.demoTab));
    t.addEventListener("keydown",e=>{
      if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;
      e.preventDefault();
      const index=tabs.indexOf(t);
      const next=tabs[(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length];
      activate(next.dataset.demoTab);
      next.focus();
    });
  });
  activate(tabs.find(t=>t.classList.contains("is-active"))?.dataset.demoTab||"search");

  /* Realtor search: request -> scan -> match */
  const search=document.querySelector("[data-search-run]");
  const searchResult=document.querySelector(".search-demo-right .clean-result");
  if(search&&searchResult){
    search.addEventListener("click",()=>{
      const box=search.closest(".query-box");
      const status=box?.querySelector(".query-status span");
      const count=box?.querySelector(".query-status b");
      box?.classList.remove("is-found");
      box?.classList.add("is-running");
      searchResult.classList.remove("is-found-reveal");
      searchResult.classList.add("is-waiting");
      if(status)status.textContent="AI шукає в базі";
      if(count)count.textContent="…";
      search.disabled=true;
      setTimeout(()=>{
        box?.classList.remove("is-running");
        box?.classList.add("is-found");
        searchResult.classList.remove("is-waiting");
        searchResult.classList.add("is-found-reveal");
        if(status)status.textContent="Збіг знайдено";
        if(count)count.textContent="20 знайдено";
        search.innerHTML="Об'єкт знайдено <b class=\"btn-mark\" aria-hidden=\"true\"></b>";
        search.disabled=false;
      },reduce?20:900);
    });
  }

  /* Client assistant: show the actual property result after the conversation. */
  const chat=document.querySelector(".chat-demo");
  const actions=[...document.querySelectorAll("[data-chat-action]")];
  const result=document.querySelector("#client-result");
  if(result)result.classList.add("is-hidden");
  actions.forEach(btn=>btn.addEventListener("click",()=>{
    actions.forEach(x=>x.classList.remove("is-picked"));
    btn.classList.add("is-picked");
    if(btn.dataset.chatAction!=="show"||!result)return;
    chat?.classList.add("is-expanded");
    btn.disabled=true;
    setTimeout(()=>{
      result.classList.remove("is-hidden","result-reveal");
      void result.offsetWidth;
      result.classList.add("result-reveal");
      btn.disabled=false;
      if(!reduce)setTimeout(()=>result.scrollIntoView({behavior:"smooth",block:"start"}),180);
    },reduce?20:500);
  }));

  /* Hero CTA -> correct demo mode */
  document.querySelectorAll("[data-jump-demo]").forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      activate(link.dataset.jumpDemo||"assistant");
      const demo=document.querySelector("#try-demo");
      if(demo){
        demo.classList.remove("demo-focus");
        void demo.offsetWidth;
        demo.classList.add("demo-focus");
        setTimeout(()=>demo.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"}),30);
      }
    });
  });

  /* Desktop-only subtle parallax. */
  if(!reduce&&window.matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".signal-field").forEach(field=>{
      field.addEventListener("pointermove",e=>{
        const r=field.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        const core=field.querySelector(".signal-core");
        if(core)core.style.transform=`translate(${x*7}px,${y*5}px)`;
      });
      field.addEventListener("pointerleave",()=>{
        const core=field.querySelector(".signal-core");
        if(core)core.style.transform="";
      });
    });
  }
});


/* ---- Extracted script block ---- */

(function () {
  'use strict';

  function initReliableDemo() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-demo-tab]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-demo-panel]'));
    if (!tabs.length || !panels.length) return;

    function activateDemo(key) {
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

    tabs.forEach(function (tab, index) {
      // Remove only handlers installed by this fix, never the original page handlers.
      if (tab.dataset.reliableBound === '1') return;
      tab.dataset.reliableBound = '1';
      tab.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        activateDemo(tab.getAttribute('data-demo-tab'));
      }, true);
      tab.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        var nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        var next = tabs[nextIndex];
        activateDemo(next.getAttribute('data-demo-tab'));
        next.focus();
      });
    });

    var initial = tabs.find(function (tab) { return tab.classList.contains('is-active'); });
    activateDemo(initial ? initial.getAttribute('data-demo-tab') : 'search');

    // Make Telegram CTAs reliable in local HTML previews and on mobile browsers.
    var telegramLinks = document.querySelectorAll('[data-telegram-cta], a[href*="t.me/"]');
    telegramLinks.forEach(function (link) {
      if (link.dataset.telegramFixed === '1') return;
      var href = link.getAttribute('href');
      if (!href || href.indexOf('https://t.me/') !== 0) return;
      link.dataset.telegramFixed = '1';
      link.setAttribute('target', '_self');
      link.setAttribute('rel', 'noopener');
      link.addEventListener('click', function (event) {
        // Preserve normal browser navigation, but explicitly assign the URL as a
        // fallback for embedded/local HTML viewers that ignore anchor navigation.
        event.preventDefault();
        event.stopPropagation();
        window.location.href = href;
      }, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReliableDemo, { once: true });
  } else {
    initReliableDemo();
  }
})();


/* ---- Extracted script block ---- */

(function(){
  function initReferenceSwitcher(){
    var tabs=[].slice.call(document.querySelectorAll('[data-demo-tab]'));
    var panels=[].slice.call(document.querySelectorAll('[data-demo-panel]'));
    if(!tabs.length || !panels.length) return;
    function select(key){
      tabs.forEach(function(tab){
        var active=tab.getAttribute('data-demo-tab')===key;
        tab.classList.toggle('is-active',active);
        tab.setAttribute('aria-selected',active?'true':'false');
      });
      panels.forEach(function(panel){
        var active=panel.getAttribute('data-demo-panel')===key;
        panel.hidden=!active;
        panel.classList.toggle('is-active',active);
      });
    }
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        select(tab.getAttribute('data-demo-tab'));
      },true);
    });
    var initial=tabs.find(function(tab){return tab.classList.contains('is-active');});
    select(initial ? initial.getAttribute('data-demo-tab') : 'search');
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initReferenceSwitcher);
  }else{
    initReferenceSwitcher();
  }
})();

/* FINAL MOBILE FIX: one delegated handler for the two demo tabs. */
(function () {
  function initFinalDemoSwitch() {
    var root = document;
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-demo-tab]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-demo-panel]'));
    if (!tabs.length || !panels.length) return;
    function select(key) {
      tabs.forEach(function (tab) {
        var active = tab.getAttribute('data-demo-tab') === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        var active = panel.getAttribute('data-demo-panel') === key;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    }
    root.addEventListener('click', function (event) {
      var tab = event.target.closest && event.target.closest('[data-demo-tab]');
      if (!tab) return;
      event.preventDefault();
      event.stopPropagation();
      select(tab.getAttribute('data-demo-tab'));
    }, true);
    var initial = tabs.find(function (tab) { return tab.classList.contains('is-active'); });
    select(initial ? initial.getAttribute('data-demo-tab') : 'search');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinalDemoSwitch, { once: true });
  } else {
    initFinalDemoSwitch();
  }
})();
