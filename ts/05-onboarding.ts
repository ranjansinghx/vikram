(function(){
  var ONB_KEY = 'vikram_onboarding_seen';
  var steps = [
    { icon:'📅', grad:'linear-gradient(135deg,rgba(99,102,241,.20),rgba(139,92,246,.10))',
      title:'Welcome to Vikram', desc:'Your beautiful Nepali calendar — Bikram Sambat dates, festivals, tithi and Panchang, all in one place.' },
    { icon:'🏠', grad:'linear-gradient(135deg,rgba(59,130,246,.20),rgba(14,165,233,.10))',
      title:'Home is mission control', desc:'See today at a glance, add tasks and events, and scroll the calendar to explore any month.' },
    { icon:'🌸', grad:'linear-gradient(135deg,rgba(236,72,153,.20),rgba(219,39,119,.10))',
      title:'My Cycle', desc:'Track periods, TTC or pregnancy in the My Cycle tab — switch modes anytime and get predictions tailored to you.' },
    { icon:'🔥', grad:'linear-gradient(135deg,rgba(249,115,22,.22),rgba(220,38,38,.10))',
      title:'Tracker keeps you on track', desc:'Build good habits, quit bad ones, or count down to big days — all in your Streak Hub.' },
    { icon:'👤', grad:'linear-gradient(135deg,rgba(236,72,153,.20),rgba(244,63,94,.10))',
      title:'Profile has more than you think', desc:'A surprising amount lives quietly in your Profile tab:',
      chips:[ {icon:'🌤️',label:'Weather'}, {icon:'💱',label:'Gold & Forex'}, {icon:'🕉️',label:'Muhurat'}, {icon:'🔮',label:'Rashifal'}, {icon:'💰',label:'Kharcha'}, {icon:'👨‍👩‍👧',label:'Family Share'} ] },
    { icon:'✨', grad:'linear-gradient(135deg,rgba(251,146,60,.22),rgba(217,119,6,.10))',
      title:'Make it yours', desc:'Switch themes, enable notifications and set your birthday anytime in Settings & Profile. Ready to explore?' }
  ];
  var idx = 0;
  var touchStartX = null, touchStartY = null, touchLocked = false;

  function render(dir?){
    var s = steps[idx];
    var contentEl = document.getElementById('onbContent');
    document.getElementById('onbIcon').textContent = s.icon;
    document.getElementById('onbIcon').style.background = s.grad;
    document.getElementById('onbTitle').textContent = s.title;
    document.getElementById('onbDesc').textContent = s.desc;
    var chipsEl = document.getElementById('onbChips');
    if(s.chips && s.chips.length){
      chipsEl.style.display = 'flex';
      chipsEl.innerHTML = s.chips.map(function(c){
        return '<div class="onb-chip"><span class="onb-chip-icon">'+c.icon+'</span>'+c.label+'</div>';
      }).join('');
    } else {
      chipsEl.style.display = 'none';
      chipsEl.innerHTML = '';
    }
    var dotsEl = document.getElementById('onbDots');
    dotsEl.innerHTML = steps.map(function(_,i){
      return '<button type="button" class="onb-dot'+(i===idx?' on':'')+'" aria-label="Go to step '+(i+1)+'" onclick="onbGoTo('+i+')"></button>';
    }).join('');
    document.getElementById('onbProgressFill').style.width = (((idx+1)/steps.length)*100) + '%';
    document.getElementById('onbNextBtn').textContent = (idx === steps.length-1) ? 'Let\'s go 🎉' : 'Next';
    document.getElementById('onbBackBtn').style.visibility = (idx === 0) ? 'hidden' : 'visible';
    if(dir){
      contentEl.classList.remove('slide-next','slide-back');
      void contentEl.offsetWidth; // restart animation
      contentEl.classList.add(dir === 'next' ? 'slide-next' : 'slide-back');
    }
    if(typeof window.haptic === 'function') window.haptic('light');
  }
  function markSeen(){ try{ localStorage.setItem(ONB_KEY, '1'); }catch(e){} }
  window.onbNext = function(){
    if(idx < steps.length-1){ idx++; render('next'); }
    else { window.onbClose(); }
  };
  window.onbBack = function(){
    if(idx > 0){ idx--; render('back'); }
  };
  window.onbGoTo = function(i){
    if(i === idx) return;
    var dir = i > idx ? 'next' : 'back';
    idx = i;
    render(dir);
  };
  window.onbSkip = function(){ window.onbClose(); };
  window.onbClose = function(){
    markSeen();
    var ov = document.getElementById('onbOverlay');
    if(ov){ ov.classList.remove('show','anim-in'); }
  };
  window.onbStart = function(){
    idx = 0;
    render();
    var ov = document.getElementById('onbOverlay');
    if(ov){ ov.classList.add('show'); requestAnimationFrame(function(){ ov.classList.add('anim-in'); }); }
  };
  window.vikramMaybeStartOnboarding = function(){
    var seen = false;
    try{ seen = localStorage.getItem(ONB_KEY) === '1'; }catch(e){}
    if(!seen) window.onbStart();
  };

  // Swipe navigation
  var cardEl = document.getElementById('onbCard');
  if(cardEl){
    cardEl.addEventListener('touchstart', function(e){
      var ov = document.getElementById('onbOverlay');
      if(!ov || !ov.classList.contains('show')) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchLocked = false;
    }, {passive:true});
    cardEl.addEventListener('touchend', function(e){
      if(touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      touchStartX = null;
      if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)){
        if(dx < 0) window.onbNext(); else window.onbBack();
      }
    }, {passive:true});
  }
  // Keyboard navigation
  document.addEventListener('keydown', function(e){
    var ov = document.getElementById('onbOverlay');
    if(!ov || !ov.classList.contains('show')) return;
    if(e.key === 'ArrowRight') window.onbNext();
    else if(e.key === 'ArrowLeft') window.onbBack();
    else if(e.key === 'Escape') window.onbSkip();
  });
})();
