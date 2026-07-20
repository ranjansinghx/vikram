// ── NOTES (multi-note list + editor) ──
(function(){
  const STORAGE_KEY = 'vikram_notes_v2';
  const LEGACY_KEY  = 'vikram_notes_html';
  let saveTimer = null;
  let currentId = null;
  let _activeTagFilter = null;

  function getEditor(){ return document.getElementById('notesEditor'); }
  function getTitleInput(){ return document.getElementById('notesTitleInput'); }
  function getSaveDot(){ return document.getElementById('notesSaveDot'); }
  function getListView(){ return document.getElementById('notesListView'); }
  function getEditorView(){ return document.getElementById('notesEditorView'); }

  function uid(){
    return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
  }

  // Load all notes from storage (with legacy migration)
  function loadAll(){
    let list = [];
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) list = JSON.parse(raw) || [];
    }catch(e){ list = []; }

    // Migrate legacy single-note content if present and v2 store doesn't exist yet
    try{
      if(!localStorage.getItem(STORAGE_KEY)){
        const legacy = localStorage.getItem(LEGACY_KEY);
        if(legacy && legacy.trim() && legacy.trim() !== '<br>'){
          list = [{
            id: uid(),
            title: '',
            html: legacy,
            updated: Date.now()
          }];
          saveAll(list);
        }
        localStorage.removeItem(LEGACY_KEY);
      }
    }catch(e){}

    return list;
  }

  function saveAll(list){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }catch(e){}
  }

  function findNote(list, id){
    for(let i=0;i<list.length;i++){ if(list[i].id === id) return list[i]; }
    return null;
  }

  // Strip HTML to plain text for snippet preview
  function toPlainText(html){
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g,' ').trim();
  }

  function formatRelativeDate(ts){
    if(!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if(sameDay){
      return d.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});
    }
    const yest = new Date(now); yest.setDate(now.getDate()-1);
    if(d.toDateString() === yest.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], {month:'short', day:'numeric'});
  }

  // ── RENDER LIST ──
  function renderTagFilterRow(allNotes){
    const row = document.getElementById('notesTagFilterRow');
    if(!row) return;
    const tagSet = new Set<string>();
    allNotes.forEach(function(n){ (n.tags||[]).forEach(function(t){ tagSet.add(t); }); });
    const tags = Array.from(tagSet).sort();
    if(tags.length === 0){
      row.style.display = 'none';
      row.innerHTML = '';
      // Reset any stale filter if all tags were removed
      if(_activeTagFilter){ _activeTagFilter = null; }
      return;
    }
    row.style.display = 'flex';
    row.innerHTML = '<div class="notes-tag-filter-chip'+(!_activeTagFilter?' active':'')+'" onclick="notesFilterByTag(null)">All</div>'
      + tags.map(function(t){
          return '<div class="notes-tag-filter-chip'+(_activeTagFilter===t?' active':'')+'" onclick="notesFilterByTag(\''+t.replace(/'/g,"\\'")+'\')">#'+escapeHtml(t)+'</div>';
        }).join('');
  }

  window.notesFilterByTag = function(tag){
    if(typeof haptic === 'function') haptic('light');
    _activeTagFilter = tag;
    renderList();
  };

  function renderList(){
    const all = loadAll();
    const container = document.getElementById('notesListItems');
    const empty = document.getElementById('notesEmpty');
    if(!container) return;

    renderTagFilterRow(all);
    const list = _activeTagFilter
      ? all.filter(function(n){ return (n.tags||[]).indexOf(_activeTagFilter) !== -1; })
      : all.slice();

    // Sort: pinned first, then by most recently updated
    list.sort((a,b)=>{
      if(!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return (b.updated||0)-(a.updated||0);
    });

    if(list.length === 0){
      if(empty){
        empty.classList.add('show');
        const sub = empty.querySelector('.notes-empty-sub');
        if(sub) sub.textContent = _activeTagFilter ? 'No notes tagged #'+_activeTagFilter+'.' : 'Tap + New Note to write something.';
      }
      container.innerHTML = '';
      return;
    }
    if(empty) empty.classList.remove('show');

    container.innerHTML = list.map(function(note){
      const plain = toPlainText(note.html);
      const title = (note.title && note.title.trim()) || (plain ? plain.slice(0,40) : 'Untitled note');
      const snippet = plain ? plain.slice(0,80) : 'No additional text';
      const meta = formatRelativeDate(note.updated);
      const pinnedBadge = note.pinned ? '<div class="notes-pin-badge"><svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" stroke="none"><path d="M12 2l2.4 6.4L21 9l-5 4.8 1.2 6.7L12 17l-5.2 3.5L8 13.8 3 9l6.6-.6z"/></svg>Pinned</div>' : '';
      const tagsHtml = (note.tags && note.tags.length)
        ? '<div class="notes-list-item-tags">' + note.tags.map(function(t){ return '<span class="notes-list-item-tag">#'+escapeHtml(t)+'</span>'; }).join('') + '</div>'
        : '';
      return '<div class="notes-list-item'+(note.pinned?' pinned':'')+'" onclick="notesOpen(\''+note.id+'\')">'+
        '<div class="notes-list-item-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>'+
        '<div class="notes-list-item-body">'+
          '<div class="notes-list-item-title">'+escapeHtml(title)+'</div>'+
          '<div class="notes-list-item-snippet">'+escapeHtml(snippet)+'</div>'+
          '<div class="notes-list-item-meta">'+escapeHtml(meta)+'</div>'+
          tagsHtml+
          pinnedBadge+
        '</div>'+
        '<div class="notes-list-item-chevron"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>'+
      '</div>';
    }).join('');
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
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
    // Hide shared segment header inside note editor
    const sh = document.getElementById('ntSegmentHeader');
    if(sh) sh.style.display = 'none';
  }

  // Entry point when Notes tab opens
  function notesLoad(){
    showList();
  }
  window.notesLoad = notesLoad;

  // ── CREATE / OPEN / DELETE ──
  window.notesCreate = function(){
    haptic('light');
    const list = loadAll();
    const note = { id: uid(), title: '', html: '', tags: [], updated: Date.now() };
    list.unshift(note);
    saveAll(list);
    notesOpen(note.id);
  };

  window.notesOpen = function(id){
    const list = loadAll();
    const note = findNote(list, id);
    if(!note) return;
    currentId = id;
    const ed = getEditor();
    const ti = getTitleInput();
    if(ed) ed.innerHTML = note.html || '';
    if(ti) ti.value = note.title || '';
    showEditor();
    updateToolbarState();
    updatePinBtn(note.pinned);
    renderTagChips(note.tags || []);
    setTimeout(function(){
      if(!note.html && ti) ti.focus();
      else if(ed) ed.focus();
    }, 320);
  };

  // ── TAGS ──
  function renderTagChips(tags){
    const box = document.getElementById('notesTagChips');
    if(!box) return;
    box.innerHTML = (tags||[]).map(function(t){
      return '<span class="notes-tag-chip">#'+escapeHtml(t)+'<button onclick="notesRemoveTag(\''+t.replace(/'/g,"\\'")+'\')" aria-label="Remove tag">\u2715</button></span>';
    }).join('');
  }

  window.notesAddTag = function(raw){
    if(!currentId) return;
    const tag = String(raw||'').trim().replace(/^#/,'').slice(0,24);
    if(!tag) return;
    const list = loadAll();
    const note = findNote(list, currentId);
    if(!note) return;
    note.tags = note.tags || [];
    if(note.tags.indexOf(tag) === -1){
      note.tags.push(tag);
      note.updated = Date.now();
      saveAll(list);
      renderTagChips(note.tags);
    }
  };

  window.notesRemoveTag = function(tag){
    if(!currentId) return;
    haptic('light');
    const list = loadAll();
    const note = findNote(list, currentId);
    if(!note) return;
    note.tags = (note.tags||[]).filter(function(t){ return t!==tag; });
    note.updated = Date.now();
    saveAll(list);
    renderTagChips(note.tags);
  };

  function updatePinBtn(pinned){
    const btn = document.getElementById('notesPinBtn');
    if(!btn) return;
    btn.classList.toggle('pin-active', !!pinned);
    btn.title = pinned ? 'Unpin note' : 'Pin note';
  }

  window.notesTogglePin = function(){
    if(!currentId) return;
    haptic('light');
    let list = loadAll();
    const note = findNote(list, currentId);
    if(!note) return;
    note.pinned = !note.pinned;
    saveAll(list);
    updatePinBtn(note.pinned);
    vikramToast(note.pinned ? '📌 Note pinned' : 'Note unpinned');
  };

  window.notesBackToList = function(){
    clearTimeout(saveTimer);
    notesSave();
    showList();
  };

  window.notesDeleteCurrent = function(){
    if(!currentId) { showList(); return; }
    document.getElementById('notesConfirmOverlay').classList.add('open');
  };

  window.notesConfirmYes = function(){
    haptic('medium');
    document.getElementById('notesConfirmOverlay').classList.remove('open');
    if(!currentId) return;
    let list = loadAll();
    const removed = findNote(list, currentId);
    const removedIdx = list.findIndex(function(n){ return n.id === currentId; });
    list = list.filter(function(n){ return n.id !== currentId; });
    saveAll(list);
    showList();
    if(removed && typeof showUndoSnackbar === 'function'){
      showUndoSnackbar('Note deleted', function(){
        let l2 = loadAll();
        l2.splice(Math.min(removedIdx, l2.length), 0, removed);
        saveAll(l2);
        showList();
      });
    }
  };

  window.notesConfirmClose = function(e){
    if(e && e.target !== document.getElementById('notesConfirmOverlay')) return;
    document.getElementById('notesConfirmOverlay').classList.remove('open');
  };

  // ── SAVE CURRENT NOTE ──
  function notesSave(){
    if(!currentId) return;
    const ed = getEditor();
    const ti = getTitleInput();
    if(!ed) return;
    let list = loadAll();
    const note = findNote(list, currentId);
    if(!note) return;
    note.html = ed.innerHTML;
    note.title = ti ? ti.value : '';
    note.updated = Date.now();
    saveAll(list);

    const dot = getSaveDot();
    if(dot){
      dot.classList.add('show');
      clearTimeout(dot._hideTimer);
      dot._hideTimer = setTimeout(function(){ dot.classList.remove('show'); }, 1400);
    }
  }

  // Immediate save (used when navigating away)
  window.notesFlushSave = function(){
    clearTimeout(saveTimer);
    notesSave();
  };

  // Format commands
  window.notesFmt = function(cmd){
    const ed = getEditor();
    if(!ed) return;
    ed.focus();
    document.execCommand(cmd, false, null);
    updateToolbarState();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(notesSave, 400);
  };

  // Clear current note content
  window.notesClear = function(){
    const ed = getEditor();
    if(!ed) return;
    if(!ed.innerHTML.trim() || ed.innerHTML === '<br>') return;
    ed.innerHTML = '';
    notesSave();
  };

  // Update bold/italic/underline active states
  function updateToolbarState(){
    const cmds = ['bold','italic','underline','insertUnorderedList','insertOrderedList'];
    cmds.forEach(function(cmd){
      const btn = document.querySelector('.notes-fmt-btn[data-cmd="'+cmd+'"]');
      if(!btn) return;
      try{
        if(document.queryCommandState(cmd)){
          btn.classList.add('active-fmt');
        } else {
          btn.classList.remove('active-fmt');
        }
      }catch(e){}
    });
  }

  // Wire up editor + title events after DOM ready
  function initNotes(){
    const ed = getEditor();
    const ti = getTitleInput();
    if(!ed) return;

    // Debounced autosave for editor content
    ed.addEventListener('input', function(){
      clearTimeout(saveTimer);
      saveTimer = setTimeout(notesSave, 600);
      updateToolbarState();
    });
    ed.addEventListener('keyup', updateToolbarState);
    ed.addEventListener('mouseup', updateToolbarState);

    // Cmd/Ctrl+B/I/U shortcuts
    ed.addEventListener('keydown', function(e){
      if(e.metaKey || e.ctrlKey){
        if(e.key==='b'){ e.preventDefault(); notesFmt('bold'); }
        else if(e.key==='i'){ e.preventDefault(); notesFmt('italic'); }
        else if(e.key==='u'){ e.preventDefault(); notesFmt('underline'); }
      }
    });

    // Debounced autosave for title
    if(ti){
      ti.addEventListener('input', function(){
        clearTimeout(saveTimer);
        saveTimer = setTimeout(notesSave, 400);
      });
      ti.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){ e.preventDefault(); ed.focus(); }
      });
    }

    // Tag input: Enter or comma commits a tag
    const tagInput = document.getElementById('notesTagInput');
    if(tagInput){
      tagInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ','){
          e.preventDefault();
          notesAddTag(tagInput.value);
          tagInput.value = '';
        } else if(e.key === 'Backspace' && !tagInput.value){
          // Remove the last tag when backspacing on an empty input
          const list = loadAll();
          const note = findNote(list, currentId);
          if(note && note.tags && note.tags.length){
            notesRemoveTag(note.tags[note.tags.length-1]);
          }
        }
      });
      tagInput.addEventListener('blur', function(){
        if(tagInput.value.trim()){ notesAddTag(tagInput.value); tagInput.value = ''; }
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initNotes);
  } else {
    initNotes();
  }
})();
