// ── TASKS (list + editor, opened from "Tasks" pill next to "Upcoming") ──
(function(){
  const STORAGE_KEY = 'vikram_tasks_v1';
  let saveTimer = null;
  let currentId = null;

  function getListView(){ return document.getElementById('tasksListView'); }
  function getEditorView(){ return document.getElementById('tasksEditorView'); }

  function uid(){
    return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
  }

  function loadAll(){
    let list = [];
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) list = JSON.parse(raw) || [];
    }catch(e){ list = []; }
    return list;
  }

  function saveAll(list){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }catch(e){}
  }

  function findTask(list, id){
    for(let i=0;i<list.length;i++){ if(list[i].id === id) return list[i]; }
    return null;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  // Format a "YYYY-MM-DD" due date relative to today
  function formatDueLabel(due){
    const parts = due.split('-').map(Number);
    const d = new Date(parts[0], parts[1]-1, parts[2]);
    const today = new Date(); today.setHours(0,0,0,0);
    const diffDays = Math.round((+d - +today)/86400000);
    const dateStr = (typeof ADMEN!=='undefined' ? ADMEN[d.getMonth()].slice(0,3) : d.toLocaleDateString([], {month:'short'})) + ' ' + d.getDate();
    if(diffDays < 0) return {text:'Overdue · '+dateStr, overdue:true};
    if(diffDays === 0) return {text:'Due today', overdue:false};
    if(diffDays === 1) return {text:'Due tomorrow', overdue:false};
    return {text:'Due '+dateStr, overdue:false};
  }

  // ── BADGE + SUBTITLE ──
  function updateBadgeAndSub(list?){
    list = list || loadAll();
    const incomplete = list.filter(function(t){ return !t.done; }).length;
    const badge = document.getElementById('upTasksBadge');
    if(badge){
      if(incomplete > 0){
        badge.style.display = 'inline-flex';
        badge.textContent = incomplete > 99 ? '99+' : String(incomplete);
      } else {
        badge.style.display = 'none';
      }
    }
    const sub = document.getElementById('tasksCountSub');
    if(sub){
      if(list.length === 0) sub.textContent = 'No tasks yet';
      else sub.textContent = incomplete === 0 ? 'All done! 🎉' : (incomplete + ' task' + (incomplete===1?'':'s') + ' left');
    }
  }

  // ── RENDER LIST ──
  function renderList(){
    const list = loadAll();
    const container = document.getElementById('tasksListItems');
    const empty = document.getElementById('tasksEmpty');
    if(!container) return;

    // Incomplete tasks first (soonest due date first), completed tasks last
    list.sort(function(a,b){
      if(!!a.done !== !!b.done) return a.done ? 1 : -1;
      if(!a.done){
        if(a.due && b.due) return a.due < b.due ? -1 : (a.due > b.due ? 1 : (b.updated||0)-(a.updated||0));
        if(a.due) return -1;
        if(b.due) return 1;
      }
      return (b.updated||0)-(a.updated||0);
    });

    if(list.length === 0){
      if(empty) empty.classList.add('show');
      container.innerHTML = '';
    } else {
      if(empty) empty.classList.remove('show');
      container.innerHTML = list.map(function(task){
        const title = (task.title && task.title.trim()) || 'Untitled task';
        let meta = '';
        let overdueClass = '';
        if(task.due){
          const lbl = formatDueLabel(task.due);
          meta = lbl.text;
          if(lbl.overdue && !task.done) overdueClass = ' overdue';
        } else if(task.notes && task.notes.trim()){
          meta = task.notes.trim().replace(/\s+/g,' ').slice(0,60);
        } else {
          meta = 'No due date';
        }
        if(task.repeat && task.repeat !== 'none') meta = '🔁 ' + meta;
        return '<div class="task-swipe-wrap" data-id="'+task.id+'">'+
          '<div class="task-swipe-bg"></div>'+
          '<div class="task-list-item'+(task.done?' done-task':'')+'" onclick="taskOpen(\''+task.id+'\')">'+
          '<div class="task-check" onclick="event.stopPropagation();taskToggleDone(\''+task.id+'\')"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>'+
          '<div class="task-list-item-body">'+
            '<div class="task-list-item-title">'+escapeHtml(title)+'</div>'+
            '<div class="task-list-item-meta'+overdueClass+'">'+escapeHtml(meta)+'</div>'+
          '</div>'+
          '<div class="task-list-item-chevron"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>'+
        '</div></div>';
      }).join('');
    }

    updateBadgeAndSub(list);
    if(typeof window._wireTaskSwipe === 'function') window._wireTaskSwipe();
  }

  // ── VIEW SWITCHING ──
  function showList(){
    currentId = null;
    const lv = getListView(), ev = getEditorView();
    if(lv) lv.style.display = 'flex';
    if(ev) ev.style.display = 'none';
    const sh = document.getElementById('ntSegmentHeader');
    if(sh) sh.style.display = '';
    renderList();
  }

  function showEditor(){
    const lv = getListView(), ev = getEditorView();
    if(lv) lv.style.display = 'none';
    if(ev) ev.style.display = 'flex';
    // Hide shared segment header inside task editor
    const sh = document.getElementById('ntSegmentHeader');
    if(sh) sh.style.display = 'none';
  }

  function setDoneUI(done){
    const toggle = document.getElementById('taskDoneToggle');
    if(toggle) toggle.classList.toggle('on', !!done);
  }

  // Entry point when the Tasks sheet opens
  window.tasksShowList = function(){
    showList();
  };

  // ── CREATE / OPEN / DELETE ──
  window.taskCreate = function(){
    haptic('light');
    const list = loadAll();
    const task = { id: uid(), title: '', notes: '', due: '', done: false, repeat: 'none', updated: Date.now() };
    list.unshift(task);
    saveAll(list);
    taskOpen(task.id);
  };

  window.taskOpen = function(id){
    const list = loadAll();
    const task = findTask(list, id);
    if(!task) return;
    currentId = id;
    const ti = document.getElementById('taskTitleInput');
    const di = document.getElementById('taskDueInput');
    const ni = document.getElementById('taskNotesInput');
    if(ti) ti.value = task.title || '';
    if(di) di.value = task.due || '';
    if(ni) ni.value = task.notes || '';
    setDoneUI(!!task.done);
    document.querySelectorAll('#taskRepeatChips .sv-chip').forEach(function(chip){
      chip.classList.toggle('on', chip.dataset.repeat === (task.repeat||'none'));
    });
    showEditor();
    setTimeout(function(){ if(!task.title && ti) ti.focus(); }, 320);
  };

  window.taskBackToList = function(){
    clearTimeout(saveTimer);
    taskSave();
    showList();
  };

  window.taskDeleteCurrent = function(){
    if(!currentId){ showList(); return; }
    document.getElementById('tasksConfirmOverlay').classList.add('open');
  };

  window.taskConfirmYes = function(){
    haptic('medium');
    document.getElementById('tasksConfirmOverlay').classList.remove('open');
    if(!currentId) return;
    let list = loadAll();
    const removed = findTask(list, currentId);
    const removedIdx = list.findIndex(function(t){ return t.id === currentId; });
    list = list.filter(function(t){ return t.id !== currentId; });
    saveAll(list);
    updateBadgeAndSub(list);
    showList();
    if(removed && typeof showUndoSnackbar === 'function'){
      showUndoSnackbar('Task deleted', function(){
        let l2 = loadAll();
        l2.splice(Math.min(removedIdx, l2.length), 0, removed);
        saveAll(l2);
        updateBadgeAndSub(l2);
        renderList();
      });
    }
  };

  window.taskConfirmClose = function(e){
    if(e && e.target !== document.getElementById('tasksConfirmOverlay')) return;
    document.getElementById('tasksConfirmOverlay').classList.remove('open');
  };

  // Swipe-to-delete (no confirm sheet — the swipe itself is the deliberate
  // action — but still undoable via the snackbar)
  window.taskDeleteSwipe = function(id){
    let list = loadAll();
    const removed = findTask(list, id);
    if(!removed) return;
    const removedIdx = list.findIndex(function(t){ return t.id === id; });
    list = list.filter(function(t){ return t.id !== id; });
    saveAll(list);
    updateBadgeAndSub(list);
    renderList();
    haptic('medium');
    if(typeof showUndoSnackbar === 'function'){
      showUndoSnackbar('Task deleted', function(){
        let l2 = loadAll();
        l2.splice(Math.min(removedIdx, l2.length), 0, removed);
        saveAll(l2);
        updateBadgeAndSub(l2);
        renderList();
      });
    }
  };

  // ── SAVE CURRENT TASK ──
  function taskSave(){
    if(!currentId) return;
    let list = loadAll();
    const task = findTask(list, currentId);
    if(!task) return;
    const ti = document.getElementById('taskTitleInput');
    const di = document.getElementById('taskDueInput');
    const ni = document.getElementById('taskNotesInput');
    task.title = ti ? ti.value : '';
    task.due = di ? di.value : '';
    task.notes = ni ? ni.value : '';
    const repChip = document.querySelector('#taskRepeatChips .sv-chip.on');
    task.repeat = repChip ? repChip.dataset.repeat : 'none';
    task.updated = Date.now();
    saveAll(list);
    updateBadgeAndSub(list);
  }

  // Immediate save (used when navigating away / closing the sheet)
  window.tasksFlushSave = function(){
    clearTimeout(saveTimer);
    taskSave();
  };

  window.taskSetRepeat = function(repeat, btn){
    haptic('light');
    document.querySelectorAll('#taskRepeatChips .sv-chip').forEach(function(c){ c.classList.remove('on'); });
    if(btn) btn.classList.add('on');
  };

  // Advance a "YYYY-MM-DD" due date by the given repeat interval
  function taskNextDue(due, repeat){
    if(!due || repeat==='none' || !repeat) return due;
    const parts = due.split('-').map(Number);
    const d = new Date(parts[0], parts[1]-1, parts[2]);
    if(repeat === 'daily') d.setDate(d.getDate()+1);
    else if(repeat === 'weekly') d.setDate(d.getDate()+7);
    else if(repeat === 'monthly') d.setMonth(d.getMonth()+1);
    else return due;
    const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), dd=String(d.getDate()).padStart(2,'0');
    return y+'-'+m+'-'+dd;
  }

  // Toggle completion from the list (without opening the editor)
  window.taskToggleDone = function(id){
    let list = loadAll();
    const task = findTask(list, id);
    if(!task) return;
    const completing = !task.done;
    if(completing && task.repeat && task.repeat !== 'none' && task.due){
      // Recurring task: advance to the next occurrence instead of leaving it done
      task.due = taskNextDue(task.due, task.repeat);
      task.done = false;
      haptic('success');
      if(typeof vikramToast === 'function'){
        const lbl = formatDueLabel(task.due).text;
        vikramToast('🔁 Repeats — next: ' + lbl);
      }
    } else {
      task.done = completing;
      haptic(task.done ? 'success' : 'light');
    }
    task.updated = Date.now();
    saveAll(list);
    renderList();
    if(currentId === id) setDoneUI(task.done);
  };

  // Toggle completion from within the editor
  window.taskToggleDoneInEditor = function(){
    if(!currentId) return;
    let list = loadAll();
    const task = findTask(list, currentId);
    if(!task) return;
    const completing = !task.done;
    if(completing && task.repeat && task.repeat !== 'none' && task.due){
      task.due = taskNextDue(task.due, task.repeat);
      task.done = false;
      haptic('success');
      const di = document.getElementById('taskDueInput');
      if(di) di.value = task.due;
      if(typeof vikramToast === 'function'){
        const lbl = formatDueLabel(task.due).text;
        vikramToast('🔁 Repeats — next: ' + lbl);
      }
    } else {
      task.done = completing;
      haptic(task.done ? 'success' : 'light');
    }
    task.updated = Date.now();
    saveAll(list);
    setDoneUI(task.done);
  };

  // Wire up editor field events after DOM ready
  function initTasks(){
    const ti = document.getElementById('taskTitleInput');
    const di = document.getElementById('taskDueInput');
    const ni = document.getElementById('taskNotesInput');

    [ti, ni].forEach(function(el){
      if(!el) return;
      el.addEventListener('input', function(){
        clearTimeout(saveTimer);
        saveTimer = setTimeout(taskSave, 400);
      });
    });
    if(di){
      di.addEventListener('change', function(){
        clearTimeout(saveTimer);
        taskSave();
      });
    }
    if(ti){
      ti.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){ e.preventDefault(); if(ni) ni.focus(); }
      });
    }

    updateBadgeAndSub();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initTasks);
  } else {
    initTasks();
  }
})();

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE 11: SWIPE GESTURES (task list — swipe right to complete, left to delete)
// ══════════════════════════════════════════════════════════════════════════════
(function(){
  let sw = null; // active swipe state
  const THRESH = 90, MAX = 130;

  function onDown(e){
    const fg = e.target.closest('.task-list-item');
    if(!fg || e.target.closest('.task-check')) return;
    const wrap = fg.closest('.task-swipe-wrap');
    if(!wrap) return;
    sw = { id: wrap.dataset.id, fg, wrap, startX: e.clientX, startY: e.clientY, dx: 0, pointerId: e.pointerId, locked:null };
    fg.style.transition = 'none';
  }
  function onMove(e){
    if(!sw || e.pointerId !== sw.pointerId) return;
    const dx = e.clientX - sw.startX;
    const dy = e.clientY - sw.startY;
    if(sw.locked === null){
      if(Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      sw.locked = Math.abs(dx) > Math.abs(dy);
      if(sw.locked){ try{ sw.fg.setPointerCapture(sw.pointerId); }catch(err){} }
    }
    if(!sw.locked) return;
    e.preventDefault();
    sw.dx = dx;
    const clamped = Math.max(-MAX, Math.min(MAX, dx));
    sw.fg.style.transform = 'translateX('+clamped+'px)';
    const bg = sw.wrap.querySelector('.task-swipe-bg');
    if(bg){
      if(clamped < -10) bg.innerHTML = '<span class="tsw-label tsw-right">🗑️ Delete</span>';
      else if(clamped > 10) bg.innerHTML = '<span class="tsw-label tsw-left">✅ Done</span>';
      else bg.innerHTML = '';
    }
  }
  function onUp(e){
    if(!sw || e.pointerId !== sw.pointerId) return;
    const { fg, dx, id, wrap } = sw;
    const bg = wrap.querySelector('.task-swipe-bg');
    fg.style.transition = 'transform .2s ease';
    if(sw.locked && dx <= -THRESH){
      fg.style.transform = 'translateX(-100%)';
      setTimeout(function(){ if(typeof window.taskDeleteSwipe==='function') window.taskDeleteSwipe(id); }, 160);
    } else if(sw.locked && dx >= THRESH){
      fg.style.transform = 'translateX(0)';
      if(bg) bg.innerHTML = '';
      if(typeof window.taskToggleDone==='function') window.taskToggleDone(id);
    } else {
      fg.style.transform = 'translateX(0)';
      if(bg) bg.innerHTML = '';
    }
    sw = null;
  }
  window._wireTaskSwipe = function(){
    const c = document.getElementById('tasksListItems');
    if(!c || c._swipeWired) return;
    c._swipeWired = true;
    c.addEventListener('pointerdown', onDown);
    c.addEventListener('pointermove', onMove);
    c.addEventListener('pointerup', onUp);
    c.addEventListener('pointercancel', onUp);
  };
})();
/* ── Notes segment controller (Echo removed — now opens its own sheet) ── */
window._ntActiveSeg = 'notes';

window.ntSwitchSeg = function(seg, skipLoad){
  window._ntActiveSeg = seg || 'notes';
  if(typeof window.notesLoad === 'function') window.notesLoad();
};

window.ntAddCurrent = function(){
  if(typeof window.notesCreate === 'function') window.notesCreate();
};





