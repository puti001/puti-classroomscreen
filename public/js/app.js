/**
 * Puti Classroomscreen - Main Application Controller
 * Handles wallpaper manager, dock triggers, top-bar utilities, and 26-Widget Library.
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('desktop-canvas');
  const wallpaperEl = document.getElementById('desktop-wallpaper');
  const wm = new WindowManager(canvas);

  // Widget spawn methods map
  const widgetSpawners = {
    'clock': () => ClassroomWidgets.spawnClock(wm),
    'calendar': () => ClassroomWidgets.spawnCalendar(wm),
    'timer': () => ClassroomWidgets.spawnTimer(wm),
    'visual-timer': () => ClassroomWidgets.spawnVisualTimer(wm),
    'stopwatch': () => ClassroomWidgets.spawnStopwatch(wm),
    'agenda': () => ClassroomWidgets.spawnAgenda(wm),
    'traffic-light': () => ClassroomWidgets.spawnTrafficLight(wm),
    'work-symbols': () => ClassroomWidgets.spawnWorkSymbols(wm),
    'sound-meter': () => ClassroomWidgets.spawnSoundMeter(wm),
    'scoreboard': () => ClassroomWidgets.spawnScoreboard(wm),
    'buzzer': () => ClassroomWidgets.spawnBuzzer(wm),
    'picker': () => ClassroomWidgets.spawnPicker(wm),
    'groups': () => ClassroomWidgets.spawnGroupMaker(wm),
    'dice': () => ClassroomWidgets.spawnDice(wm),
    'rps': () => ClassroomWidgets.spawnRPS(wm),
    'poll': () => ClassroomWidgets.spawnPoll(wm),
    'contact': () => ClassroomWidgets.spawnContactBook(wm),
    'sticky': () => ClassroomWidgets.spawnStickyNote(wm),
    'announcement': () => ClassroomWidgets.spawnAnnouncement(wm),
    'whiteboard': () => ClassroomWidgets.spawnWhiteboard(wm),
    'image': () => ClassroomWidgets.spawnImageViewer(wm),
    'stickers': () => ClassroomWidgets.spawnStickers(wm),
    'pdf': () => ClassroomWidgets.spawnPDFViewer(wm),
    'qrcode': () => ClassroomWidgets.spawnQRCode(wm),
    'hyperlink': () => ClassroomWidgets.spawnHyperlink(wm),
    'video': () => ClassroomWidgets.spawnVideo(wm),
    'embed': () => ClassroomWidgets.spawnEmbed(wm),
    'webcam': () => ClassroomWidgets.spawnWebcam(wm),
    'ambient': () => ClassroomWidgets.spawnAmbientSound(wm),
    'tally': () => ClassroomWidgets.spawnIndividualTally(wm),
    'timetable': () => ClassroomWidgets.spawnTimetable(wm),
    'days-countdown': () => ClassroomWidgets.spawnDaysCountdown(wm),
    'exam-timer': () => ClassroomWidgets.spawnExamTimer(wm),
    'user-guide': () => ClassroomWidgets.spawnUserGuide(wm)
  };

  // =========================================================================
  // 1. Wallpaper Management
  // =========================================================================
  const wallpapers = [
    {
      id: 'warm-gradient',
      name: '日系暖日粉彩',
      url: 'linear-gradient(135deg, #FFE8CC 0%, #FFD8A8 50%, #FFC078 100%)',
      isGradient: true,
      thumb: 'linear-gradient(135deg, #FFE8CC, #FFC078)'
    },
    {
      id: 'classroom-bright',
      name: '溫馨明亮教室',
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'cozy-desk',
      name: '木質簡約書桌',
      url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'forest-calm',
      name: '翠綠森林微風',
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'starry-night',
      name: '靜謐浩瀚星空',
      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80',
      thumb: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'morandi-green',
      name: '莫蘭迪鼠尾草',
      url: 'linear-gradient(135deg, #D8F3DC 0%, #B7E4C7 50%, #95D5B2 100%)',
      isGradient: true,
      thumb: 'linear-gradient(135deg, #D8F3DC, #95D5B2)'
    }
  ];

  let currentWallpaper = localStorage.getItem('puti_cs_wallpaper') || wallpapers[0].url;
  let wallpaperBlur = localStorage.getItem('puti_cs_wp_blur') || '0';
  let wallpaperDim = localStorage.getItem('puti_cs_wp_dim') || '0.12';

  const applyWallpaper = (wpString) => {
    currentWallpaper = wpString;
    localStorage.setItem('puti_cs_wallpaper', wpString);

    if (wpString.startsWith('linear-gradient')) {
      wallpaperEl.style.backgroundImage = wpString;
    } else {
      wallpaperEl.style.backgroundImage = `url("${wpString}")`;
    }
    updateWallpaperFilters();
  };

  const updateWallpaperFilters = () => {
    wallpaperEl.style.filter = `blur(${wallpaperBlur}px) brightness(${1 - parseFloat(wallpaperDim)})`;
  };

  applyWallpaper(currentWallpaper);

  // =========================================================================
  // 2. Wallpaper Modal UI Setup
  // =========================================================================
  const wpModal = document.getElementById('wallpaper-modal');
  const wpGrid = document.getElementById('wallpaper-preset-grid');
  const wpBlurSlider = document.getElementById('wp-blur-slider');
  const wpDimSlider = document.getElementById('wp-dim-slider');
  const wpCustomUrlInput = document.getElementById('wp-custom-url');
  const wpApplyUrlBtn = document.getElementById('wp-apply-url-btn');
  const wpFileInput = document.getElementById('wp-file-input');
  const wpModalClose = document.getElementById('wp-modal-close');
  const openWpModalBtn = document.getElementById('btn-open-wallpaper');

  wpGrid.innerHTML = wallpapers.map(wp => `
    <div class="wallpaper-thumb ${wp.url === currentWallpaper ? 'active' : ''}" data-url="${wp.url}"
      style="background: ${wp.isGradient ? wp.thumb : `url("${wp.thumb}") center/cover`};">
      <span>${wp.name}</span>
    </div>
  `).join('');

  wpGrid.querySelectorAll('.wallpaper-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      wpGrid.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      applyWallpaper(thumb.dataset.url);
      window.soundEngine.playTick();
    });
  });

  wpBlurSlider.value = wallpaperBlur;
  wpDimSlider.value = wallpaperDim;

  wpBlurSlider.addEventListener('input', (e) => {
    wallpaperBlur = e.target.value;
    localStorage.setItem('puti_cs_wp_blur', wallpaperBlur);
    updateWallpaperFilters();
  });

  wpDimSlider.addEventListener('input', (e) => {
    wallpaperDim = e.target.value;
    localStorage.setItem('puti_cs_wp_dim', wallpaperDim);
    updateWallpaperFilters();
  });

  wpApplyUrlBtn.addEventListener('click', () => {
    const url = wpCustomUrlInput.value.trim();
    if (url) {
      applyWallpaper(url);
      wpModal.classList.remove('show');
      window.soundEngine.playBell();
    }
  });

  wpFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        applyWallpaper(event.target.result);
        wpModal.classList.remove('show');
        window.soundEngine.playBell();
      };
      reader.readAsDataURL(file);
    }
  });

  openWpModalBtn.addEventListener('click', () => {
    wpModal.classList.add('show');
    window.soundEngine.playTick();
  });

  wpModalClose.addEventListener('click', () => {
    wpModal.classList.remove('show');
  });

  wpModal.addEventListener('click', (e) => {
    if (e.target === wpModal) wpModal.classList.remove('show');
  });

  // =========================================================================
  // 3. Top Bar Actions
  // =========================================================================
  const soundToggleBtn = document.getElementById('btn-toggle-sound');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const resetLayoutBtn = document.getElementById('btn-reset-layout');
  const userGuideBtn = document.getElementById('btn-user-guide');

  // User Guide Modal
  userGuideBtn?.addEventListener('click', () => {
    ClassroomWidgets.spawnUserGuide(wm);
  });
  const tickerText = document.getElementById('classroom-ticker');
  const toggleDesktopBtn = document.getElementById('btn-toggle-desktop');

  let isDesktopHidden = false;
  toggleDesktopBtn.addEventListener('click', () => {
    isDesktopHidden = !isDesktopHidden;
    if (isDesktopHidden) {
      canvas.classList.add('hide-all-windows');
      toggleDesktopBtn.innerHTML = '<i class="fa-solid fa-window-restore"></i> 還原視窗';
      toggleDesktopBtn.style.color = '#FF9F1C';
    } else {
      canvas.classList.remove('hide-all-windows');
      toggleDesktopBtn.innerHTML = '<i class="fa-solid fa-desktop"></i> 淨空桌面';
      toggleDesktopBtn.style.color = 'var(--text)';
    }
    window.soundEngine.playTick();
  });

  const updateSoundIcon = () => {
    const muted = window.soundEngine.isMuted();
    soundToggleBtn.innerHTML = muted
      ? '<i class="fa-solid fa-volume-xmark" style="color:#FF4757;"></i> 静音'
      : '<i class="fa-solid fa-volume-high"></i> 音效';
  };
  updateSoundIcon();

  soundToggleBtn.addEventListener('click', () => {
    window.soundEngine.toggleMute();
    updateSoundIcon();
    window.soundEngine.playTick();
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  });

  const savedTicker = localStorage.getItem('puti_cs_ticker');
  if (savedTicker) tickerText.textContent = savedTicker;
  tickerText.addEventListener('blur', () => {
    localStorage.setItem('puti_cs_ticker', tickerText.textContent.trim());
  });

  resetLayoutBtn.addEventListener('click', () => {
    if (confirm('確定要關閉所有現有工具視窗，並恢復預設排列嗎？')) {
      wm.closeAll();
      setTimeout(spawnDefaultLayout, 250);
      window.soundEngine.playBell();
    }
  });

  // =========================================================================
  // 4. 26 Widgets Library Modal Setup (更多工具抽屜)
  // =========================================================================
  const libModal = document.getElementById('widgets-library-modal');
  const libCloseBtn = document.getElementById('widget-lib-close');
  const libGrid = document.getElementById('widget-lib-grid');
  const searchInput = document.getElementById('widget-search-input');
  const categoryTabs = document.getElementById('widget-category-tabs');
  const dockMoreBtn = document.getElementById('dock-more-tools');

  let activeCategory = 'all';
  let searchTerm = '';

  const renderWidgetLibrary = () => {
    const list = ClassroomWidgets.registry.filter(w => {
      const matchCat = activeCategory === 'all' || w.category === activeCategory;
      const matchSearch = !searchTerm || w.name.includes(searchTerm) || w.desc.includes(searchTerm);
      return matchCat && matchSearch;
    });

    libGrid.innerHTML = list.map(w => `
      <div class="widget-card-item" data-id="${w.id}">
        <div class="widget-card-item-top">
          <div class="widget-card-icon" style="background: ${w.color}18; color: ${w.color};">
            <i class="fa-solid ${w.icon}"></i>
          </div>
          <span class="widget-card-badge">${getCategoryBadge(w.category)}</span>
        </div>
        <div class="widget-card-title">${w.name}</div>
        <div class="widget-card-desc">${w.desc}</div>
      </div>
    `).join('');

    libGrid.querySelectorAll('.widget-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (widgetSpawners[id]) {
          // If desktop was hidden, unhide it first
          if (isDesktopHidden) {
            isDesktopHidden = false;
            canvas.classList.remove('hide-all-windows');
            toggleDesktopBtn.innerHTML = '<i class="fa-solid fa-desktop"></i> 淨空桌面';
          }
          widgetSpawners[id]();
          libModal.classList.remove('show');
          window.soundEngine.playTick();
        }
      });
    });
  };

  const getCategoryBadge = (cat) => {
    const map = {
      'time': '時間',
      'order': '秩序',
      'interactive': '互動',
      'media': '圖像',
      'integration': '多媒體'
    };
    return map[cat] || '工具';
  };

  categoryTabs.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      categoryTabs.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.cat;
      renderWidgetLibrary();
      window.soundEngine.playTick();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    renderWidgetLibrary();
  });

  dockMoreBtn.addEventListener('click', () => {
    renderWidgetLibrary();
    libModal.classList.add('show');
    searchInput.value = '';
    searchTerm = '';
    window.soundEngine.playTick();
  });

  libCloseBtn.addEventListener('click', () => {
    libModal.classList.remove('show');
  });

  libModal.addEventListener('click', (e) => {
    if (e.target === libModal) libModal.classList.remove('show');
  });

  // =========================================================================
  // 4.5 Global Student Roster Editor (一行一個名單編輯器)
  // =========================================================================
  const rosterModal = document.getElementById('roster-modal');
  const rosterCloseBtn = document.getElementById('roster-modal-close');
  const rosterTextarea = document.getElementById('roster-modal-textarea');
  const rosterCountInfo = document.getElementById('roster-count-info');
  const rosterFill30Btn = document.getElementById('roster-fill-30-btn');
  const rosterClearBtn = document.getElementById('roster-clear-btn');
  const rosterSaveBtn = document.getElementById('roster-save-btn');

  let rosterSaveCallback = null;

  const updateRosterCount = () => {
    const list = rosterTextarea.value.split('\n').map(s => s.trim()).filter(Boolean);
    rosterCountInfo.textContent = `目前共 ${list.length} 位同學`;
  };

  if (rosterTextarea) {
    rosterTextarea.addEventListener('input', updateRosterCount);
  }

  if (rosterFill30Btn) {
    rosterFill30Btn.addEventListener('click', () => {
      const demo = Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`).join('\n');
      rosterTextarea.value = demo;
      updateRosterCount();
      window.soundEngine.playTick();
    });
  }

  if (rosterClearBtn) {
    rosterClearBtn.addEventListener('click', () => {
      rosterTextarea.value = '';
      updateRosterCount();
      window.soundEngine.playTick();
    });
  }

  if (rosterCloseBtn) {
    rosterCloseBtn.addEventListener('click', () => {
      rosterModal.classList.remove('show');
    });
  }

  if (rosterModal) {
    rosterModal.addEventListener('click', (e) => {
      if (e.target === rosterModal) rosterModal.classList.remove('show');
    });
  }

  if (rosterSaveBtn) {
    rosterSaveBtn.addEventListener('click', () => {
      const cleanList = rosterTextarea.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (cleanList.length === 0) {
        alert('請至少輸入一位學生姓名或號碼喔！');
        return;
      }
      localStorage.setItem('puti_student_roster', JSON.stringify(cleanList));
      rosterModal.classList.remove('show');
      window.soundEngine.playBell();
      if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 50 });

      window.dispatchEvent(new CustomEvent('rosterUpdated', { detail: cleanList }));
      if (typeof rosterSaveCallback === 'function') {
        rosterSaveCallback(cleanList);
      }
    });
  }

  window.openRosterEditor = (initialList, onSave) => {
    rosterSaveCallback = onSave;
    const list = initialList && initialList.length > 0
      ? initialList
      : (JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`));
    
    rosterTextarea.value = list.join('\n');
    updateRosterCount();
    rosterModal.classList.add('show');
    rosterTextarea.focus();
    window.soundEngine.playTick();
  };

  // =========================================================================
  // 5. Bottom Dock Direct Triggers
  // =========================================================================
  const dockActions = {
    'dock-traffic': () => ClassroomWidgets.spawnTrafficLight(wm),
    'dock-symbols': () => ClassroomWidgets.spawnWorkSymbols(wm),
    'dock-timer': () => ClassroomWidgets.spawnTimer(wm),
    'dock-visual-timer': () => ClassroomWidgets.spawnVisualTimer(wm),
    'dock-picker': () => ClassroomWidgets.spawnPicker(wm),
    'dock-whiteboard': () => ClassroomWidgets.spawnWhiteboard(wm),
    'dock-scoreboard': () => ClassroomWidgets.spawnScoreboard(wm),
    'dock-buzzer': () => ClassroomWidgets.spawnBuzzer(wm),
    'dock-contact': () => ClassroomWidgets.spawnContactBook(wm),
    'dock-dice': () => ClassroomWidgets.spawnDice(wm),
    'dock-sound': () => ClassroomWidgets.spawnSoundMeter(wm),
    'dock-sticky': () => ClassroomWidgets.spawnStickyNote(wm)
  };

  Object.keys(dockActions).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        if (isDesktopHidden) {
          isDesktopHidden = false;
          canvas.classList.remove('hide-all-windows');
          toggleDesktopBtn.innerHTML = '<i class="fa-solid fa-desktop"></i> 淨空桌面';
        }
        window.soundEngine.playTick();
        dockActions[id]();
      });
    }
  });



  // Global Roster Button in Topbar
  const globalRosterBtn = document.getElementById('btn-global-roster');
  if (globalRosterBtn) {
    globalRosterBtn.addEventListener('click', () => {
      if (typeof window.openRosterEditor === 'function') {
        window.openRosterEditor();
      }
    });
  }

  // =========================================================================
  // 5.5 Preset & Fully Customizable Classroom Scenarios
  // =========================================================================
  const scenFocusBtn = document.getElementById('scen-focus');
  const scenCompeteBtn = document.getElementById('scen-compete');
  const scenDismissalBtn = document.getElementById('scen-dismissal');
  const customScenariosBar = document.getElementById('custom-scenarios-bar');
  const scenSaveCurrentBtn = document.getElementById('scen-save-current');
  const scenManageBtn = document.getElementById('scen-manage-btn');

  let customScenarios = JSON.parse(localStorage.getItem('puti_custom_scenarios') || '[]');

  const applyScenario = (scenario) => {
    wm.closeAll();
    wm.spawnCounter = 0;
    window.soundEngine.playFanfare();

    if (scenario === 'focus') {
      ClassroomWidgets.spawnClock(wm);
      setTimeout(() => ClassroomWidgets.spawnTrafficLight(wm), 80);
      setTimeout(() => ClassroomWidgets.spawnTimer(wm), 160);
      setTimeout(() => ClassroomWidgets.spawnWorkSymbols(wm), 240);
    } else if (scenario === 'compete') {
      ClassroomWidgets.spawnScoreboard(wm);
      setTimeout(() => ClassroomWidgets.spawnBuzzer(wm), 80);
      setTimeout(() => ClassroomWidgets.spawnDice(wm), 160);
      setTimeout(() => ClassroomWidgets.spawnStopwatch(wm), 240);
    } else if (scenario === 'dismissal') {
      ClassroomWidgets.spawnContactBook(wm);
      setTimeout(() => ClassroomWidgets.spawnAnnouncement(wm), 100);
      setTimeout(() => ClassroomWidgets.spawnTimer(wm), 200);
    }
  };

  const applyCustomScenario = (scenObj) => {
    wm.closeAll();
    wm.spawnCounter = 0;
    window.soundEngine.playFanfare();
    if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 50 });

    if (!scenObj.widgets || scenObj.widgets.length === 0) return;

    scenObj.widgets.forEach((w, idx) => {
      setTimeout(() => {
        const spawner = widgetSpawners[w.type];
        if (spawner) spawner();
      }, idx * 100);
    });
  };

  const renderCustomScenarios = () => {
    if (!customScenariosBar) return;
    customScenariosBar.innerHTML = '';
    customScenarios.forEach((scen, idx) => {
      const btn = document.createElement('button');
      btn.className = 'scale-btn custom-scen-btn';
      btn.style.cssText = 'background: #EBFBEE; color: #2B8A3E; border: 1px solid #B2F2BB; font-weight: 800;';
      btn.title = `點擊切換自訂情境：${scen.name}`;
      btn.innerHTML = `<i class="fa-solid fa-bookmark" style="font-size: 0.72rem;"></i> ${scen.name}`;
      btn.addEventListener('click', () => applyCustomScenario(scen));
      customScenariosBar.appendChild(btn);
    });
  };

  // Save current desktop state as custom scenario
  if (scenSaveCurrentBtn) {
    scenSaveCurrentBtn.addEventListener('click', () => {
      const activeWindows = Array.from(canvas.querySelectorAll('.floating-window')).filter(w => !w.classList.contains('minimized'));
      if (activeWindows.length === 0) {
        alert('目前桌面上沒有開啟任何工具視窗喔！請先擺放好想要的視窗再儲存。');
        return;
      }

      const defaultName = `情境 ${customScenarios.length + 1}`;
      const name = prompt('請輸入此自訂情境名稱（例如：晨光自習、英文會話、小考測驗）：', defaultName);
      if (!name || !name.trim()) return;

      const widgets = activeWindows.map(el => ({
        type: el.dataset.type || 'generic'
      }));

      customScenarios.push({
        id: 'scen_' + Date.now(),
        name: name.trim(),
        widgets: widgets
      });

      localStorage.setItem('puti_custom_scenarios', JSON.stringify(customScenarios));
      renderCustomScenarios();
      window.soundEngine.playBell();
      if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
    });
  }

  // Manage custom scenarios (delete or re-order)
  if (scenManageBtn) {
    scenManageBtn.addEventListener('click', () => {
      if (customScenarios.length === 0) {
        alert('目前尚未儲存任何自訂情境喔！請點擊「➕ 存情境」建立第一個情境。');
        return;
      }
      
      const listText = customScenarios.map((s, i) => `${i + 1}. ${s.name} (${s.widgets.length} 個視窗)`).join('\n');
      const choice = prompt(`【自訂情境管理】\n${listText}\n\n請輸入要刪除的情境編號（例如輸入 1 刪除第 1 個，或輸入 0 清空全部自訂情境）：`);
      if (choice === null) return;
      const num = parseInt(choice.trim(), 10);
      if (num === 0) {
        if (confirm('確定要清空所有自訂情境嗎？')) {
          customScenarios = [];
          localStorage.setItem('puti_custom_scenarios', JSON.stringify(customScenarios));
          renderCustomScenarios();
          window.soundEngine.playPop();
        }
      } else if (!isNaN(num) && num >= 1 && num <= customScenarios.length) {
        const removed = customScenarios.splice(num - 1, 1);
        localStorage.setItem('puti_custom_scenarios', JSON.stringify(customScenarios));
        renderCustomScenarios();
        window.soundEngine.playPop();
        alert(`已刪除「${removed[0].name}」`);
      }
    });
  }

  if (scenFocusBtn) scenFocusBtn.addEventListener('click', () => applyScenario('focus'));
  if (scenCompeteBtn) scenCompeteBtn.addEventListener('click', () => applyScenario('compete'));
  if (scenDismissalBtn) scenDismissalBtn.addEventListener('click', () => applyScenario('dismissal'));

  renderCustomScenarios();

  // Screen Scale Hierarchy
  const scaleBtns = document.querySelectorAll('.screen-scale-btn');
  const savedScale = localStorage.getItem('puti_screen_scale') || 'default';
  document.documentElement.dataset.screenScale = savedScale;
  scaleBtns.forEach(btn => {
    if (btn.getAttribute('data-scale') === savedScale) btn.classList.add('active');
    else btn.classList.remove('active');

    btn.addEventListener('click', () => {
      const scale = btn.getAttribute('data-scale');
      document.documentElement.dataset.screenScale = scale;
      localStorage.setItem('puti_screen_scale', scale);
      scaleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.soundEngine.playPop();
    });
  });

  // =========================================================================
  // 6. Default Classroom Layout Spawn
  // =========================================================================
  const spawnDefaultLayout = () => {
    const screenW = canvas.clientWidth || window.innerWidth;
    const isMobile = screenW < 768;

    if (isMobile) {
      ClassroomWidgets.spawnTimer(wm);
      ClassroomWidgets.spawnTrafficLight(wm);
      return;
    }

    wm.spawnCounter = 0;
    ClassroomWidgets.spawnTrafficLight(wm);

    setTimeout(() => {
      ClassroomWidgets.spawnWorkSymbols(wm);
    }, 80);

    setTimeout(() => {
      ClassroomWidgets.spawnTimer(wm);
    }, 160);

    setTimeout(() => {
      ClassroomWidgets.spawnClock(wm);
    }, 240);
  };

  spawnDefaultLayout();
});
