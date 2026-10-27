/**
 * Puti Classroomscreen - Complete 28-Widget Flagship Library
 * Covering all Classroomscreen widgets + Exquisite Giant 3D Dice/Coin,
 * Homework Contact Book, Quick Buzzer, and Font-Scale Systems.
 */

// Global Helper to open Giant QR Code Lightbox
window.openQRLightbox = (title, url, desc) => {
  const modal = document.getElementById('qr-lightbox-modal');
  const titleEl = document.getElementById('qr-lightbox-title');
  const imgBox = document.getElementById('qr-lightbox-img');
  const descEl = document.getElementById('qr-lightbox-desc');
  const closeBtn = document.getElementById('qr-lightbox-close');

  titleEl.textContent = title || '📱 學生掃碼連線';
  descEl.textContent = desc || '請拿出平板或手機相機對準條碼掃描';
  imgBox.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(imgBox, { text: url, width: 260, height: 260, colorDark: "#1A202C", colorLight: "#FFFFFF", correctLevel: QRCode.CorrectLevel.H });
    } catch(e) {
      imgBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}" width="260" height="260">`;
    }
  } else {
    imgBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}" width="260" height="260">`;
  }

  modal.classList.add('show');
  const close = () => modal.classList.remove('show');
  closeBtn.onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };
};

const ClassroomWidgets = {
  // Registry metadata for the "More Tools" drawer/modal
  registry: [
    // ⏱️ 時間與計畫管理
    { id: 'clock', category: 'time', name: '時鐘日曆', icon: 'fa-clock', color: '#4EA8DE', desc: '12/24時制、即時秒數與日曆日期' },
    { id: 'calendar', category: 'time', name: '月曆檢視', icon: 'fa-calendar-days', color: '#3A86FF', desc: '完整月份檢視、確認重要週次與節日' },
    { id: 'timer', category: 'time', name: '倒數計時器', icon: 'fa-hourglass-half', color: '#FF6B6B', desc: '雙模式計時器、環形進度條與提示鈴' },
    { id: 'visual-timer', category: 'time', name: '視覺計時器', icon: 'fa-chart-pie', color: '#FF9F1C', desc: '沙漏圓餅漸消效果，專為幼兒/低年級設計' },
    { id: 'stopwatch', category: 'time', name: '競賽碼錶', icon: 'fa-stopwatch', color: '#2EC4B6', desc: '課堂競賽、限時闖關與即時按圈計時' },
    { id: 'agenda', category: 'time', name: '作息時間表', icon: 'fa-list-check', color: '#52B788', desc: '可勾選劃記流程步驟，支援字體放大' },

    // 📢 秩序與課堂經營
    { id: 'traffic-light', category: 'order', name: '班級紅綠燈', icon: 'fa-traffic-light', color: '#FF4757', desc: '安靜/收尾/討論三色切換，支援橫直向' },
    { id: 'work-symbols', category: 'order', name: '課堂工作符號', icon: 'fa-icons', color: '#9A8CFF', desc: '靜音、輕聲、小組、全班4種指令圖示' },
    { id: 'sound-meter', category: 'order', name: '教室音量計', icon: 'fa-volume-high', color: '#2ED573', desc: '麥克風即時監測教室分貝，超標自動警報' },
    { id: 'scoreboard', category: 'order', name: '小組記分板', icon: 'fa-trophy', color: '#FFA502', desc: '多小組PK賽即時加減分與領先者皇冠' },

    // 🎲 互動與隨機挑選
    { id: 'buzzer', category: 'interactive', name: '課堂搶答神器', icon: 'fa-bell', color: '#E63946', desc: '現場大按鈕＋手機平板毫秒搶答，連動記分' },
    { id: 'picker', category: 'interactive', name: '幸運抽籤點名', icon: 'fa-bullseye', color: '#FF9F1C', desc: '老虎機滾輪動畫、防重複機制、慶祝彩帶' },
    { id: 'groups', category: 'interactive', name: '隨機分組工具', icon: 'fa-people-group', color: '#52B788', desc: '2~8組均勻打散名單，一鍵分組卡片' },
    { id: 'dice', category: 'interactive', name: '3D 骰子與硬幣', icon: 'fa-dice', color: '#9A8CFF', desc: '巨大精緻立體象牙骰子、浮雕金幣翻轉' },
    { id: 'rps', category: 'interactive', name: '剪刀石頭布', icon: 'fa-hand-back-fist', color: '#FF85A1', desc: '趣味猜拳互動動畫，隨機出拳裁決' },
    { id: 'poll', category: 'interactive', name: '課堂即時投票', icon: 'fa-square-poll-vertical', color: '#4EA8DE', desc: '觸控＋手機雙端投票、可巨幅放大QR Code' },

    // 📝 文字、繪圖與圖像
    { id: 'contact', category: 'media', name: '家庭聯絡簿', icon: 'fa-book-open-reader', color: '#3A86FF', desc: '每日各科作業清單、帶物提醒、字級放大、一鍵複製' },
    { id: 'announcement', category: 'media', name: '課堂大公告板', icon: 'fa-chalkboard', color: '#2D3748', desc: '醒目大字黑板公告，支援 A+/A- 字體無級縮放' },
    { id: 'sticky', category: 'media', name: '隨手便利貼', icon: 'fa-note-sticky', color: '#FFA502', desc: '四色粉彩便利貼，支援字級放大調整' },
    { id: 'whiteboard', category: 'media', name: '自由塗鴉白板', icon: 'fa-paintbrush', color: '#2EC4B6', desc: '黑板/白板/方格背景、調色盤、匯出PNG' },
    { id: 'image', category: 'media', name: '教材圖片展示', icon: 'fa-image', color: '#FF6B6B', desc: '拖曳本機圖片或貼上網址即時展示' },
    { id: 'stickers', category: 'media', name: '獎勵電子貼紙', icon: 'fa-award', color: '#FFD166', desc: '點擊直接印章蓋在畫面上，附鼓舞音效' },
    { id: 'pdf', category: 'media', name: 'PDF 講義閱讀器', icon: 'fa-file-pdf', color: '#E63946', desc: '拖曳載入教學講義或考卷即時展示' },

    // 🌐 多媒體與外部整合
    { id: 'qrcode', category: 'integration', name: 'QR Code 產生器', icon: 'fa-qrcode', color: '#1B4965', desc: '輸入網址即時生成高解析度二維碼供掃描' },
    { id: 'hyperlink', category: 'integration', name: '教學超連結按鈕', icon: 'fa-arrow-up-right-from-square', color: '#3A86FF', desc: '建立醒目捷徑按鈕直達 Kahoot、Padlet' },
    { id: 'video', category: 'integration', name: 'YouTube 影片嵌入', icon: 'fa-circle-play', color: '#E63946', desc: '貼上 YouTube 連結在畫面中無縫播放' },
    { id: 'embed', category: 'integration', name: '網頁 iFrame 嵌入', icon: 'fa-code', color: '#6A4C93', desc: '嵌入 PhET 科學模擬、GeoGebra 或簡報' },
    { id: 'webcam', category: 'integration', name: '實物投影/攝影機', icon: 'fa-camera', color: '#0077B6', desc: '支援切換實物投影機或筆電前後鏡頭' },
    { id: 'ambient', category: 'integration', name: '專注音訊與白噪音', icon: 'fa-headphones', color: '#2A9D8F', desc: '雨聲、森林、咖啡館、白噪音專注烘托' },
    { id: 'tally', category: 'order', name: '個人計分器', icon: 'fa-user-check', color: '#FF7B00', desc: '全班個別學生加扣分、排行榜頒獎、全班一鍵加分' },
    { id: 'timetable', category: 'time', name: '班級功課表', icon: 'fa-calendar-week', color: '#3A86FF', desc: '週一至週五功課表、今日課程自動高亮、科目快捷晶片填寫' },
    { id: 'days-countdown', category: 'time', name: '重要日子倒數', icon: 'fa-calendar-check', color: '#E63946', desc: '倒數段考、校外教學、畢業典禮、寒暑假等重要日子天數' }
  ],

  // =========================================================================
  // 1. 家庭聯絡簿 (Homework & Contact Book)
  // =========================================================================
  spawnContactBook(wm) {
    const today = new Date();
    const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayStr = days[today.getDay()];

    const savedData = JSON.parse(localStorage.getItem('puti_hw_data') || 'null') || {
      chinese: '國語習作第 42~45 頁',
      math: '數學習作第 38 頁、訂正第四單元',
      english: '英語課本 Unit 3 朗讀 3 遍',
      other: '社會重點整理、閱讀課外書 20 分鐘',
      memo: '明天是便服日，請記得帶彩色筆與剪刀！'
    };

    const defaultTags = ['國習 P.', '數習 P.', '社習 P.', '攜帶美勞用具', '發下成績單', '簽名回條', '明日聽寫考'];
    let customTags = JSON.parse(localStorage.getItem('puti_hw_custom_tags') || '[]');

    let fontSize = 1.05;

    const content = `
      <div class="homework-container">
        <!-- Header & Font Scale Toolbar -->
        <div class="hw-header-bar">
          <div class="hw-title-group">
            <i class="fa-solid fa-book-open-reader"></i>
            <span>家庭聯絡簿</span>
            <span style="font-size: 0.85rem; color: #718096; font-weight: 700;">(${dateStr} ${dayStr})</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <div class="font-scale-controls">
              <button class="font-scale-btn" id="hw-font-minus" title="縮小字體">A-</button>
              <button class="font-scale-btn" id="hw-font-reset" title="重置字體">A</button>
              <button class="font-scale-btn" id="hw-font-plus" title="放大字體">A+</button>
            </div>
            <button class="action-btn-secondary" id="hw-copy-btn" style="height: 28px; padding: 0 10px; font-size: 0.78rem;" title="複製文字貼至 LINE 群組">
              <i class="fa-solid fa-copy"></i> 複製
            </button>
          </div>
        </div>

        <!-- Quick Snippet Tags Bar (with Custom Tags & Add Button) -->
        <div class="hw-quick-tags-bar" style="display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 8px 0; background: #FFF9DB; padding: 8px; border-radius: 10px; border: 1px dashed #FFE066;">
          <div style="font-size: 0.76rem; font-weight: 800; color: #D9480F; display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span><i class="fa-solid fa-bolt"></i> 快捷詞庫（點擊填入）：</span>
            <button type="button" id="hw-add-tag-btn" style="background: #2B8A3E; color: white; border: none; padding: 2px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: bold; cursor: pointer;">
              <i class="fa-solid fa-plus"></i> 新增自訂詞庫
            </button>
          </div>
          <div id="hw-tags-chip-list" style="display: flex; flex-wrap: wrap; gap: 5px; width: 100%;"></div>
        </div>

        <!-- Subjects List -->
        <div class="hw-list-box" id="hw-items-list">
          <div class="hw-row">
            <div class="hw-subject-badge" style="background: #FFE3E3; color: #E03131;">國語</div>
            <input type="text" class="hw-content-input" id="hw-chinese" value="${savedData.chinese}" placeholder="點此輸入國語作業...">
          </div>
          <div class="hw-row">
            <div class="hw-subject-badge" style="background: #E7F5FF; color: #1971C2;">數學</div>
            <input type="text" class="hw-content-input" id="hw-math" value="${savedData.math}" placeholder="點此輸入數學作業...">
          </div>
          <div class="hw-row">
            <div class="hw-subject-badge" style="background: #FFF3BF; color: #F59F00;">英語</div>
            <input type="text" class="hw-content-input" id="hw-english" value="${savedData.english}" placeholder="點此輸入英語作業...">
          </div>
          <div class="hw-row">
            <div class="hw-subject-badge" style="background: #EBFBEE; color: #2F9E44;">其他</div>
            <input type="text" class="hw-content-input" id="hw-other" value="${savedData.other}" placeholder="點此輸入其他科目/社團任務...">
          </div>
          <div class="hw-memo-box">
            <div style="font-weight: 800; font-size: 0.85rem; color: #D9480F; display: flex; align-items: center; gap: 4px;">
              <i class="fa-solid fa-triangle-exclamation"></i> 重要通知與帶物叮嚀：
            </div>
            <input type="text" class="hw-content-input" id="hw-memo" value="${savedData.memo}" placeholder="點此輸入明日帶物或家長叮嚀...">
          </div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '家庭聯絡簿',
      icon: 'fa-book-open-reader',
      iconColor: '#3A86FF',
      width: 480,
      height: 440,
      type: 'contact',
      contentHtml: content,
      onInit: (el) => {
        const chineseIn = el.querySelector('#hw-chinese');
        const mathIn = el.querySelector('#hw-math');
        const englishIn = el.querySelector('#hw-english');
        const otherIn = el.querySelector('#hw-other');
        const memoIn = el.querySelector('#hw-memo');
        const copyBtn = el.querySelector('#hw-copy-btn');
        const tagsContainer = el.querySelector('#hw-tags-chip-list');
        const addTagBtn = el.querySelector('#hw-add-tag-btn');
        const inputs = [chineseIn, mathIn, englishIn, otherIn, memoIn];

        let activeInput = chineseIn; // 預設選中第一欄

        inputs.forEach(input => {
          input.addEventListener('focus', () => {
            activeInput = input;
            input.style.borderColor = '#3A86FF';
            input.style.boxShadow = '0 0 0 2px rgba(58, 134, 255, 0.2)';
          });
          input.addEventListener('blur', () => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
          });
        });

        const save = () => {
          const data = {
            chinese: chineseIn.value.trim(),
            math: mathIn.value.trim(),
            english: englishIn.value.trim(),
            other: otherIn.value.trim(),
            memo: memoIn.value.trim()
          };
          localStorage.setItem('puti_hw_data', JSON.stringify(data));
        };

        inputs.forEach(input => input.addEventListener('input', save));

        // Render Tag Chips
        const renderTags = () => {
          tagsContainer.innerHTML = '';

          // 1. Default Tags
          defaultTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'hw-tag-chip';
            btn.textContent = '+ ' + tag;
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              insertTagText(tag);
            });
            tagsContainer.appendChild(btn);
          });

          // 2. Custom Tags (with delete 'x')
          customTags.forEach((tag, idx) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'inline-flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.borderRadius = '999px';
            wrapper.style.background = '#EBFBEE';
            wrapper.style.border = '1.5px solid #69DB7C';
            wrapper.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'hw-tag-chip';
            btn.style.background = 'transparent';
            btn.style.border = 'none';
            btn.style.color = '#2B8A3E';
            btn.style.paddingRight = '4px';
            btn.textContent = '+ ' + tag;
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              insertTagText(tag);
            });

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.innerHTML = '&times;';
            delBtn.title = '刪除此自訂詞庫';
            delBtn.style.cssText = 'background:none; border:none; color:#FA5252; font-size:1rem; font-weight:bold; cursor:pointer; padding:0 6px 0 0; line-height:1;';
            delBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              customTags.splice(idx, 1);
              localStorage.setItem('puti_hw_custom_tags', JSON.stringify(customTags));
              renderTags();
              window.soundEngine.playPop();
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(delBtn);
            tagsContainer.appendChild(wrapper);
          });
        };

        const insertTagText = (tag) => {
          const target = activeInput || memoIn;
          const curVal = target.value;
          const start = target.selectionStart ?? curVal.length;
          const end = target.selectionEnd ?? curVal.length;
          const needSpace = start > 0 && curVal[start - 1] !== ' ' && curVal[start - 1] !== '\n';
          const insertText = (needSpace ? ' ' : '') + tag + ' ';

          target.value = curVal.slice(0, start) + insertText + curVal.slice(end);
          target.focus();
          const newPos = start + insertText.length;
          target.setSelectionRange(newPos, newPos);

          save();
          window.soundEngine.playPop();
        };

        // Add Custom Tag button
        addTagBtn.addEventListener('click', () => {
          const input = prompt('請輸入要新增的快捷詞庫（例如：訂正國習、帶泳具、交牛奶費、交回條）：');
          if (input && input.trim()) {
            const cleanTag = input.trim();
            if (!customTags.includes(cleanTag) && !defaultTags.includes(cleanTag)) {
              customTags.push(cleanTag);
              localStorage.setItem('puti_hw_custom_tags', JSON.stringify(customTags));
              renderTags();
              window.soundEngine.playBell();
            }
          }
        });

        renderTags();

        // Font scaling
        const applyFontSize = () => {
          inputs.forEach(input => input.style.fontSize = fontSize + 'rem');
        };

        el.querySelector('#hw-font-plus').addEventListener('click', () => {
          fontSize = Math.min(1.8, fontSize + 0.15);
          applyFontSize();
        });
        el.querySelector('#hw-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.15);
          applyFontSize();
        });
        el.querySelector('#hw-font-reset').addEventListener('click', () => {
          fontSize = 1.05;
          applyFontSize();
        });

        // Copy to clipboard for Line
        copyBtn.addEventListener('click', () => {
          const text = `📋 【${dateStr} (${dayStr}) 聯絡簿】\n1. 國語：${chineseIn.value}\n2. 數學：${mathIn.value}\n3. 英語：${englishIn.value}\n4. 其他：${otherIn.value}\n🔔 提醒：${memoIn.value}`;
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已複製';
            window.soundEngine.playBell();
            setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> 複製'; }, 1800);
          });
        });
      }
    });
  },

  // =========================================================================
  // 2. 課堂搶答神器 (Classroom Quick Buzzer)
  // =========================================================================
  spawnBuzzer(wm) {
    let buzzerState = 'STANDBY'; // 'STANDBY' | 'ACTIVE' | 'LOCKED'
    let buzzStartTime = 0;
    let buzzHistory = [];
    let buzzFontSize = 1.0; // rem

    const teams = [
      { id: 1, name: '第一組', key: '1', color: '#E63946' },
      { id: 2, name: '第二組', key: '2', color: '#3A86FF' },
      { id: 3, name: '第三組', key: '3', color: '#2EC4B6' },
      { id: 4, name: '第四組', key: '4', color: '#FF9F1C' }
    ];

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const content = `
      <div class="buzzer-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Control Bar (Room Code + Font Scale) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 10px; border-radius: 10px; border: 1px solid #E9ECEF; flex-wrap: wrap; gap: 4px;">
          <!-- Room Code Info & Change Button -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 0.74rem; font-weight: 800; color: #495057;">
              <i class="fa-solid fa-tower-broadcast" style="color: #FF7B00;"></i> 教室代碼: <strong id="buzz-room-label" style="color: #E8590C; font-family: var(--font-num);">${getRoom()}</strong>
            </span>
            <button type="button" class="action-btn-secondary" id="buzz-change-room-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem;" title="更換教室房間代碼（全國各班獨立隔離，不互相干擾）">
              <i class="fa-solid fa-arrows-rotate"></i> 換代碼
            </button>
          </div>

          <!-- Font Scale Controls (使用者要求：字體放大功能) -->
          <div class="font-scale-controls" style="display: flex; gap: 3px; align-items: center;">
            <span style="font-size: 0.72rem; color: #718096; font-weight: bold;"><i class="fa-solid fa-text-height"></i> 字級:</span>
            <button type="button" class="font-scale-btn" id="buzz-font-minus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="縮小搶答字級">A-</button>
            <button type="button" class="font-scale-btn" id="buzz-font-reset" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="預設字級">A</button>
            <button type="button" class="font-scale-btn" id="buzz-font-plus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="放大搶答字級">A+</button>
          </div>
        </div>

        <!-- Status Banner -->
        <div class="buzzer-status-banner" id="buzz-banner" style="background: #FFF9DB; color: #D9480F; border: 1.5px solid #FFE066; border-radius: 12px; padding: 10px; text-align: center; font-weight: 800; font-size: 0.95rem; transition: all 0.2s ease;">
          ⏳ 搶答待機中！請老師點擊下方【開始搶答 🔥】（或按空白鍵）發布信號
        </div>

        <!-- 4 Teams On-Screen Quick Buzzer Grid (現場觸控 / 鍵盤 1~4 搶答) -->
        <div style="font-size: 0.72rem; font-weight: 800; color: #718096; display: flex; justify-content: space-between; align-items: center;">
          <span>👉 現場分組卡片搶答（開始後按 1 ~ 4 或觸控點擊；未開始前按將判定偷跑）：</span>
        </div>
        <div class="buzzer-teams-grid" id="buzz-teams-box" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 2px 0;">
          ${teams.map(t => `
            <div class="team-buzz-card" data-id="${t.id}" id="buzz-card-${t.id}" style="background: #FFF; border: 2px solid ${t.color}33; border-radius: 12px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.15s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
              <div class="team-buzz-icon" style="font-size: 1.8rem; color: ${t.color}; margin-bottom: 2px;"><i class="fa-solid fa-bell"></i></div>
              <div class="team-buzz-name" style="font-weight: 900; font-size: 0.95rem; color: #2D3748;">${t.name}</div>
              <div class="team-buzz-key-badge" style="font-size: 0.7rem; color: #718096; background: #F1F3F5; padding: 2px 6px; border-radius: 4px; margin-top: 4px; font-weight: bold;">[ 按鍵 ${t.key} ]</div>
            </div>
          `).join('')}
        </div>

        <!-- Live Online Student Buzzers List (線上學生手機搶答榜 Top 3) -->
        <div style="flex: 1; background: #FFFDF9; border: 1.5px solid #FFE8CC; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; overflow-y: auto;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #D9480F; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span><i class="fa-solid fa-trophy"></i> 線上即時搶答榜 (毫秒反應時間)：</span>
            <span style="font-size: 0.72rem; color: #718096;">全班平板/手機已連線</span>
          </div>
          <div id="buzz-history-list" style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
            <div style="text-align: center; color: #A0AEC0; font-size: 0.85rem; padding: 16px 0;">尚未有人搶答，點擊「開始搶答」發布訊號</div>
          </div>
        </div>

        <!-- Controls Toolbar -->
        <div style="display: flex; gap: 6px; width: 100%;">
          <button class="action-btn-main" id="buzz-start-btn" style="flex: 1.3; height: 38px; font-size: 0.92rem; background: linear-gradient(135deg, #2B8A3E, #20C997); font-weight: 900;">
            <i class="fa-solid fa-play"></i> 開始搶答 (Space)
          </button>
          <button class="action-btn-secondary" id="buzz-reset-btn" style="flex: 0.9; height: 38px; font-size: 0.88rem;">
            <i class="fa-solid fa-rotate-left"></i> 重置待機
          </button>
          <button class="action-btn-secondary" id="buzz-qr-btn" style="height: 38px; font-size: 0.82rem; padding: 0 12px;" title="放大手機搶答 QR Code">
            <i class="fa-solid fa-qrcode"></i> 手機掃碼
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂搶答神器',
      icon: 'fa-bell',
      iconColor: '#E63946',
      width: 500,
      height: 480,
      type: 'buzzer',
      contentHtml: content,
      onInit: (el) => {
        const banner = el.querySelector('#buzz-banner');
        const startBtn = el.querySelector('#buzz-start-btn');
        const resetBtn = el.querySelector('#buzz-reset-btn');
        const qrBtn = el.querySelector('#buzz-qr-btn');
        const cards = el.querySelectorAll('.team-buzz-card');
        const historyList = el.querySelector('#buzz-history-list');
        const roomLabel = el.querySelector('#buzz-room-label');
        const changeRoomBtn = el.querySelector('#buzz-change-room-btn');

        const fontPlusBtn = el.querySelector('#buzz-font-plus');
        const fontMinusBtn = el.querySelector('#buzz-font-minus');
        const fontResetBtn = el.querySelector('#buzz-font-reset');

        let room = getRoom();

        const applyFontSize = () => {
          banner.style.fontSize = (buzzFontSize * 0.95) + 'rem';
          el.querySelectorAll('.team-buzz-name').forEach(nameEl => {
            nameEl.style.fontSize = (buzzFontSize * 0.95) + 'rem';
          });
          el.querySelectorAll('.team-buzz-icon').forEach(iconEl => {
            iconEl.style.fontSize = (buzzFontSize * 1.8) + 'rem';
          });
          renderHistory();
        };

        fontPlusBtn.addEventListener('click', () => {
          buzzFontSize = Math.min(1.8, buzzFontSize + 0.15);
          applyFontSize();
          window.soundEngine.playTick();
        });
        fontMinusBtn.addEventListener('click', () => {
          buzzFontSize = Math.max(0.85, buzzFontSize - 0.15);
          applyFontSize();
          window.soundEngine.playTick();
        });
        fontResetBtn.addEventListener('click', () => {
          buzzFontSize = 1.0;
          applyFontSize();
          window.soundEngine.playPop();
        });

        // Change Room Code
        changeRoomBtn.addEventListener('click', () => {
          const newRoom = prompt('請輸入自訂教室代碼（例如：PUTI601、CLASS2）：', room);
          if (newRoom && newRoom.trim()) {
            room = newRoom.trim().toUpperCase();
            localStorage.setItem('puti_classroom_room', room);
            roomLabel.textContent = room;
            if (window.realtimeEngine) {
              window.realtimeEngine.room = room;
              window.realtimeEngine.initMqtt();
            }
            alert(`教室代碼已變更為【${room}】！學生重新掃碼即可連線。`);
          }
        });

        // Warn for false start (偷跑警告)
        const warnFalseStart = (culprit) => {
          banner.innerHTML = `⚠️ <strong>【${culprit}】偷跑違規！</strong>老師尚未發布「開始搶答」！`;
          banner.style.background = '#FFE3E3';
          banner.style.color = '#C92A2A';
          banner.style.borderColor = '#FFA8A8';
          banner.classList.add('animate-shake');
          setTimeout(() => banner.classList.remove('animate-shake'), 400);
          window.soundEngine.playTick();
        };

        const triggerWinner = (winnerTitle, reactionMs, seatNum = null) => {
          if (buzzerState !== 'ACTIVE') return;
          buzzerState = 'LOCKED';

          banner.innerHTML = `🎉 恭喜【<strong>${winnerTitle}</strong>】第一名搶得回答權！(${reactionMs}s)`;
          banner.style.background = '#EBFBEE';
          banner.style.color = '#2B8A3E';
          banner.style.borderColor = '#69DB7C';

          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 70 });

          // Broadcast to mobile devices
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', {
              type: 'BUZZER_WINNER',
              winner: winnerTitle,
              seat: seatNum
            });
          }
        };

        const renderHistory = () => {
          if (buzzHistory.length === 0) {
            historyList.innerHTML = '<div style="text-align: center; color: #A0AEC0; font-size: 0.85rem; padding: 16px 0;">尚未有人搶答，點擊「開始搶答」發布訊號</div>';
            return;
          }

          historyList.innerHTML = buzzHistory.map((h, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: ${idx === 0 ? '#FFE8CC' : '#FFF'}; border: 1px solid ${idx === 0 ? '#FF922B' : '#E9ECEF'}; padding: 6px 10px; border-radius: 8px;">
              <div style="font-weight: 800; font-size: ${buzzFontSize * 0.9}rem; color: #2D3748; display: flex; align-items: center; gap: 6px;">
                <span>${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                <span>${h.name}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: ${buzzFontSize * 0.85}rem; font-weight: 800; color: #E8590C; font-family: var(--font-num);">${h.reaction}s</span>
                <button type="button" class="buzz-award-btn" data-name="${h.name}" style="background: #2B8A3E; color: white; border: none; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: bold; cursor: pointer;" title="在個人計分器加 1 分">+1分</button>
              </div>
            </div>
          `).join('');

          // Bind award +1 score buttons
          historyList.querySelectorAll('.buzz-award-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const name = btn.getAttribute('data-name');
              const scores = JSON.parse(localStorage.getItem('puti_individual_scores') || '{}');
              scores[name] = (scores[name] || 0) + 1;
              localStorage.setItem('puti_individual_scores', JSON.stringify(scores));
              window.dispatchEvent(new CustomEvent('rosterUpdated'));
              btn.textContent = '已加分✔';
              btn.style.background = '#40C057';
              window.soundEngine.playBell();
            });
          });
        };

        const resetAll = () => {
          buzzerState = 'STANDBY';
          buzzStartTime = 0;
          buzzHistory = [];
          banner.innerHTML = '⏳ 搶答待機中！請老師點擊下方【開始搶答 🔥】（或按空白鍵）發布信號';
          banner.style.background = '#FFF9DB';
          banner.style.color = '#D9480F';
          banner.style.borderColor = '#FFE066';
          cards.forEach(c => {
            c.style.background = '#FFF';
            c.style.borderColor = '';
          });
          renderHistory();

          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', { type: 'BUZZER_STANDBY' });
          }
          window.soundEngine.playTick();
        };

        // Start Buzzer Round (老師發令解鎖)
        const startRound = () => {
          buzzerState = 'ACTIVE';
          buzzStartTime = Date.now();
          buzzHistory = [];
          banner.innerHTML = '🔥 搶答進行中！請立即按下卡片、鍵盤 1~4 或手機按鈕搶答！';
          banner.style.background = '#FFE3E3';
          banner.style.color = '#C92A2A';
          banner.style.borderColor = '#FFA8A8';
          cards.forEach(c => {
            c.style.background = '#FFFDF0';
          });
          renderHistory();

          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', { type: 'BUZZER_START' });
          }
          window.soundEngine.playPop();
        };

        startBtn.addEventListener('click', startRound);
        resetBtn.addEventListener('click', resetAll);

        // QR Code Big
        qrBtn.addEventListener('click', () => {
          const origin = window.location.origin;
          const buzzerUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/student-buzzer.html?room=' + room;
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📱 學生手機/平板即時搶答端', buzzerUrl, `全班拿出手機對準掃描 (教室代碼: ${room})，秒速搶答！`);
          }
        });

        // Click on team card
        cards.forEach(card => {
          card.addEventListener('click', () => {
            const teamId = card.dataset.id;
            const t = teams.find(item => item.id == teamId);
            if (!t) return;

            if (buzzerState === 'STANDBY') {
              warnFalseStart(t.name);
              return;
            }
            if (buzzerState !== 'ACTIVE') return;

            const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
            if (!buzzHistory.some(h => h.name === t.name)) {
              buzzHistory.push({ name: t.name, reaction: reaction });
              renderHistory();
            }
            triggerWinner(t.name, reaction);
          });
        });

        // Keyboard triggers: 1, 2, 3, 4 (主鍵盤與數字鍵盤皆支援) + Space to Start
        const keyHandler = (e) => {
          if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

          // Space key triggers Start Buzzer
          if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            if (buzzerState === 'STANDBY') {
              startRound();
            } else if (buzzerState === 'LOCKED') {
              resetAll();
            }
            return;
          }

          const keyMap = {
            '1': 1, 'Numpad1': 1,
            '2': 2, 'Numpad2': 2,
            '3': 3, 'Numpad3': 3,
            '4': 4, 'Numpad4': 4
          };
          const teamId = keyMap[e.key] || keyMap[e.code];
          if (teamId) {
            const t = teams.find(item => item.id == teamId);
            if (t) {
              const card = el.querySelector(`#buzz-card-${teamId}`);
              if (card) {
                card.style.transform = 'scale(0.92)';
                setTimeout(() => { if (card) card.style.transform = ''; }, 160);
              }

              if (buzzerState === 'STANDBY') {
                warnFalseStart(t.name);
                return;
              }
              if (buzzerState !== 'ACTIVE') return;

              const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
              if (!buzzHistory.some(h => h.name === t.name)) {
                buzzHistory.push({ name: t.name, reaction: reaction });
                renderHistory();
              }
              triggerWinner(t.name, reaction);
            }
          }
        };

        window.addEventListener('keydown', keyHandler);

        // Realtime Listener for Mobile Students
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('buzzer/buzz', (data) => {
            if (data.type === 'BUZZ_TRIGGERED') {
              if (buzzerState === 'STANDBY') {
                warnFalseStart(data.name);
                return;
              }
              if (buzzerState !== 'ACTIVE') return;

              const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
              if (!buzzHistory.some(h => h.name === data.name)) {
                buzzHistory.push({ name: data.name, reaction: reaction });
                renderHistory();
              }
              triggerWinner(data.name, reaction, data.seat);
            }
          });
        }
      },
      onClose: () => {
        // cleanup key handler if needed
      }
    });
  },
  spawnDice(wm) {
    let diceCount = 1;
    let mode = 'dice';

    const renderDiceHtml = (val) => {
      // Return realistic pip pattern
      const redClass = val === 1 ? 'red' : '';
      let pips = '';
      for (let i = 0; i < val; i++) pips += `<span class="pip ${redClass}"></span>`;
      return `<div class="die-face-3d die-pips-${val}">${pips}</div>`;
    };

    const content = `
      <div class="dice-container">
        <!-- Giant 3D Display Stage -->
        <div class="dice-display-area-giant" id="dice-stage">
          ${renderDiceHtml(5)}
        </div>

        <div style="font-size: 1.15rem; font-weight: 900; color: var(--text);" id="dice-sum-text">點數：5 點</div>

        <div style="display: flex; gap: 8px; width: 100%;">
          <button class="preset-chip active" id="btn-dice-1">1 顆</button>
          <button class="preset-chip" id="btn-dice-2">2 顆</button>
          <button class="preset-chip" id="btn-dice-3">3 顆</button>
          <button class="preset-chip" id="btn-dice-coin">🪙 3D 金幣</button>
        </div>

        <button class="action-btn-main" id="dice-roll-btn" style="height: 44px; font-size: 1.1rem;">
          <i class="fa-solid fa-dice-d6"></i> 擲骰子
        </button>
      </div>
    `;

    wm.createWindow({
      title: '3D 骰子與金幣',
      icon: 'fa-dice',
      iconColor: '#9A8CFF',
      width: 330,
      height: 360,
      type: 'dice',
      contentHtml: content,
      onInit: (el) => {
        const stage = el.querySelector('#dice-stage');
        const rollBtn = el.querySelector('#dice-roll-btn');
        const sumText = el.querySelector('#dice-sum-text');

        const updateDisplay = () => {
          stage.innerHTML = '';
          if (mode === 'coin') {
            stage.innerHTML = '<div class="gold-coin-3d" id="gold-coin">正</div>';
            sumText.textContent = '結果：正面';
            rollBtn.innerHTML = '<i class="fa-solid fa-coins"></i> 擲硬幣';
          } else {
            rollBtn.innerHTML = '<i class="fa-solid fa-dice-d6"></i> 擲骰子';
            let initialHtml = '';
            for (let i = 0; i < diceCount; i++) initialHtml += renderDiceHtml(5);
            stage.innerHTML = initialHtml;
            sumText.textContent = `點數：${diceCount * 5} 點`;
          }
        };

        const diceChips = [
          { el: el.querySelector('#btn-dice-1'), count: 1, m: 'dice' },
          { el: el.querySelector('#btn-dice-2'), count: 2, m: 'dice' },
          { el: el.querySelector('#btn-dice-3'), count: 3, m: 'dice' },
          { el: el.querySelector('#btn-dice-coin'), count: 1, m: 'coin' }
        ];
        diceChips.forEach(item => {
          item.el.addEventListener('click', () => {
            diceChips.forEach(c => c.el.classList.remove('active'));
            item.el.classList.add('active');
            mode = item.m;
            diceCount = item.count;
            updateDisplay();
            window.soundEngine.playPop();
          });
        });

        rollBtn.addEventListener('click', () => {
          window.soundEngine.playDiceRoll();

          if (mode === 'coin') {
            const coin = stage.querySelector('.gold-coin-3d');
            if (coin) coin.classList.add('flipping');
            let ticks = 0;
            const interval = setInterval(() => {
              if (coin) coin.textContent = Math.random() > 0.5 ? '正' : '反';
              ticks++;
              if (ticks >= 8) {
                clearInterval(interval);
                if (coin) coin.classList.remove('flipping');
                const res = Math.random() > 0.5 ? '正面' : '反面';
                if (coin) coin.textContent = res === '正面' ? '正' : '反';
                sumText.textContent = `結果：${res}`;
                window.soundEngine.playBell();
              }
            }, 60);
          } else {
            const faces = stage.querySelectorAll('.die-face-3d');
            faces.forEach(f => f.classList.add('rolling'));
            let ticks = 0;
            const interval = setInterval(() => {
              faces.forEach(f => {
                const rand = Math.floor(Math.random() * 6) + 1;
                f.className = `die-face-3d rolling die-pips-${rand}`;
                const red = rand === 1 ? 'red' : '';
                let p = '';
                for (let k = 0; k < rand; k++) p += `<span class="pip ${red}"></span>`;
                f.innerHTML = p;
              });
              ticks++;
              if (ticks >= 8) {
                clearInterval(interval);
                let sum = 0;
                faces.forEach(f => {
                  f.classList.remove('rolling');
                  const finalVal = Math.floor(Math.random() * 6) + 1;
                  sum += finalVal;
                  f.className = `die-face-3d die-pips-${finalVal}`;
                  const red = finalVal === 1 ? 'red' : '';
                  let p = '';
                  for (let k = 0; k < finalVal; k++) p += `<span class="pip ${red}"></span>`;
                  f.innerHTML = p;
                });
                sumText.textContent = `總點數：${sum} 點`;
                window.soundEngine.playBell();
              }
            }, 65);
          }
        });
      }
    });
  },

  // =========================================================================
  // 4. 課堂大公告板 (Announcement Board - 支援字級無級放大)
  // =========================================================================
  spawnAnnouncement(wm) {
    let fontSize = 1.1;

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-weight: 800; font-size: 1.15rem; color: var(--primary); display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-bullhorn"></i>
            <span contenteditable="true">📢 今日黑板公告與作業</span>
          </div>
          <div class="font-scale-controls">
            <button class="font-scale-btn" id="ann-font-minus" title="縮小字體">A-</button>
            <button class="font-scale-btn" id="ann-font-reset" title="重置字體">A</button>
            <button class="font-scale-btn" id="ann-font-plus" title="放大字體">A+</button>
          </div>
        </div>
        <textarea id="ann-textarea" style="flex: 1; border: 2px dashed var(--secondary); border-radius: var(--radius-sm); padding: 12px; font-family: var(--font-main); font-size: ${fontSize}rem; line-height: 1.8; background: #FFFDF9; outline: none; resize: none;"
          placeholder="1. 國語習作寫至第 45 頁&#10;2. 數學習作單元四練習&#10;3. 明天請攜帶彩色筆與剪刀"></textarea>
      </div>
    `;

    wm.createWindow({
      title: '課堂公告黑板',
      icon: 'fa-chalkboard',
      iconColor: '#2D3748',
      width: 440,
      height: 330,
      type: 'announcement',
      contentHtml: content,
      onInit: (el) => {
        const textarea = el.querySelector('#ann-textarea');
        el.querySelector('#ann-font-plus').addEventListener('click', () => {
          fontSize = Math.min(2.5, fontSize + 0.2);
          textarea.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#ann-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.2);
          textarea.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#ann-font-reset').addEventListener('click', () => {
          fontSize = 1.1;
          textarea.style.fontSize = fontSize + 'rem';
        });
      }
    });
  },

  // =========================================================================
  // 5. 課堂即時投票 (Poll - 支援大圖投影 QR Code)
  // =========================================================================
  spawnPoll(wm) {
    let currentIdx = 0;
    let isBlind = false;
    let pollFontSize = 1.0; // rem

    // Default question bank
    const defaultBank = [
      {
        question: "今日上課重點都聽懂了嗎？",
        options: ["😃 非常清楚 (聽懂了)", "😐 還好 (尚可理解)", "🙁 需加油 (還不太懂)"],
        votes: [0, 0, 0]
      },
      {
        question: "下列哪一項是正確的乘法交換律概念？",
        options: ["🅰️ a × b = b × a", "🅱️ (a + b) × c", "🅲️ a × (b × c)", "🅳️ a ÷ b = b ÷ a"],
        votes: [0, 0, 0, 0]
      },
      {
        question: "這週各組專案準備進行到哪個階段？",
        options: ["👍 資料蒐集齊全", "🏃 進行報告統整中", "💪 準備正式彩排", "🆘 需要老師指導"],
        votes: [0, 0, 0, 0]
      }
    ];

    // Load or initialize question bank from localStorage
    let questionBank = [];
    try {
      const savedBank = localStorage.getItem('puti_poll_question_bank');
      if (savedBank) {
        questionBank = JSON.parse(savedBank);
      }
    } catch (e) {}

    if (!questionBank || !Array.isArray(questionBank) || questionBank.length === 0) {
      questionBank = defaultBank;
      localStorage.setItem('puti_poll_question_bank', JSON.stringify(questionBank));
    }

    const saveBank = () => {
      localStorage.setItem('puti_poll_question_bank', JSON.stringify(questionBank));
    };

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const content = `
      <div class="poll-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Bar: Room Code & Question Nav & Font Size -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 10px; border-radius: 10px; border: 1px solid #E9ECEF; flex-wrap: wrap; gap: 4px;">
          <!-- Room Code Info & Change Button -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 0.74rem; font-weight: 800; color: #495057;">
              <i class="fa-solid fa-tower-broadcast" style="color: #4EA8DE;"></i> 教室代碼: <strong id="poll-room-label" style="color: #1971C2; font-family: var(--font-num);">${getRoom()}</strong>
            </span>
            <button type="button" class="action-btn-secondary" id="poll-change-room-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem;" title="更換教室房間代碼（全國各班獨立隔離，不互相干擾）">
              <i class="fa-solid fa-arrows-rotate"></i> 換代碼
            </button>
          </div>

          <!-- Font Scaling Controls -->
          <div class="font-scale-controls" style="display: flex; gap: 3px; align-items: center;">
            <span style="font-size: 0.72rem; color: #718096; font-weight: bold;"><i class="fa-solid fa-text-height"></i> 字級:</span>
            <button type="button" class="font-scale-btn" id="poll-font-minus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="縮小投票字級">A-</button>
            <button type="button" class="font-scale-btn" id="poll-font-reset" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="預設字級">A</button>
            <button type="button" class="font-scale-btn" id="poll-font-plus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="放大投票字級">A+</button>
          </div>
        </div>

        <!-- Question Navigation Bar (切換題目 / 題庫管理) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #EBF8FF; padding: 6px 10px; border-radius: 10px; border: 1.5px solid #BEE3F8; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" class="action-btn-secondary" id="poll-prev-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="上一題">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span id="poll-index-badge" style="font-size: 0.8rem; font-weight: 900; color: #2B6CB0; font-family: var(--font-num);">第 1 / 1 題</span>
            <button type="button" class="action-btn-secondary" id="poll-next-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="下一題">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div style="display: flex; gap: 4px;">
            <button type="button" class="action-btn-secondary" id="poll-add-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="新增題目">
              <i class="fa-solid fa-plus"></i> 新增題
            </button>
            <button type="button" class="action-btn-secondary" id="poll-bank-modal-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem; background: #3182CE; color: #FFF; border-color: #2B6CB0;" title="批次匯入/匯出題庫 (純文字或JSON)">
              <i class="fa-solid fa-file-import"></i> 題庫匯入/匯出
            </button>
          </div>
        </div>

        <!-- Question Input -->
        <input type="text" class="poll-question-input" id="poll-q-input" value="" placeholder="在此輸入投票題目..." style="width: 100%; padding: 8px 12px; font-size: 1.05rem; font-weight: 800; border: 2px solid #E2E8F0; border-radius: 10px; outline: none; background: #FFF;">

        <!-- Options Voting List -->
        <div class="poll-options-list" id="poll-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>

        <!-- Bottom Actions -->
        <div style="display: flex; gap: 6px; margin-top: 4px;">
          <button class="action-btn-main" id="poll-qr-big-btn" style="flex: 1.4; height: 36px; font-size: 0.84rem; background: linear-gradient(135deg, #1971C2, #4EA8DE);">
            <i class="fa-solid fa-expand"></i> 學生手機掃碼投票
          </button>
          <button class="action-btn-secondary" id="poll-blind-toggle-btn" style="height: 36px; font-size: 0.84rem; padding: 0 10px;" title="盲投模式 (隱藏長條圖)">
            <i class="fa-solid fa-eye-slash"></i> 盲投
          </button>
          <button class="action-btn-secondary" id="poll-reset-btn" style="height: 36px; font-size: 0.84rem; padding: 0 10px;" title="重置本題票數">
            <i class="fa-solid fa-rotate-left"></i> 重置票數
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂即時投票',
      icon: 'fa-square-poll-vertical',
      iconColor: '#4EA8DE',
      width: 480,
      height: 490,
      type: 'poll',
      contentHtml: content,
      onInit: (el) => {
        const qInput = el.querySelector('#poll-q-input');
        const listEl = el.querySelector('#poll-list');
        const resetBtn = el.querySelector('#poll-reset-btn');
        const qrBigBtn = el.querySelector('#poll-qr-big-btn');
        const blindToggleBtn = el.querySelector('#poll-blind-toggle-btn');
        const roomLabel = el.querySelector('#poll-room-label');
        const changeRoomBtn = el.querySelector('#poll-change-room-btn');

        const prevBtn = el.querySelector('#poll-prev-q-btn');
        const nextBtn = el.querySelector('#poll-next-q-btn');
        const idxBadge = el.querySelector('#poll-index-badge');
        const addQBtn = el.querySelector('#poll-add-q-btn');
        const bankModalBtn = el.querySelector('#poll-bank-modal-btn');

        const fontPlusBtn = el.querySelector('#poll-font-plus');
        const fontMinusBtn = el.querySelector('#poll-font-minus');
        const fontResetBtn = el.querySelector('#poll-font-reset');

        let room = getRoom();

        // Change Room Code
        changeRoomBtn.addEventListener('click', () => {
          const newRoom = prompt('請輸入自訂教室代碼（例如：PUTI601、CLASS2）：', room);
          if (newRoom && newRoom.trim()) {
            room = newRoom.trim().toUpperCase();
            localStorage.setItem('puti_classroom_room', room);
            roomLabel.textContent = room;
            if (window.realtimeEngine) {
              window.realtimeEngine.room = room;
              window.realtimeEngine.initMqtt();
            }
            alert(`教室代碼已變更為【${room}】！學生重新掃碼即可連線。`);
          }
        });

        const syncCurrentToBank = () => {
          if (!questionBank[currentIdx]) return;
          questionBank[currentIdx].question = qInput.value.trim();
          saveBank();
        };

        const broadcastPoll = () => {
          syncCurrentToBank();
          const cur = questionBank[currentIdx];
          if (!cur) return;
          const pollData = { question: cur.question, options: cur.options };
          localStorage.setItem('puti_active_poll', JSON.stringify(pollData));
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('poll/state', { type: 'POLL_SYNC', poll: pollData }, true);
          }
        };

        const render = () => {
          if (currentIdx >= questionBank.length) currentIdx = questionBank.length - 1;
          if (currentIdx < 0) currentIdx = 0;

          const cur = questionBank[currentIdx];
          if (!cur) return;

          idxBadge.textContent = `第 ${currentIdx + 1} / ${questionBank.length} 題`;
          qInput.value = cur.question;
          qInput.style.fontSize = (pollFontSize * 1.05) + 'rem';

          if (!cur.votes || cur.votes.length !== cur.options.length) {
            cur.votes = cur.options.map(() => 0);
          }

          const totalVotes = cur.votes.reduce((sum, v) => sum + v, 0);

          listEl.innerHTML = cur.options.map((opt, i) => {
            const count = cur.votes[i] || 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            return `
              <div class="poll-opt-row" style="background: #FFF; border: 1.5px solid #E9ECEF; border-radius: 12px; padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button type="button" class="poll-opt-btn" data-idx="${i}" style="border: none; background: none; font-weight: 800; font-size: ${pollFontSize}rem; color: #2D3748; cursor: pointer; text-align: left; padding: 0;">
                    ${opt}
                  </button>
                  <span style="color: #FF7B00; font-weight: 900; font-size: ${pollFontSize * 0.95}rem; font-family: var(--font-num);">
                    ${isBlind ? '🔒 盲投中' : `${count} 票 (${pct}%)`}
                  </span>
                </div>
                <div class="poll-bar-outer" style="height: 10px; background: #EDF2F7; border-radius: 999px; overflow: hidden; margin-top: 2px; ${isBlind ? 'opacity: 0.3;' : ''}">
                  <div class="poll-bar-fill" style="height: 100%; border-radius: 999px; width: ${isBlind ? '0%' : pct + '%'}; background: linear-gradient(90deg, #FF9F1C, #FF7B00); transition: width 0.4s ease;"></div>
                </div>
              </div>
            `;
          }).join('');

          // Bind click to manually cast vote on smartboard
          listEl.querySelectorAll('.poll-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = parseInt(btn.dataset.idx, 10);
              cur.votes[idx] = (cur.votes[idx] || 0) + 1;
              saveBank();
              window.soundEngine.playTick();
              render();
            });
          });
        };

        // Font scaling actions
        fontPlusBtn.addEventListener('click', () => {
          pollFontSize = Math.min(1.8, pollFontSize + 0.15);
          render();
          window.soundEngine.playTick();
        });
        fontMinusBtn.addEventListener('click', () => {
          pollFontSize = Math.max(0.85, pollFontSize - 0.15);
          render();
          window.soundEngine.playTick();
        });
        fontResetBtn.addEventListener('click', () => {
          pollFontSize = 1.0;
          render();
          window.soundEngine.playPop();
        });

        // Question navigation
        prevBtn.addEventListener('click', () => {
          if (currentIdx > 0) {
            currentIdx--;
            render();
            broadcastPoll();
            window.soundEngine.playPop();
          }
        });

        nextBtn.addEventListener('click', () => {
          if (currentIdx < questionBank.length - 1) {
            currentIdx++;
            render();
            broadcastPoll();
            window.soundEngine.playPop();
          }
        });

        addQBtn.addEventListener('click', () => {
          const qText = prompt('請輸入新題目名稱：', `課堂思考題 ${questionBank.length + 1}`);
          if (!qText || !qText.trim()) return;
          questionBank.push({
            question: qText.trim(),
            options: ['🅰️ 選項 A', '🅱️ 選項 B', '🅲️ 選項 C', '🅳️ 選項 D'],
            votes: [0, 0, 0, 0]
          });
          currentIdx = questionBank.length - 1;
          saveBank();
          render();
          broadcastPoll();
          window.soundEngine.playBell();
        });

        qInput.addEventListener('input', () => {
          syncCurrentToBank();
          broadcastPoll();
        });

        blindToggleBtn.addEventListener('click', () => {
          isBlind = !isBlind;
          blindToggleBtn.innerHTML = isBlind ? '<i class="fa-solid fa-eye"></i> 開箱' : '<i class="fa-solid fa-eye-slash"></i> 盲投';
          blindToggleBtn.style.color = isBlind ? '#E03131' : '#495057';
          if (!isBlind) {
            window.soundEngine.playFanfare();
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
          }
          render();
        });

        resetBtn.addEventListener('click', () => {
          const cur = questionBank[currentIdx];
          if (cur) {
            cur.votes = cur.options.map(() => 0);
            cur.voters = {};
            saveBank();
            render();
            if (window.realtimeEngine) {
              window.realtimeEngine.publish('poll/state', { type: 'POLL_RESET' });
            }
            window.soundEngine.playTick();
          }
        });

        qrBigBtn.addEventListener('click', () => {
          const origin = window.location.origin;
          const pollUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/student-poll.html?room=' + room;
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📊 學生手機/平板即時投票', pollUrl, `全班拿出手機對準掃描 (教室代碼: ${room})，投票即時同步大螢幕！`);
          }
        });

        // Question Bank Modal (純文字批次匯入 / JSON匯出匯入)
        bankModalBtn.addEventListener('click', () => {
          const modalBackdrop = document.createElement('div');
          modalBackdrop.className = 'modal-backdrop show'; modalBackdrop.style.display = 'flex'; modalBackdrop.style.opacity = '1';
          modalBackdrop.style.zIndex = '10006';

          modalBackdrop.innerHTML = `
            <div class="modal-box" style="max-width: 580px; width: 90%; background: #FFF; border-radius: 20px; padding: 22px; box-shadow: 0 20px 50px rgba(0,0,0,0.25); display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #EDF2F7; padding-bottom: 10px;">
                <h3 style="margin: 0; font-size: 1.2rem; font-weight: 900; color: #2D3748;"><i class="fa-solid fa-folder-open" style="color: #3182CE;"></i> 投票題庫管理與批次匯入</h3>
                <button type="button" id="modal-close-x" style="background: none; border: none; font-size: 1.2rem; color: #A0AEC0; cursor: pointer;">&times;</button>
              </div>

              <!-- Format Guide -->
              <div style="background: #EBF8FF; border: 1px solid #BEE3F8; border-radius: 10px; padding: 10px 12px; font-size: 0.8rem; color: #2B6CB0; line-height: 1.5;">
                <strong>💡 純文字匯入格式（一行一題，題目與選項用 <code>|</code> 隔開）：</strong><br>
                <code>地球自轉一圈需要多久？ | 12小時 | 24小時 | 365天</code><br>
                <code>下列何者不是哺乳類動物？ | 鯨魚 | 企鵝 | 蝙蝠 | 狗</code>
              </div>

              <!-- Textarea for Batch Text Import -->
              <textarea id="batch-text-input" rows="7" style="width: 100%; border: 2px solid #CBD5E0; border-radius: 10px; padding: 10px; font-size: 0.88rem; font-family: monospace; outline: none;" placeholder="在此貼上您的多道題目文字...">${questionBank.map(q => q.question + ' | ' + q.options.join(' | ')).join('\n')}</textarea>

              <!-- Actions: Batch Text Import, JSON Export, JSON Import -->
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="action-btn-main" id="btn-import-text" style="flex: 1.4; height: 36px; font-size: 0.84rem; background: #3182CE;">
                  <i class="fa-solid fa-file-import"></i> 解析並匯入文字題庫
                </button>
                <button type="button" class="action-btn-secondary" id="btn-export-json" style="flex: 1; height: 36px; font-size: 0.84rem;">
                  <i class="fa-solid fa-download"></i> 匯出 JSON
                </button>
                <label class="action-btn-secondary" style="flex: 1; height: 36px; font-size: 0.84rem; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; margin: 0;">
                  <i class="fa-solid fa-upload"></i> 匯入 JSON
                  <input type="file" id="json-file-input" accept=".json" style="display: none;">
                </label>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #EDF2F7; padding-top: 10px;">
                <button type="button" class="action-btn-secondary" id="btn-clear-bank" style="color: #E53E3E; border-color: #FEB2B2; height: 30px; font-size: 0.78rem;">
                  <i class="fa-solid fa-trash"></i> 重置回預設題庫
                </button>
                <button type="button" class="action-btn-secondary" id="modal-close-btn" style="height: 30px; font-size: 0.78rem; padding: 0 16px;">
                  關閉
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(modalBackdrop);

          const closeModal = () => modalBackdrop.remove();
          modalBackdrop.querySelector('#modal-close-x').addEventListener('click', closeModal);
          modalBackdrop.querySelector('#modal-close-btn').addEventListener('click', closeModal);

          // 1. Batch Text Import
          modalBackdrop.querySelector('#btn-import-text').addEventListener('click', () => {
            const raw = modalBackdrop.querySelector('#batch-text-input').value.trim();
            if (!raw) return alert('請先貼入文字題目！');

            const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const parsed = [];
            lines.forEach(line => {
              const parts = line.split('|').map(p => p.trim()).filter(p => p.length > 0);
              if (parts.length >= 2) {
                parsed.push({
                  question: parts[0],
                  options: parts.slice(1),
                  votes: parts.slice(1).map(() => 0)
                });
              }
            });

            if (parsed.length === 0) {
              return alert('解析失敗！請確保每行至少有題目與一個選項，並用「|」分隔。');
            }

            questionBank = parsed;
            currentIdx = 0;
            saveBank();
            render();
            broadcastPoll();
            window.soundEngine.playBell();
            closeModal();
            alert(`成功匯入 ${parsed.length} 道投票題目！`);
          });

          // 2. Export JSON
          modalBackdrop.querySelector('#btn-export-json').addEventListener('click', () => {
            const jsonStr = JSON.stringify(questionBank, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const dlAnchor = document.createElement('a');
            dlAnchor.href = url;
            dlAnchor.download = `puti-poll-bank-${new Date().toISOString().slice(0,10)}.json`;
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            setTimeout(() => {
              document.body.removeChild(dlAnchor);
              URL.revokeObjectURL(url);
            }, 100);
          });

          // 3. Import JSON
          modalBackdrop.querySelector('#json-file-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
              try {
                const imported = JSON.parse(evt.target.result);
                if (Array.isArray(imported) && imported.length > 0 && imported[0].question && imported[0].options) {
                  questionBank = imported;
                  currentIdx = 0;
                  saveBank();
                  render();
                  broadcastPoll();
                  window.soundEngine.playBell();
                  closeModal();
                  alert(`成功從 JSON 匯入 ${imported.length} 道題庫！`);
                } else {
                  alert('JSON 格式不符！請確保包含 question 與 options 陣列。');
                }
              } catch (err) {
                alert('JSON 解析失敗，請確認檔案格式是否正確。');
              }
            };
            reader.readAsText(file);
          });

          // 4. Reset to Default Bank
          modalBackdrop.querySelector('#btn-clear-bank').addEventListener('click', () => {
            if (confirm('確定要清除自訂題庫並恢復預設題庫嗎？')) {
              questionBank = defaultBank;
              currentIdx = 0;
              saveBank();
              render();
              broadcastPoll();
              window.soundEngine.playTick();
              closeModal();
            }
          });
        });

        // Realtime Listener for Mobile Students Voting with single-vote per student & vote revision
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('poll/vote', (data) => {
            if (data.type === 'VOTE_SUBMITTED') {
              const cur = questionBank[currentIdx];
              if (!cur || !cur.votes) return;
              if (!cur.voters) cur.voters = {};

              const vId = data.voterId;
              const newIdx = data.optionIndex;

              if (vId) {
                // If student has already voted this option, ignore duplicate
                if (cur.voters[vId] === newIdx) return;

                // If student is changing vote from previous option, decrement previous
                if (cur.voters[vId] !== undefined) {
                  const oldIdx = cur.voters[vId];
                  if (cur.votes[oldIdx] > 0) cur.votes[oldIdx]--;
                } else if (data.previousOptionIndex !== undefined && data.previousOptionIndex !== null) {
                  const oldIdx = data.previousOptionIndex;
                  if (cur.votes[oldIdx] > 0) cur.votes[oldIdx]--;
                }

                // Record new vote
                cur.voters[vId] = newIdx;
                cur.votes[newIdx] = (cur.votes[newIdx] || 0) + 1;
              } else {
                cur.votes[newIdx] = (cur.votes[newIdx] || 0) + 1;
              }

              saveBank();
              window.soundEngine.playPop();
              render();
            }
          });

          // Mobile device requesting initial poll state
          window.realtimeEngine.subscribe('poll/req', () => {
            broadcastPoll();
          });
        }

        render();
        broadcastPoll();
      }
    });
  },
  spawnStickyNote(wm) {
    const colors = [
      { name: 'yellow', bg: '#FFF9DB', border: '#FFE066' },
      { name: 'pink', bg: '#FFE3E8', border: '#FFA8BA' },
      { name: 'green', bg: '#EBFBEE', border: '#8CE99A' },
      { name: 'blue', bg: '#E7F5FF', border: '#74C0FC' }
    ];

    let fontSize = 1.15;

    const content = `
      <div class="sticky-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="sticky-palette-row">
            ${colors.map((c) => `
              <div class="sticky-color-btn" data-bg="${c.bg}" data-border="${c.border}" style="background: ${c.bg}; border-color: ${c.border};"></div>
            `).join('')}
          </div>
          <div class="font-scale-controls">
            <button class="font-scale-btn" id="stk-font-minus">A-</button>
            <button class="font-scale-btn" id="stk-font-reset">A</button>
            <button class="font-scale-btn" id="stk-font-plus">A+</button>
          </div>
        </div>
        <textarea class="sticky-textarea" id="stk-text" placeholder="在此輸入課堂重要提醒或備忘..."></textarea>
      </div>
    `;

    wm.createWindow({
      title: '課堂隨手便利貼',
      icon: 'fa-note-sticky',
      iconColor: '#FFA502',
      width: 290,
      height: 250,
      type: 'sticky',
      contentHtml: content,
      onInit: (el) => {
        const colorBtns = el.querySelectorAll('.sticky-color-btn');
        const text = el.querySelector('#stk-text');

        colorBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            el.style.background = btn.dataset.bg;
            el.style.borderColor = btn.dataset.border;
          });
        });
        el.style.background = colors[0].bg;
        el.style.borderColor = colors[0].border;

        el.querySelector('#stk-font-plus').addEventListener('click', () => {
          fontSize = Math.min(2.2, fontSize + 0.2);
          text.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#stk-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.2);
          text.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#stk-font-reset').addEventListener('click', () => {
          fontSize = 1.15;
          text.style.fontSize = fontSize + 'rem';
        });
      }
    });
  },

  // =========================================================================
  // 其餘經典 22 種工具保持健壯完整運作
  // =========================================================================
  spawnClock(wm) {
    const content = `
      <div class="clock-container">
        <div class="clock-time" id="clk-time">12:00:00</div>
        <div class="clock-date" id="clk-date">2026 年 10 月 26 日</div>
        <div class="clock-extra" id="clk-day">星期一 · 把握當下</div>
      </div>
    `;
    wm.createWindow({
      title: '課堂時鐘',
      icon: 'fa-clock',
      iconColor: '#4EA8DE',
      width: 290,
      height: 200,
      type: 'clock',
      contentHtml: content,
      onInit: (el) => {
        const timeEl = el.querySelector('#clk-time');
        const dateEl = el.querySelector('#clk-date');
        const dayEl = el.querySelector('#clk-day');
        const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const update = () => {
          const now = new Date();
          timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
          dateEl.textContent = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
          dayEl.textContent = `${days[now.getDay()]} · 把握當下`;
        };
        update();
        setInterval(update, 1000);
      }
    });
  },

  spawnCalendar(wm) {
    let now = new Date();
    let viewYear = now.getFullYear();
    let viewMonth = now.getMonth();

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Calendar Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 8px; border-radius: 10px; border: 1px solid #E9ECEF;">
          <button type="button" class="action-btn-secondary" id="cal-prev-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="上個月">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span id="cal-title" style="font-weight: 800; font-size: 0.95rem; color: #2D3748;"></span>
            <button type="button" class="action-btn-secondary" id="cal-today-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem; font-weight: 800; color: #3A86FF;" title="跳回今天">今天</button>
          </div>
          <button type="button" class="action-btn-secondary" id="cal-next-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="下個月">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <!-- Weekdays Header -->
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; font-weight: 800; font-size: 0.78rem; color: var(--text-muted); text-align: center;">
          <span style="color: #FA5252;">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span style="color: #228BE6;">六</span>
        </div>

        <!-- Days Grid -->
        <div id="cal-days-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; flex: 1;"></div>
      </div>
    `;

    wm.createWindow({
      title: '課堂日曆',
      icon: 'fa-calendar-days',
      iconColor: '#3A86FF',
      width: 310,
      height: 310,
      type: 'calendar',
      contentHtml: content,
      onInit: (el) => {
        const titleEl = el.querySelector('#cal-title');
        const gridEl = el.querySelector('#cal-days-grid');
        const prevBtn = el.querySelector('#cal-prev-btn');
        const nextBtn = el.querySelector('#cal-next-btn');
        const todayBtn = el.querySelector('#cal-today-btn');

        const renderCalendar = () => {
          titleEl.textContent = `${viewYear} 年 ${viewMonth + 1} 月`;
          const firstDay = new Date(viewYear, viewMonth, 1).getDay();
          const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
          const realToday = new Date();
          const isCurrentMonth = realToday.getFullYear() === viewYear && realToday.getMonth() === viewMonth;
          const todayDate = realToday.getDate();

          let daysHtml = '';
          for (let i = 0; i < firstDay; i++) {
            daysHtml += `<div style="text-align: center; color: #CBD5E1; padding: 6px;"></div>`;
          }
          for (let d = 1; d <= daysInMonth; d++) {
            const isToday = isCurrentMonth && d === todayDate;
            daysHtml += `
              <div style="display: flex; align-items: center; justify-content: center; height: 32px; font-weight: 800; font-size: 0.88rem; font-family: var(--font-num); font-variant-numeric: tabular-nums; cursor: pointer; border-radius: 8px; transition: background 0.15s ease; ${isToday ? 'background: linear-gradient(135deg, #FF9F1C, #FF7B00); color: #FFF; box-shadow: 0 2px 6px rgba(255,159,28,0.4);' : 'color: var(--text);'}">
                ${d}
              </div>
            `;
          }
          gridEl.innerHTML = daysHtml;
        };

        prevBtn.addEventListener('click', () => {
          viewMonth--;
          if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
          }
          renderCalendar();
          window.soundEngine.playTick();
        });

        nextBtn.addEventListener('click', () => {
          viewMonth++;
          if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
          }
          renderCalendar();
          window.soundEngine.playTick();
        });

        todayBtn.addEventListener('click', () => {
          const t = new Date();
          viewYear = t.getFullYear();
          viewMonth = t.getMonth();
          renderCalendar();
          window.soundEngine.playPop();
        });

        renderCalendar();
      }
    });
  },

  spawnTimer(wm) {
    let totalSeconds = 300, remainingSeconds = 300, timerInterval = null, isRunning = false;
    const radius = 68, circumference = 2 * Math.PI * radius;
    const content = `
      <div class="timer-container">
        <div class="timer-circle-wrap">
          <svg class="timer-svg" viewBox="0 0 170 170">
            <circle class="timer-bg-circle" cx="85" cy="85" r="${radius}"></circle>
            <circle class="timer-progress-circle" id="t-prog" cx="85" cy="85" r="${radius}" stroke-dasharray="${circumference}" stroke-dashoffset="0"></circle>
          </svg>
          <div class="timer-digits-overlay">
            <div class="timer-digits" id="t-digits">05:00</div>
            <div class="timer-millis" id="t-sub">5 分鐘</div>
          </div>
        </div>
        <div class="timer-preset-row" id="t-presets">
          <button class="preset-chip" data-sec="30">+30秒</button>
          <button class="preset-chip" data-sec="60">+1分</button>
          <button class="preset-chip" data-sec="180">+3分</button>
          <button class="preset-chip" data-sec="300">+5分</button>
          <button class="preset-chip" data-sec="600">+10分</button>
        </div>
        <div class="timer-controls-row">
          <button class="action-btn-main" id="t-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="t-reset-btn" title="重置"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂計時器',
      icon: 'fa-hourglass-half',
      iconColor: '#FF6B6B',
      width: 320,
      height: 390,
      type: 'timer',
      contentHtml: content,
      onInit: (el) => {
        const digitsEl = el.querySelector('#t-digits');
        const subEl = el.querySelector('#t-sub');
        const progCircle = el.querySelector('#t-prog');
        const startBtn = el.querySelector('#t-start-btn');
        const resetBtn = el.querySelector('#t-reset-btn');
        const presetsRow = el.querySelector('#t-presets');

        const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
        const render = () => {
          digitsEl.textContent = formatTime(remainingSeconds);
          subEl.textContent = `${Math.ceil(remainingSeconds / 60)} 分鐘`;
          const percent = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
          progCircle.style.strokeDashoffset = circumference * (1 - percent);
          progCircle.style.stroke = remainingSeconds <= 10 ? '#FF4757' : '#FF9F1C';
        };

        const stop = () => {
          if (timerInterval) clearInterval(timerInterval);
          timerInterval = null; isRunning = false;
          startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始';
          startBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)';
        };

        startBtn.addEventListener('click', () => {
          if (isRunning) { stop(); return; }
          isRunning = true;
          startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
          startBtn.style.background = 'linear-gradient(135deg, #2EC4B6, #20A498)';
          timerInterval = setInterval(() => {
            if (remainingSeconds > 0) {
              remainingSeconds--; render();
            } else {
              stop(); window.soundEngine.playChime();
              if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 70 });
            }
          }, 1000);
        });

        resetBtn.addEventListener('click', () => { stop(); remainingSeconds = totalSeconds; render(); window.soundEngine.playTick(); });
        presetsRow.querySelectorAll('.preset-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            totalSeconds = remainingSeconds + parseInt(chip.dataset.sec, 10);
            remainingSeconds = totalSeconds; render(); window.soundEngine.playTick();
          });
        });
        render();
      },
      onClose: () => { if (timerInterval) clearInterval(timerInterval); }
    });
  },

  spawnVisualTimer(wm) {
    let totalSec = 180, remainSec = 180, timerId = null, running = false;
    const content = `
      <div class="visual-timer-container">
        <div class="visual-pie-wrap"><canvas id="vt-canvas" width="300" height="300"></canvas></div>
        <div style="font-family: var(--font-num); font-size: 2.2rem; font-weight: 800; color: var(--text);" id="vt-digits">03:00</div>
        <div class="timer-preset-row">
          <button class="preset-chip" data-sec="60">1分</button>
          <button class="preset-chip" data-sec="180">3分</button>
          <button class="preset-chip" data-sec="300">5分</button>
          <button class="preset-chip" data-sec="600">10分</button>
        </div>
        <div class="timer-controls-row">
          <button class="action-btn-main" id="vt-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="vt-reset-btn"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '視覺計時器',
      icon: 'fa-chart-pie',
      iconColor: '#FF9F1C',
      width: 310,
      height: 380,
      type: 'visual-timer',
      contentHtml: content,
      onInit: (el) => {
        const canvas = el.querySelector('#vt-canvas'), ctx = canvas.getContext('2d'), digitsEl = el.querySelector('#vt-digits'), startBtn = el.querySelector('#vt-start-btn'), resetBtn = el.querySelector('#vt-reset-btn');
        const drawPie = () => {
          const w = canvas.width, h = canvas.height, cx = w/2, cy = h/2, r = cx - 12;
          ctx.clearRect(0,0,w,h);
          ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle = '#F5F1E9'; ctx.fill();
          const frac = totalSec > 0 ? remainSec / totalSec : 0;
          ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2 + frac*Math.PI*2); ctx.closePath();
          ctx.fillStyle = frac <= 0.25 ? '#FF4757' : (frac <= 0.5 ? '#FFA502' : '#52B788'); ctx.fill();
          ctx.beginPath(); ctx.arc(cx,cy,14,0,Math.PI*2); ctx.fillStyle = '#FFF'; ctx.fill();
          digitsEl.textContent = `${String(Math.floor(remainSec/60)).padStart(2,'0')}:${String(remainSec%60).padStart(2,'0')}`;
        };
        const stop = () => { if (timerId) clearInterval(timerId); timerId = null; running = false; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始'; };
        startBtn.addEventListener('click', () => {
          if (running) { stop(); return; }
          running = true; startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
          timerId = setInterval(() => {
            if (remainSec > 0) { remainSec--; drawPie(); }
            else { stop(); window.soundEngine.playChime(); if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 80 }); }
          }, 1000);
        });
        resetBtn.addEventListener('click', () => { stop(); remainSec = totalSec; drawPie(); window.soundEngine.playTick(); });
        el.querySelectorAll('.preset-chip').forEach(c => c.addEventListener('click', () => { stop(); totalSec = parseInt(c.dataset.sec, 10); remainSec = totalSec; drawPie(); }));
        drawPie();
      },
      onClose: () => { if (timerId) clearInterval(timerId); }
    });
  },

  spawnStopwatch(wm) {
    let elapsedMs = 0, timerId = null, running = false, laps = [];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px; justify-content: space-between;">
        <div style="font-family: var(--font-num); font-size: 3rem; font-weight: 800; text-align: center; color: var(--primary);" id="sw-digits">00:00.0</div>
        <div style="flex: 1; overflow-y: auto; background: #FAF8F5; border-radius: var(--radius-sm); padding: 8px;" id="sw-laps"><div style="color: #A0AEC0; font-size: 0.8rem; text-align: center;">尚未有計圈紀錄</div></div>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn-main" id="sw-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="sw-lap-btn" title="計圈"><i class="fa-solid fa-flag"></i></button>
          <button class="action-btn-secondary" id="sw-reset-btn" title="重置"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '競賽碼錶', icon: 'fa-stopwatch', iconColor: '#2EC4B6', width: 300, height: 280, type: 'stopwatch', contentHtml: content,
      onInit: (el) => {
        const digits = el.querySelector('#sw-digits'), lapsEl = el.querySelector('#sw-laps'), startBtn = el.querySelector('#sw-start-btn'), lapBtn = el.querySelector('#sw-lap-btn'), resetBtn = el.querySelector('#sw-reset-btn');
        let lastTime = Date.now();
        const updateDisplay = () => {
          const s = Math.floor(elapsedMs / 1000);
          digits.textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}.${Math.floor((elapsedMs%1000)/100)}`;
        };
        startBtn.addEventListener('click', () => {
          if (running) { clearInterval(timerId); running = false; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 繼續'; }
          else {
            running = true; lastTime = Date.now(); startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
            timerId = setInterval(() => { const now = Date.now(); elapsedMs += (now - lastTime); lastTime = now; updateDisplay(); }, 80);
          }
        });
        lapBtn.addEventListener('click', () => {
          if (elapsedMs === 0) return;
          laps.push(digits.textContent);
          lapsEl.innerHTML = laps.map((l, i) => `<div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; padding:2px 4px;"><span>第 ${i+1} 圈</span><span style="color:var(--primary);">${l}</span></div>`).reverse().join('');
        });
        resetBtn.addEventListener('click', () => { clearInterval(timerId); running = false; elapsedMs = 0; laps = []; updateDisplay(); lapsEl.innerHTML = '<div style="color:#A0AEC0; font-size:0.8rem; text-align:center;">尚未有計圈紀錄</div>'; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始'; });
      },
      onClose: () => { if (timerId) clearInterval(timerId); }
    });
  },

  spawnAgenda(wm) {
    const defaultItems = ['1. 暖身複習與今日目標', '2. 教師核心觀念講解', '3. 小組任務合作探究', '4. 各組代表上台分享', '5. 總結評量與聯絡簿'];
    let fontSize = 0.9;
    const content = `
      <div class="agenda-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 0.88rem; color: #52B788;">課堂任務檢核表</span>
          <div class="font-scale-controls">
            <button class="font-scale-btn" id="ag-font-minus">A-</button>
            <button class="font-scale-btn" id="ag-font-reset">A</button>
            <button class="font-scale-btn" id="ag-font-plus">A+</button>
          </div>
        </div>
        <div class="agenda-list" id="agenda-items-box">
          ${defaultItems.map(item => `
            <div class="agenda-item">
              <input type="checkbox" class="agenda-checkbox">
              <span class="agenda-text" contenteditable="true" style="font-size: ${fontSize}rem;">${item}</span>
            </div>
          `).join('')}
        </div>
        <button class="action-btn-secondary" id="agenda-add-btn" style="height: 34px; font-size: 0.82rem;">
          <i class="fa-solid fa-plus"></i> 新增步驟
        </button>
      </div>
    `;
    wm.createWindow({
      title: '作息流程表', icon: 'fa-list-check', iconColor: '#52B788', width: 340, height: 330, type: 'agenda', contentHtml: content,
      onInit: (el) => {
        const box = el.querySelector('#agenda-items-box'), addBtn = el.querySelector('#agenda-add-btn');
        box.addEventListener('change', (e) => {
          if (e.target.classList.contains('agenda-checkbox')) {
            const item = e.target.closest('.agenda-item');
            if (e.target.checked) { item.classList.add('done'); window.soundEngine.playTick(); } else item.classList.remove('done');
          }
        });
        addBtn.addEventListener('click', () => {
          const count = box.querySelectorAll('.agenda-item').length + 1;
          const div = document.createElement('div'); div.className = 'agenda-item';
          div.innerHTML = `<input type="checkbox" class="agenda-checkbox"><span class="agenda-text" contenteditable="true" style="font-size: ${fontSize}rem;">${count}. 新增課堂任務步驟</span>`;
          box.appendChild(div);
        });
        el.querySelector('#ag-font-plus').addEventListener('click', () => {
          fontSize = Math.min(1.8, fontSize + 0.15);
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
        });
        el.querySelector('#ag-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.75, fontSize - 0.15);
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
        });
        el.querySelector('#ag-font-reset').addEventListener('click', () => {
          fontSize = 0.9;
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
        });
      }
    });
  },

  spawnTrafficLight(wm) {
    const content = `
      <div class="traffic-light-container" id="tl-box">
        <div class="traffic-box">
          <div class="traffic-lamp red on" data-state="red" title="安靜專注"></div>
          <div class="traffic-lamp yellow" data-state="yellow" title="準備收尾"></div>
          <div class="traffic-lamp green" data-state="green" title="自由討論"></div>
        </div>
        <div class="traffic-status-text" id="tl-status">🤫 安靜專注時間</div>
        <button class="action-btn-secondary" id="tl-orient-btn" style="height: 32px; padding: 0 12px; font-size: 0.78rem;">
          <i class="fa-solid fa-rotate"></i> 切換橫向/直向
        </button>
      </div>
    `;
    wm.createWindow({
      title: '班級紅綠燈', icon: 'fa-traffic-light', iconColor: '#FF4757', width: 280, height: 380, type: 'traffic-light', contentHtml: content,
      onInit: (el) => {
        const lamps = el.querySelectorAll('.traffic-lamp'), statusEl = el.querySelector('#tl-status'), container = el.querySelector('#tl-box'), orientBtn = el.querySelector('#tl-orient-btn');
        const stateInfo = { red: { text: '🤫 安靜專注時間', color: '#FF4757' }, yellow: { text: '⚠️ 準備總結收尾', color: '#FFA502' }, green: { text: '🟢 自由討論與發言', color: '#2ED573' } };
        lamps.forEach(lamp => {
          lamp.addEventListener('click', () => {
            lamps.forEach(l => l.classList.remove('on'));
            lamp.classList.add('on');
            statusEl.textContent = stateInfo[lamp.dataset.state].text;
            statusEl.style.color = stateInfo[lamp.dataset.state].color;
            window.soundEngine.playBell();
          });
        });
        orientBtn.addEventListener('click', () => {
          container.classList.toggle('horizontal');
          el.style.width = container.classList.contains('horizontal') ? '380px' : '280px';
          el.style.height = container.classList.contains('horizontal') ? '270px' : '380px';
        });
      }
    });
  },

  spawnWorkSymbols(wm) {
    const symbols = [
      { id: 'silent', icon: '🤫', name: '保持安靜', desc: '獨立自主專注思考' },
      { id: 'whisper', icon: '👂', name: '輕聲細語', desc: '相鄰同學悄悄交換意見' },
      { id: 'group', icon: '🤝', name: '小組合作', desc: '組內熱烈協作討論' },
      { id: 'class', icon: '📢', name: '全班發言', desc: '面向大家發表觀點' }
    ];
    const content = `
      <div class="work-symbols-container">
        <div class="symbol-grid">
          ${symbols.map((s, idx) => `
            <div class="symbol-card ${idx === 0 ? 'active' : ''}" data-id="${s.id}">
              <div class="symbol-icon-wrapper">${s.icon}</div>
              <div class="symbol-name">${s.name}</div>
              <div class="symbol-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂工作符號', icon: 'fa-icons', iconColor: '#9A8CFF', width: 330, height: 310, type: 'work-symbols', contentHtml: content,
      onInit: (el) => {
        el.querySelectorAll('.symbol-card').forEach(card => card.addEventListener('click', () => {
          el.querySelectorAll('.symbol-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active'); window.soundEngine.playTick();
        }));
      }
    });
  },

  spawnSoundMeter(wm) {
    let audioStream = null, audioContext = null, analyser = null, animFrame = null, threshold = 65, isWarning = false;
    const content = `
      <div class="sound-container">
        <div class="sound-status-display"><i class="fa-solid fa-microphone-lines" style="color: var(--primary);"></i><span id="sm-level-text">分貝監測：未啟動</span></div>
        <div class="sound-meter-bar-outer"><div class="sound-meter-bar-fill" id="sm-fill"></div><div class="sound-threshold-marker" id="sm-threshold" style="left: 65%;"></div></div>
        <div class="sound-warning-badge" id="sm-badge">🚨 警告：音量過大！請輕聲細語！</div>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 0.8rem;">
          <span>靈敏度閥值: <b id="sm-threshold-val">65%</b></span>
          <input type="range" id="sm-slider" min="30" max="95" value="65" style="width: 130px; cursor: pointer;">
        </div>
        <button class="action-btn-main" id="sm-toggle-btn"><i class="fa-solid fa-play"></i> 開啟麥克風監測</button>
      </div>
    `;
    wm.createWindow({
      title: '教室音量監測儀', icon: 'fa-volume-high', iconColor: '#2ED573', width: 320, height: 290, type: 'sound-meter', contentHtml: content,
      onInit: (el) => {
        const toggleBtn = el.querySelector('#sm-toggle-btn'), fillEl = el.querySelector('#sm-fill'), levelText = el.querySelector('#sm-level-text'), badge = el.querySelector('#sm-badge'), slider = el.querySelector('#sm-slider'), thresholdVal = el.querySelector('#sm-threshold-val'), marker = el.querySelector('#sm-threshold');
        slider.addEventListener('input', (e) => { threshold = parseInt(e.target.value, 10); thresholdVal.textContent = threshold + '%'; marker.style.left = threshold + '%'; });
        const stopListening = () => {
          if (animFrame) cancelAnimationFrame(animFrame);
          if (audioStream) { audioStream.getTracks().forEach(t => t.stop()); audioStream = null; }
          if (audioContext) { audioContext.close(); audioContext = null; }
          fillEl.style.width = '0%'; levelText.textContent = '監測已停止'; badge.style.display = 'none';
          toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開啟麥克風監測'; toggleBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)';
        };
        const startListening = async () => {
          try {
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser(); analyser.fftSize = 256;
            audioContext.createMediaStreamSource(audioStream).connect(analyser);
            toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> 停止監測'; toggleBtn.style.background = 'linear-gradient(135deg, #FF4757, #E84118)';
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const loop = () => {
              analyser.getByteFrequencyData(dataArray);
              let sum = 0; for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
              const percent = Math.min(100, Math.round(((sum / dataArray.length) / 128) * 100));
              fillEl.style.width = percent + '%'; levelText.textContent = `即時音量：${percent}%`;
              if (percent > threshold) { if (!isWarning) { isWarning = true; badge.style.display = 'block'; window.soundEngine.playWarningBuzz(); } } else { isWarning = false; badge.style.display = 'none'; }
              animFrame = requestAnimationFrame(loop);
            };
            loop();
          } catch(err) { alert('⚠️ 無法存取麥克風！請確認瀏覽器網址列已允許麥克風權限，或檢查設備是否已連接收音麥克風。'); stopListening(); }
        };
        toggleBtn.addEventListener('click', () => { if (audioStream) stopListening(); else startListening(); });
      },
      onClose: () => { if (animFrame) cancelAnimationFrame(animFrame); if (audioStream) audioStream.getTracks().forEach(t => t.stop()); if (audioContext) audioContext.close(); }
    });
  },

  spawnScoreboard(wm) {
    let teams = [{ name: '第一組', score: 0 }, { name: '第二組', score: 0 }, { name: '第三組', score: 0 }, { name: '第四組', score: 0 }];
    const content = `
      <div class="scoreboard-container">
        <div class="scoreboard-teams-grid" id="sb-grid"></div>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn-secondary" id="sb-add-team" style="flex: 1; height: 34px; font-size: 0.82rem;"><i class="fa-solid fa-plus"></i> 新增組別</button>
          <button class="action-btn-secondary" id="sb-reset-scores" style="height: 34px; font-size: 0.82rem;" title="比分歸零"><i class="fa-solid fa-rotate-left"></i> 歸零</button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '小組記分板', icon: 'fa-trophy', iconColor: '#FFA502', width: 440, height: 290, type: 'scoreboard', contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#sb-grid'), addBtn = el.querySelector('#sb-add-team'), resetBtn = el.querySelector('#sb-reset-scores');
        const render = () => {
          const maxScore = Math.max(...teams.map(t => t.score));
          grid.innerHTML = teams.map((t, idx) => `
            <div class="team-score-card ${t.score > 0 && t.score === maxScore ? 'leading' : ''}">
              <div class="team-name" contenteditable="true" data-idx="${idx}">${t.name}</div>
              <div class="team-points">${t.score}</div>
              <div class="team-ctrl-row"><button class="point-btn" data-action="minus" data-idx="${idx}">-</button><button class="point-btn" data-action="plus" data-idx="${idx}">+</button></div>
            </div>
          `).join('');
        };
        grid.addEventListener('click', (e) => {
          const btn = e.target.closest('.point-btn'); if (!btn) return;
          const idx = parseInt(btn.dataset.idx, 10);
          if (btn.dataset.action === 'plus') { teams[idx].score++; window.soundEngine.playBell(); }
          else { teams[idx].score = Math.max(0, teams[idx].score - 1); window.soundEngine.playTick(); }
          render();
        });
        grid.addEventListener('blur', (e) => { if (e.target.classList.contains('team-name')) teams[parseInt(e.target.dataset.idx, 10)].name = e.target.textContent.trim(); }, true);
        addBtn.addEventListener('click', () => { teams.push({ name: `第${teams.length + 1}組`, score: 0 }); render(); });
        resetBtn.addEventListener('click', () => { if (confirm('確定歸零？')) { teams.forEach(t => t.score = 0); render(); } });
        render();
      }
    });
  },

  spawnPicker(wm) {
    let pool = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號`);
    let drawn = [], isRolling = false, antiRepeat = true;

    const content = `
      <div class="picker-container">
        <div class="picker-display"><div class="picker-result" id="picker-result">點擊抽籤</div><div class="picker-subtext" id="picker-pool-count">待選名額：剩餘 ${pool.length} 位</div></div>
        <div class="picker-options-row">
          <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem;"><input type="checkbox" id="picker-no-repeat" checked> 不重複抽選</label>
          <div class="picker-history-badge">已抽 <span id="picker-drawn-count">0</span> 人</div>
        </div>
        <div class="picker-btn-grid">
          <button class="action-btn-main" id="picker-roll-btn"><i class="fa-solid fa-dice"></i> 開始抽</button>
          <button class="action-btn-secondary" id="picker-config-btn" title="編輯學生名單（一行一個）"><i class="fa-solid fa-users-line"></i> 名單</button>
          <button class="action-btn-secondary" id="picker-reset-btn" title="重設抽取進度"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '隨機抽籤', icon: 'fa-bullseye', iconColor: '#FF9F1C', width: 340, height: 320, type: 'picker', contentHtml: content,
      onInit: (el) => {
        const resultEl = el.querySelector('#picker-result'), poolCountEl = el.querySelector('#picker-pool-count'), rollBtn = el.querySelector('#picker-roll-btn'), configBtn = el.querySelector('#picker-config-btn'), resetBtn = el.querySelector('#picker-reset-btn'), noRepeatCheckbox = el.querySelector('#picker-no-repeat'), drawnCountEl = el.querySelector('#picker-drawn-count');
        const updateStatus = () => {
          const available = antiRepeat ? pool.filter(i => !drawn.includes(i)) : pool;
          poolCountEl.textContent = `待選名額：剩餘 ${available.length} 位`;
          drawnCountEl.textContent = drawn.length;
        };
        noRepeatCheckbox.addEventListener('change', (e) => { antiRepeat = e.target.checked; updateStatus(); });
        resetBtn.addEventListener('click', () => { drawn = []; resultEl.textContent = '準備就緒'; updateStatus(); window.soundEngine.playTick(); });
        
        const onGlobalRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            pool = [...e.detail];
            drawn = [];
            resultEl.textContent = '共用名單已同步';
            updateStatus();
          }
        };
        window.addEventListener('rosterUpdated', onGlobalRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(pool, (newList) => {
              pool = newList;
              drawn = [];
              resultEl.textContent = '名單已更新';
              updateStatus();
            });
          }
        });

        rollBtn.addEventListener('click', () => {
          if (isRolling) return;
          const available = antiRepeat ? pool.filter(i => !drawn.includes(i)) : pool;
          if (available.length === 0) { alert('名單所有同學皆已抽過囉！'); return; }
          isRolling = true; rollBtn.disabled = true; let counter = 0;
          const rollInterval = setInterval(() => {
            resultEl.textContent = available[Math.floor(Math.random() * available.length)];
            window.soundEngine.playTick(); counter++;
            if (counter >= 18) {
              clearInterval(rollInterval);
              const winner = available[Math.floor(Math.random() * available.length)];
              resultEl.textContent = winner; if (antiRepeat) drawn.push(winner);
              updateStatus(); if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 60 });
              window.soundEngine.playFanfare(); isRolling = false; rollBtn.disabled = false;
            }
          }, 65);
        });
        updateStatus();
      }
    });
  },

  spawnGroupMaker(wm) {
    let students = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號`);

    const content = `
      <div class="groups-container">
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 0.85rem; font-weight: 700;">分成組數：</span>
          <select id="grp-count-select" style="padding: 4px 10px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-weight: 700;">
            <option value="2">2 組</option><option value="3">3 組</option><option value="4" selected>4 組</option><option value="5">5 組</option><option value="6">6 組</option><option value="8">8 組</option>
          </select>
          <button class="action-btn-secondary" id="grp-config-btn" style="height: 36px; padding: 0 12px; font-size: 0.82rem;" title="自訂全班名單（一行一個）">
            <i class="fa-solid fa-users-line"></i> 名單 (<span id="grp-roster-count">${students.length}</span>人)
          </button>
          <button class="action-btn-main" id="grp-make-btn" style="height: 36px; padding: 0 16px; font-size: 0.88rem;"><i class="fa-solid fa-shuffle"></i> 隨機分組</button>
        </div>
        <div class="groups-result-grid" id="grp-result-area"><div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px 0; font-size: 0.9rem;">點擊「隨機分組」將全班同學平均分配至各組</div></div>
      </div>
    `;
    wm.createWindow({
      title: '班級分組神器', icon: 'fa-people-group', iconColor: '#52B788', width: 500, height: 380, type: 'groups', contentHtml: content,
      onInit: (el) => {
        const makeBtn = el.querySelector('#grp-make-btn'), select = el.querySelector('#grp-count-select'), resultArea = el.querySelector('#grp-result-area'), configBtn = el.querySelector('#grp-config-btn'), countEl = el.querySelector('#grp-roster-count');

        const onGroupRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            students = [...e.detail];
            countEl.textContent = students.length;
            resultArea.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px 0; font-size: 0.9rem;">共用名單已同步為 ${students.length} 人，請點擊「隨機分組」！</div>`;
          }
        };
        window.addEventListener('rosterUpdated', onGroupRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(students, (newList) => {
              students = newList;
              countEl.textContent = students.length;
              resultArea.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 30px 0; font-size: 0.9rem;">全班名單已更新為 ${students.length} 人，請點擊「隨機分組」！</div>`;
            });
          }
        });

        makeBtn.addEventListener('click', () => {
          const k = parseInt(select.value, 10);
          const shuffled = [...students];
          for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
          const groups = Array.from({ length: k }, () => []);
          shuffled.forEach((std, idx) => groups[idx % k].push(std));
          resultArea.innerHTML = groups.map((g, idx) => `<div class="group-card"><div class="group-card-header">第 ${idx + 1} 組 (${g.length}人)</div><div class="group-member-list">${g.join('、 ')}</div></div>`).join('');
          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
        });
      }
    });
  },

  spawnRPS(wm) {
    const hands = ['✊', '✌', '✋'], names = ['石頭', '剪刀', '布'];
    const content = `
      <div class="rps-container">
        <div class="rps-display-card" id="rps-card">✊</div>
        <div style="font-size: 1.15rem; font-weight: 800; color: var(--text);" id="rps-text">準備出拳...</div>
        <button class="action-btn-main" id="rps-play-btn" style="width: 180px;"><i class="fa-solid fa-hand-back-fist"></i> 猜拳開始！</button>
      </div>
    `;
    wm.createWindow({
      title: '剪刀石頭布', icon: 'fa-hand-back-fist', iconColor: '#FF85A1', width: 270, height: 290, type: 'rps', contentHtml: content,
      onInit: (el) => {
        const card = el.querySelector('#rps-card'), text = el.querySelector('#rps-text'), playBtn = el.querySelector('#rps-play-btn');
        playBtn.addEventListener('click', () => {
          card.classList.add('rolling'); window.soundEngine.playDiceRoll(); let count = 0;
          const interval = setInterval(() => {
            card.textContent = hands[Math.floor(Math.random() * 3)]; count++;
            if (count >= 10) {
              clearInterval(interval); card.classList.remove('rolling');
              const finalIdx = Math.floor(Math.random() * 3);
              card.textContent = hands[finalIdx]; text.textContent = `出拳結果：${names[finalIdx]}！`; window.soundEngine.playBell();
            }
          }, 70);
        });
      }
    });
  },

  spawnWhiteboard(wm) {
    const content = `
      <div class="whiteboard-container">
        <div class="whiteboard-toolbar">
          <div class="wb-color-palette">
            <div class="color-dot active" data-color="#2D3748" style="background: #2D3748;"></div>
            <div class="color-dot" data-color="#E63946" style="background: #E63946;"></div>
            <div class="color-dot" data-color="#1D3557" style="background: #1D3557;"></div>
            <div class="color-dot" data-color="#2A9D8F" style="background: #2A9D8F;"></div>
            <div class="color-dot" data-color="#FF9F1C" style="background: #FF9F1C;"></div>
            <div class="color-dot" data-color="#FFE066" style="background: #FFE066;"></div>
          </div>
          <div class="wb-tools-row">
            <button class="wb-btn active" id="wb-pen-btn" title="畫筆"><i class="fa-solid fa-pen"></i></button>
            <button class="wb-btn" id="wb-eraser-btn" title="橡皮擦"><i class="fa-solid fa-eraser"></i></button>
            <button class="wb-btn" id="wb-theme-btn" title="背景切換"><i class="fa-solid fa-table-cells"></i></button>
            <button class="wb-btn" id="wb-undo-btn" title="復原"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="wb-btn" id="wb-clear-btn" title="全清"><i class="fa-solid fa-trash-can"></i></button>
            <button class="wb-btn" id="wb-export-btn" title="匯出圖片"><i class="fa-solid fa-download"></i></button>
          </div>
        </div>
        <div class="canvas-wrapper" id="wb-wrapper"><canvas id="wb-canvas"></canvas></div>
      </div>
    `;
    wm.createWindow({
      title: '課堂自由白板', icon: 'fa-paintbrush', iconColor: '#2EC4B6', width: 460, height: 380, minWidth: 320, minHeight: 260, type: 'whiteboard', contentHtml: content,
      onInit: (el) => {
        const canvas = el.querySelector('#wb-canvas'), wrapper = el.querySelector('#wb-wrapper'), ctx = canvas.getContext('2d'), colorDots = el.querySelectorAll('.color-dot'), penBtn = el.querySelector('#wb-pen-btn'), eraserBtn = el.querySelector('#wb-eraser-btn'), themeBtn = el.querySelector('#wb-theme-btn'), undoBtn = el.querySelector('#wb-undo-btn'), clearBtn = el.querySelector('#wb-clear-btn'), exportBtn = el.querySelector('#wb-export-btn');
        let currentColor = '#2D3748', isEraser = false, isDrawing = false, lastX = 0, lastY = 0, history = [];
        const resizeCanvas = () => {
          const rect = wrapper.getBoundingClientRect(); if (rect.width === 0 || rect.height === 0) return;
          const tempCanvas = document.createElement('canvas'); tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
          tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
          canvas.width = rect.width * window.devicePixelRatio; canvas.height = rect.height * window.devicePixelRatio;
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
          ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
        };
        setTimeout(resizeCanvas, 50); new ResizeObserver(resizeCanvas).observe(wrapper);
        canvas.addEventListener('pointerdown', (e) => {
          if (history.length >= 15) history.shift(); history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
          isDrawing = true; canvas.setPointerCapture(e.pointerId); const rect = canvas.getBoundingClientRect(); lastX = e.clientX - rect.left; lastY = e.clientY - rect.top; e.preventDefault();
        });
        canvas.addEventListener('pointermove', (e) => {
          if (!isDrawing) return; const rect = canvas.getBoundingClientRect(); const currentX = e.clientX - rect.left; const currentY = e.clientY - rect.top;
          ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(currentX, currentY);
          if (isEraser) { ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 24; }
          else { ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = currentColor; ctx.lineWidth = currentColor === '#FFE066' ? 16 : 4; }
          ctx.stroke(); lastX = currentX; lastY = currentY;
        });
        const stop = (e) => { if (isDrawing) { isDrawing = false; try { canvas.releasePointerCapture(e.pointerId); } catch(err){} } };
        canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);
        colorDots.forEach(dot => dot.addEventListener('click', () => { colorDots.forEach(d => d.classList.remove('active')); dot.classList.add('active'); currentColor = dot.dataset.color; isEraser = false; penBtn.classList.add('active'); eraserBtn.classList.remove('active'); }));
        penBtn.addEventListener('click', () => { isEraser = false; penBtn.classList.add('active'); eraserBtn.classList.remove('active'); });
        eraserBtn.addEventListener('click', () => { isEraser = true; eraserBtn.classList.add('active'); penBtn.classList.remove('active'); });
        const themes = ['', 'theme-blackboard', 'theme-grid']; let themeIdx = 0;
        themeBtn.addEventListener('click', () => { if (themes[themeIdx]) wrapper.classList.remove(themes[themeIdx]); themeIdx = (themeIdx + 1) % themes.length; if (themes[themeIdx]) wrapper.classList.add(themes[themeIdx]); });
        undoBtn.addEventListener('click', () => { if (history.length > 0) ctx.putImageData(history.pop(), 0, 0); });
        clearBtn.addEventListener('click', () => { if (confirm('清空白板？')) ctx.clearRect(0, 0, canvas.width, canvas.height); });
        exportBtn.addEventListener('click', () => {
          try {
            const a = document.createElement('a');
            a.download = `白板_${Date.now()}.png`;
            a.href = canvas.toDataURL('image/png');
            document.body.appendChild(a);
            a.click();
            setTimeout(() => document.body.removeChild(a), 100);
            window.soundEngine.playPop();
            exportBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已匯出';
            setTimeout(() => { exportBtn.innerHTML = '<i class="fa-solid fa-download"></i> 匯出'; }, 1500);
          } catch (e) {
            alert('匯出白板圖片失敗：' + e.message);
          }
        });
      }
    });
  },

  spawnImageViewer(wm) {
    const sampleImages = [
      { name: '植物細胞結構', url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800&q=80' },
      { name: '世界地圖', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80' },
      { name: '自然科學插圖', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' }
    ];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; gap: 6px;">
          <input type="text" id="img-url-input" placeholder="貼上圖片 URL 或拖曳圖片至此..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); font-size: 0.85rem; outline: none;">
          <button class="action-btn-main" id="img-load-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">載入</button>
          <label class="action-btn-secondary" style="height: 32px; padding: 0 12px; font-size: 0.8rem; display: flex; align-items: center; cursor: pointer;">
            <i class="fa-solid fa-upload"></i>
            <input type="file" id="img-file-input" accept="image/*" style="display: none;">
          </label>
        </div>
        <div style="display: flex; gap: 6px; overflow-x: auto;">
          ${sampleImages.map((s) => `<button class="preset-chip img-sample-btn" data-url="${s.url}" style="font-size: 0.75rem;">${s.name}</button>`).join('')}
        </div>
        <div style="flex: 1; background: #F8F6F0; border-radius: var(--radius-sm); border: 2px dashed var(--border-subtle); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;" id="img-view-box">
          <img id="img-display" src="${sampleImages[0].url}" alt="課堂展示圖片" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
      </div>
    `;
    wm.createWindow({
      title: '教材圖片展示', icon: 'fa-image', iconColor: '#FF6B6B', width: 420, height: 360, type: 'image', contentHtml: content,
      onInit: (el) => {
        const urlInput = el.querySelector('#img-url-input'), loadBtn = el.querySelector('#img-load-btn'), fileInput = el.querySelector('#img-file-input'), display = el.querySelector('#img-display'), viewBox = el.querySelector('#img-view-box');
        loadBtn.addEventListener('click', () => { if (urlInput.value.trim()) display.src = urlInput.value.trim(); });
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) { const reader = new FileReader(); reader.onload = (ev) => { display.src = ev.target.result; }; reader.readAsDataURL(file); }
        });
        el.querySelectorAll('.img-sample-btn').forEach(btn => btn.addEventListener('click', () => { display.src = btn.dataset.url; }));
        viewBox.addEventListener('dragover', (e) => { e.preventDefault(); viewBox.style.borderColor = 'var(--primary)'; });
        viewBox.addEventListener('drop', (e) => {
          e.preventDefault(); viewBox.style.borderColor = 'var(--border-subtle)';
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const reader = new FileReader(); reader.onload = (ev) => { display.src = ev.target.result; }; reader.readAsDataURL(e.dataTransfer.files[0]);
          }
        });
      }
    });
  },

  spawnStickers(wm) {
    const stickers = ['💯', '🌟', '🎉', '🔥', '👑', '👍', '❤️', '👏', '🌈', '🏆', '🎯', '🚀', '⭐', '🦉', '🎨', '💡'];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">點擊貼紙蓋印，可拖曳放置：</span>
          <button type="button" class="action-btn-secondary" id="stickers-clear-all-btn" style="height: 24px; font-size: 0.72rem; padding: 0 8px; color: #E03131; border-color: #FFA8A8;" title="清除桌面上所有已蓋出的貼紕"><i class="fa-solid fa-trash-can"></i> 清除全部貼紕</button>
        </div>
        <div class="stickers-grid">
          ${stickers.map(s => `<div class="sticker-badge" data-emoji="${s}">${s}</div>`).join('')}
        </div>
      </div>
    `;
    wm.createWindow({
      title: '獎勵電子貼紙', icon: 'fa-award', iconColor: '#FFD166', width: 320, height: 320, type: 'stickers', contentHtml: content,
      onInit: (el) => {
        const clearBtn = el.querySelector('#stickers-clear-all-btn');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            const allStamps = document.querySelectorAll('.puti-screen-sticker-stamp');
            if (allStamps.length === 0) return alert('目前桌面上沒有蓋出的貼紕！');
            if (confirm(`確定要清除桌面上的 ${allStamps.length} 張貼紕嗎？`)) {
              allStamps.forEach(s => s.remove());
              window.soundEngine.playPop();
            }
          });
        }
        el.querySelectorAll('.sticker-badge').forEach(badge => {
          badge.addEventListener('click', () => {
            const emoji = badge.dataset.emoji;
            window.soundEngine.playFanfare();
            if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 50 });
            const stamp = document.createElement('div'); stamp.className = 'puti-screen-sticker-stamp';
            stamp.style.cssText = `position: absolute; left: ${Math.random()*300+100}px; top: ${Math.random()*200+80}px; font-size: 4.5rem; cursor: grab; user-select: none; z-index: 200; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.25)); animation: stampBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);`;
            stamp.textContent = emoji; stamp.title = '雙擊移除，按住拖曳';
            let isDragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
            stamp.addEventListener('pointerdown', (e) => { isDragging = true; stamp.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; ox = stamp.offsetLeft; oy = stamp.offsetTop; });
            stamp.addEventListener('pointermove', (e) => { if (!isDragging) return; stamp.style.left = (ox + e.clientX - sx) + 'px'; stamp.style.top = (oy + e.clientY - sy) + 'px'; });
            stamp.addEventListener('pointerup', (e) => { isDragging = false; try { stamp.releasePointerCapture(e.pointerId); } catch(err){} });
            stamp.addEventListener('dblclick', () => stamp.remove());
            document.getElementById('desktop-canvas').appendChild(stamp);
          });
        });
      }
    });
  },

  spawnPDFViewer(wm) {
    const sampleLessonDoc = `<div style="background: #FFF; padding: 24px; font-family: sans-serif; color: #2D3748; height: 100%; overflow-y: auto;"><h2 style="color: #FF9F1C; border-bottom: 2px solid #FF9F1C; padding-bottom: 6px; margin-bottom: 14px;">國小自然科學 · 探索學習單</h2><div style="font-weight: 700; margin-bottom: 10px;">單元：植物的器官與光合作用</div><p style="line-height: 1.8; margin-bottom: 12px;">一、核心觀念：植物透過葉綠體吸收日光進行光合作用。</p><div style="border: 2px dashed #CBD5E1; border-radius: 12px; height: 120px; display: flex; align-items: center; justify-content: center; color: #94A3B8; margin-top: 20px;">請直接拖入電腦中的 PDF 檔案</div></div>`;
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <label class="action-btn-main" style="height: 32px; font-size: 0.82rem; padding: 0 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-file-arrow-up"></i> 載入電腦 PDF
            <input type="file" id="pdf-file-picker" accept="application/pdf" style="display: none;">
          </label>
          <button class="action-btn-secondary" id="pdf-sample-btn" style="height: 32px; font-size: 0.82rem;">範例學習單</button>
        </div>
        <div class="media-frame-wrapper" id="pdf-frame-box" style="border: 2px dashed var(--border-subtle);">${sampleLessonDoc}</div>
      </div>
    `;
    wm.createWindow({
      title: 'PDF 講義閱讀器', icon: 'fa-file-pdf', iconColor: '#E63946', width: 540, height: 440, type: 'pdf', contentHtml: content,
      onInit: (el) => {
        const picker = el.querySelector('#pdf-file-picker'), box = el.querySelector('#pdf-frame-box'), sampleBtn = el.querySelector('#pdf-sample-btn');
        const load = (url) => { box.innerHTML = `<embed src="${url}" type="application/pdf" style="width: 100%; height: 100%;">`; };
        picker.addEventListener('change', (e) => { if (e.target.files[0]) load(URL.createObjectURL(e.target.files[0])); });
        sampleBtn.addEventListener('click', () => { box.innerHTML = sampleLessonDoc; });
        box.addEventListener('dragover', (e) => e.preventDefault());
        box.addEventListener('drop', (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) load(URL.createObjectURL(e.dataTransfer.files[0])); });
      }
    });
  },

  spawnQRCode(wm) {
    const content = `
      <div class="qrcode-container">
        <div style="display: flex; gap: 6px; width: 100%;">
          <input type="text" id="qr-input" value="https://padlet.com/clongwh/puti_ai_tools" placeholder="輸入網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="qr-gen-btn" style="height: 34px; padding: 0 14px; font-size: 0.82rem;">產生</button>
        </div>
        <div class="qrcode-box" id="qr-canvas-box" style="min-height: 180px; min-width: 180px;"></div>
        <button class="action-btn-secondary" id="qr-expand-btn" style="height: 32px; width: 100%; font-size: 0.8rem;">
          <i class="fa-solid fa-expand"></i> 巨幅投影放大
        </button>
      </div>
    `;
    wm.createWindow({
      title: 'QR Code 產生器', icon: 'fa-qrcode', iconColor: '#1B4965', width: 320, height: 350, type: 'qrcode', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#qr-input'), genBtn = el.querySelector('#qr-gen-btn'), box = el.querySelector('#qr-canvas-box'), expandBtn = el.querySelector('#qr-expand-btn');
        const makeCode = () => {
          box.innerHTML = '';
          const val = input.value.trim() || 'https://padlet.com/clongwh/puti_ai_tools';
          if (typeof QRCode !== 'undefined') {
            try { new QRCode(box, { text: val, width: 180, height: 180, colorDark: "#2D3748", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H }); return; } catch(e){}
          }
          box.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(val)}" width="180" height="180">`;
        };
        genBtn.addEventListener('click', makeCode);
        expandBtn.addEventListener('click', () => {
          const val = input.value.trim() || 'https://padlet.com/clongwh/puti_ai_tools';
          window.openQRLightbox('QR Code 投影條碼', val, val);
        });
        makeCode();
      }
    });
  },

  spawnHyperlink(wm) {
    const links = [
      { name: 'Padlet 資源庫', url: 'https://padlet.com/clongwh/puti_ai_tools', icon: 'fa-paperclip', color: '#FF9F1C' },
      { name: 'Kahoot 遊戲', url: 'https://kahoot.com', icon: 'fa-gamepad', color: '#46178F' },
      { name: 'Google Classroom', url: 'https://classroom.google.com', icon: 'fa-graduation-cap', color: '#2BA640' },
      { name: 'Wordwall', url: 'https://wordwall.net', icon: 'fa-puzzle-piece', color: '#0077CC' },
      { name: 'Canva 簡報', url: 'https://www.canva.com', icon: 'fa-wand-magic-sparkles', color: '#00C4CC' },
      { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-play', color: '#FF0000' }
    ];
    const content = `<div class="hyperlink-grid">${links.map(l => `<a href="${l.url}" target="_blank" class="hyperlink-card"><i class="fa-solid ${l.icon}" style="color: ${l.color}; font-size: 1.1rem;"></i><span>${l.name}</span></a>`).join('')}</div>`;
    wm.createWindow({ title: '常用教學連結', icon: 'fa-arrow-up-right-from-square', iconColor: '#3A86FF', width: 340, height: 250, type: 'hyperlink', contentHtml: content });
  },

  spawnVideo(wm) {
    const content = `
      <div class="video-container">
        <div style="display: flex; gap: 6px;">
          <input type="text" id="vid-url-input" placeholder="貼上 YouTube 影片網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="vid-play-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">播放</button>
        </div>
        <div style="display: flex; gap: 6px; overflow-x: auto;">
          <button class="preset-chip vid-chip" data-id="jfKfPfyJRdk">5分專注音樂</button>
          <button class="preset-chip vid-chip" data-id="5qap5aO4i9A">Lofi 輕音樂</button>
        </div>
        <div class="media-frame-wrapper" id="vid-box">
          <iframe id="vid-iframe" src="https://www.youtube.com/embed/jfKfPfyJRdk" allowfullscreen></iframe>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂影片播放', icon: 'fa-circle-play', iconColor: '#E63946', width: 480, height: 360, type: 'video', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#vid-url-input'), playBtn = el.querySelector('#vid-play-btn'), iframe = el.querySelector('#vid-iframe');
        const parseYoutube = (url) => {
          const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          return match ? match[1] : '';
        };
        playBtn.addEventListener('click', () => { const id = parseYoutube(input.value.trim()); if (id) iframe.src = `https://www.youtube.com/embed/${id}`; });
        el.querySelectorAll('.vid-chip').forEach(c => c.addEventListener('click', () => { iframe.src = `https://www.youtube.com/embed/${c.dataset.id}`; }));
      }
    });
  },

  spawnEmbed(wm) {
    const embeds = [
      { name: 'PhET 能量模擬', url: 'https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics_all.html' },
      { name: 'GeoGebra 幾何', url: 'https://www.geogebra.org/classic' },
      { name: 'Padlet', url: 'https://padlet.com/clongwh/puti_ai_tools' }
    ];
    const content = `
      <div class="embed-container">
        <div style="display: flex; gap: 6px;">
          <input type="url" id="embed-url-input" value="${embeds[0].url}" placeholder="輸入網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="embed-go-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">前往</button>
        </div>
        <div style="display: flex; gap: 6px;">
          ${embeds.map(e => `<button class="preset-chip embed-chip" data-url="${e.url}">${e.name}</button>`).join('')}
        </div>
        <div class="media-frame-wrapper"><iframe id="embed-iframe" src="${embeds[0].url}" style="width: 100%; height: 100%; background: #FFF; border: none;"></iframe></div>
      </div>
    `;
    wm.createWindow({
      title: '網頁互動嵌入', icon: 'fa-code', iconColor: '#6A4C93', width: 520, height: 400, type: 'embed', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#embed-url-input'), goBtn = el.querySelector('#embed-go-btn'), iframe = el.querySelector('#embed-iframe');
        goBtn.addEventListener('click', () => { if (input.value.trim()) iframe.src = input.value.trim(); });
        el.querySelectorAll('.embed-chip').forEach(c => c.addEventListener('click', () => { input.value = c.dataset.url; iframe.src = c.dataset.url; }));
      }
    });
  },

  spawnWebcam(wm) {
    let stream = null;
    const content = `
      <div class="webcam-container">
        <div style="display: flex; gap: 8px; align-items: center;">
          <select id="webcam-device-select" style="flex: 1; padding: 4px 10px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.82rem; font-weight: 700;">
            <option value="">預設鏡頭 / 實物投影機</option>
          </select>
          <button class="action-btn-secondary" id="webcam-mirror-btn" style="height: 32px; font-size: 0.78rem;"><i class="fa-solid fa-arrows-left-right"></i> 鏡像</button>
        </div>
        <div class="media-frame-wrapper"><video id="webcam-video" autoplay playsinline style="transform: scaleX(-1);"></video></div>
        <button class="action-btn-main" id="webcam-toggle-btn" style="height: 34px; font-size: 0.82rem;"><i class="fa-solid fa-video"></i> 開啟鏡頭</button>
      </div>
    `;
    wm.createWindow({
      title: '實物投影 / 鏡頭', icon: 'fa-camera', iconColor: '#0077B6', width: 440, height: 360, type: 'webcam', contentHtml: content,
      onInit: (el) => {
        const video = el.querySelector('#webcam-video'), toggleBtn = el.querySelector('#webcam-toggle-btn'), mirrorBtn = el.querySelector('#webcam-mirror-btn'), deviceSelect = el.querySelector('#webcam-device-select');
        let mirrored = true;
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          navigator.mediaDevices.enumerateDevices().then(devices => {
            const vds = devices.filter(d => d.kind === 'videoinput');
            if (vds.length > 1) deviceSelect.innerHTML = vds.map((d, i) => `<option value="${d.deviceId}">${d.label || `攝影機 ${i+1}`}</option>`).join('');
          }).catch(console.warn);
        }
        const start = async () => {
          try {
            const id = deviceSelect.value;
            stream = await navigator.mediaDevices.getUserMedia({ video: id ? { deviceId: { exact: id } } : true });
            video.srcObject = stream; toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> 關閉鏡頭'; toggleBtn.style.background = 'linear-gradient(135deg, #FF4757, #E84118)';
          } catch(e) { alert('⚠️ 無法存取相機鏡頭！請確認瀏覽器網址列已允許相機權限，或檢查相機是否已被其他程式佔用。'); }
        };
        const stop = () => { if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; } video.srcObject = null; toggleBtn.innerHTML = '<i class="fa-solid fa-video"></i> 開啟鏡頭'; toggleBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)'; };
        toggleBtn.addEventListener('click', () => { if (stream) stop(); else start(); });
        mirrorBtn.addEventListener('click', () => { mirrored = !mirrored; video.style.transform = mirrored ? 'scaleX(-1)' : 'scaleX(1)'; });
      },
      onClose: () => { if (stream) stream.getTracks().forEach(t => t.stop()); }
    });
  },


  spawnAmbientSound(wm) {
    let currentNoise = null, audioCtx = null;
    const sounds = [{ id: 'rain', name: '綿綿細雨', icon: 'fa-cloud-rain' }, { id: 'forest', name: '森林鳥語', icon: 'fa-tree' }, { id: 'waves', name: '海浪拍岸', icon: 'fa-water' }, { id: 'cafe', name: '午後咖啡', icon: 'fa-mug-hot' }];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <div style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">原生合成白噪音，烘托專注氣氛</div>
        <div class="ambient-grid">${sounds.map(s => `<button class="ambient-btn" data-sound="${s.id}"><i class="fa-solid ${s.icon}"></i><span>${s.name}</span></button>`).join('')}</div>
        <button class="action-btn-secondary" id="amb-stop-btn" style="height: 36px; font-size: 0.85rem;"><i class="fa-solid fa-stop"></i> 停止播放</button>
      </div>
    `;
    wm.createWindow({
      title: '專注音訊與白噪音', icon: 'fa-headphones', iconColor: '#2A9D8F', width: 310, height: 250, type: 'ambient', contentHtml: content,
      onInit: (el) => {
        const btns = el.querySelectorAll('.ambient-btn'), stopBtn = el.querySelector('#amb-stop-btn');
        const stop = () => { if (currentNoise) { try { currentNoise.stop(); } catch(e){} currentNoise = null; } btns.forEach(b => b.classList.remove('active')); };
        const playNoise = () => {
          stop(); if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const bufferSize = audioCtx.sampleRate * 2, buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate), data = buffer.getChannelData(0);
          let lastOut = 0.0; for (let i = 0; i < bufferSize; i++) { const w = Math.random() * 2 - 1; data[i] = (lastOut + (0.02 * w)) / 1.02; lastOut = data[i]; data[i] *= 1.8; }
          const noise = audioCtx.createBufferSource(); noise.buffer = buffer; noise.loop = true;
          const gain = audioCtx.createGain(); gain.gain.value = 0.15; noise.connect(gain); gain.connect(audioCtx.destination); noise.start(); currentNoise = noise;
        };
        btns.forEach(btn => btn.addEventListener('click', () => { btns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); playNoise(); }));
        stopBtn.addEventListener('click', stop);
      },
      onClose: () => { if (currentNoise) { try { currentNoise.stop(); } catch(e){} } }
    });
  },

  // =========================================================================
  // 個人計分器 (Individual Score Counter)
  // =========================================================================
  spawnIndividualTally(wm) {
    let roster = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`);
    let scores = JSON.parse(localStorage.getItem('puti_individual_scores') || '{}');
    let sortMode = 'number'; // 'number' | 'rank'

    roster.forEach(name => {
      if (scores[name] === undefined) scores[name] = 0;
    });

    const saveScores = () => {
      localStorage.setItem('puti_individual_scores', JSON.stringify(scores));
    };

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <!-- Top Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF9DB; padding: 6px 12px; border-radius: 12px; border: 1px solid #FFE066; flex-wrap: wrap; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.8rem; font-weight: 800; color: #D9480F;"><i class="fa-solid fa-trophy"></i> 學生個人點數榜</span>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="action-btn-secondary" id="tally-sort-num" style="height: 26px; padding: 0 8px; font-size: 0.74rem; background: #FFF; font-weight: 800;">座號序</button>
              <button type="button" class="action-btn-secondary" id="tally-sort-rank" style="height: 26px; padding: 0 8px; font-size: 0.74rem; background: #FFF;">排行榜</button>
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="action-btn-main" id="tally-all-plus" style="height: 28px; padding: 0 10px; font-size: 0.75rem; background: linear-gradient(135deg, #2B8A3E, #20C997);" title="全班每人加 1 分">
              <i class="fa-solid fa-star"></i> 全班+1
            </button>
            <button type="button" class="action-btn-secondary" id="tally-config-btn" style="height: 28px; padding: 0 8px; font-size: 0.75rem;" title="自訂學生名單（一行一個）">
              <i class="fa-solid fa-users-line"></i> 名單 (<span id="tally-roster-count">${roster.length}</span>人)
            </button>
            <button type="button" class="action-btn-secondary" id="tally-reset-btn" style="height: 28px; padding: 0 8px; font-size: 0.75rem; color: #FA5252;" title="全部個人分數歸零">
              <i class="fa-solid fa-rotate-left"></i> 歸零
            </button>
          </div>
        </div>

        <!-- Student Cards Grid -->
        <div class="tally-grid" id="tally-cards-grid" style="flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); gap: 8px; padding: 4px;"></div>
      </div>
    `;

    wm.createWindow({
      title: '個人計分器',
      icon: 'fa-user-check',
      iconColor: '#FF7B00',
      width: 580,
      height: 480,
      type: 'tally',
      contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#tally-cards-grid');
        const sortNumBtn = el.querySelector('#tally-sort-num');
        const sortRankBtn = el.querySelector('#tally-sort-rank');
        const allPlusBtn = el.querySelector('#tally-all-plus');
        const configBtn = el.querySelector('#tally-config-btn');
        const countSpan = el.querySelector('#tally-roster-count');
        const resetBtn = el.querySelector('#tally-reset-btn');

        const renderCards = () => {
          let list = [...roster];
          if (sortMode === 'rank') {
            list.sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
          }

          if (countSpan) countSpan.textContent = roster.length;

          grid.innerHTML = list.map((name, idx) => {
            const sc = scores[name] || 0;
            let rankBadge = '';
            if (sortMode === 'rank') {
              if (idx === 0 && sc > 0) rankBadge = '🥇';
              else if (idx === 1 && sc > 0) rankBadge = '🥈';
              else if (idx === 2 && sc > 0) rankBadge = '🥉';
              else rankBadge = `<span style="font-size:0.7rem; color:#868E96;">#${idx+1}</span>`;
            }

            return `
              <div class="tally-card" data-name="${name}" style="background: #FFF; border: 1.5px solid #E9ECEF; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: all 0.15s ease;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #495057; display: flex; align-items: center; gap: 3px; width: 100%; justify-content: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${rankBadge} <span>${name}</span>
                </div>
                <div class="tally-score" style="font-size: 1.6rem; font-weight: 900; color: #E8590C; font-family: var(--font-num); line-height: 1.1; font-variant-numeric: tabular-nums;">
                  ${sc}
                </div>
                <div style="display: flex; gap: 4px; width: 100%; margin-top: 2px;">
                  <button type="button" class="tally-minus-btn" style="flex: 1; height: 26px; border: 1px solid #CED4DA; background: #F8F9FA; border-radius: 6px; font-weight: bold; cursor: pointer; color: #495057;">-</button>
                  <button type="button" class="tally-plus-btn" style="flex: 1.6; height: 26px; border: none; background: #FF922B; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 1px 4px rgba(255, 146, 43, 0.4);">+</button>
                </div>
              </div>
            `;
          }).join('');

          // Bind card buttons
          grid.querySelectorAll('.tally-card').forEach(card => {
            const name = card.getAttribute('data-name');
            const plusBtn = card.querySelector('.tally-plus-btn');
            const minusBtn = card.querySelector('.tally-minus-btn');

            plusBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              scores[name] = (scores[name] || 0) + 1;
              saveScores();
              renderCards();
              window.soundEngine.playPop();
            });

            minusBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              scores[name] = Math.max(0, (scores[name] || 0) - 1);
              saveScores();
              renderCards();
              window.soundEngine.playTick();
            });
          });
        };

        sortNumBtn.addEventListener('click', () => {
          sortMode = 'number';
          sortNumBtn.style.fontWeight = '800';
          sortRankBtn.style.fontWeight = 'normal';
          renderCards();
          window.soundEngine.playTick();
        });

        sortRankBtn.addEventListener('click', () => {
          sortMode = 'rank';
          sortRankBtn.style.fontWeight = '800';
          sortNumBtn.style.fontWeight = 'normal';
          renderCards();
          window.soundEngine.playTick();
        });

        allPlusBtn.addEventListener('click', () => {
          roster.forEach(name => {
            scores[name] = (scores[name] || 0) + 1;
          });
          saveScores();
          renderCards();
          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 60 });
        });

        resetBtn.addEventListener('click', () => {
          if (confirm('確定要將全班同學的個人點數全部歸零嗎？')) {
            roster.forEach(name => { scores[name] = 0; });
            saveScores();
            renderCards();
            window.soundEngine.playTick();
          }
        });

        const onTallyRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            roster = [...e.detail];
            roster.forEach(name => {
              if (scores[name] === undefined) scores[name] = 0;
            });
            saveScores();
            renderCards();
          }
        };
        window.addEventListener('rosterUpdated', onTallyRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(roster, (newList) => {
              roster = newList;
              roster.forEach(name => {
                if (scores[name] === undefined) scores[name] = 0;
              });
              saveScores();
              renderCards();
            });
          } else {
            // Fallback: direct prompt with multiline format
            const raw = prompt('請輸入全班名單（一行一位同學）：\n', roster.join('\n'));
            if (raw) {
              roster = raw.split(/\n+/).map(s => s.trim()).filter(Boolean);
              localStorage.setItem('puti_student_roster', JSON.stringify(roster));
              roster.forEach(name => { if (scores[name] === undefined) scores[name] = 0; });
              saveScores();
              renderCards();
            }
          }
        });

        renderCards();
      }
    });
  },

  // =========================================================================
  // 班級功課表 (Class Timetable) - 智慧色彩對比與蓋章筆
  // =========================================================================
  spawnTimetable(wm) {
    const subjectColors = {
      '國語': { bg: '#FFE3E3', color: '#C92A2A', dark: false },
      '數學': { bg: '#E7F5FF', color: '#1864AB', dark: false },
      '英語': { bg: '#FFF3BF', color: '#D9480F', dark: false },
      '自然': { bg: '#D3F9D8', color: '#2B8A3E', dark: false },
      '社會': { bg: '#FFE8CC', color: '#D9480F', dark: false },
      '體育': { bg: '#5F3DC4', color: '#FFFFFF', dark: true },
      '美勞': { bg: '#E64980', color: '#FFFFFF', dark: true },
      '音樂': { bg: '#1098AD', color: '#FFFFFF', dark: true },
      '資訊': { bg: '#1971C2', color: '#FFFFFF', dark: true },
      '綜合': { bg: '#F3D9FA', color: '#862E9C', dark: false },
      '彈性': { bg: '#0CA678', color: '#FFFFFF', dark: true },
      '晨讀': { bg: '#E9ECEF', color: '#495057', dark: false },
      '書法': { bg: '#343A40', color: '#FFFFFF', dark: true },
      '晨光': { bg: '#FFF9DB', color: '#D9480F', dark: false },
      '社團': { bg: '#FD7E14', color: '#FFFFFF', dark: true },
      '閱讀': { bg: '#E9ECEF', color: '#495057', dark: false },
      '午休': { bg: '#F8F9FA', color: '#868E96', dark: false },
      '放學': { bg: '#FFE8CC', color: '#D9480F', dark: false },
      '空白': { bg: 'transparent', color: '#ADB5BD', dark: false }
    };

    const getSubjectStyle = (sub) => {
      if (!sub || sub === '-' || sub === '空白') return 'background: transparent; color: #ADB5BD;';
      if (subjectColors[sub]) {
        const item = subjectColors[sub];
        return `background: ${item.bg}; color: ${item.color}; font-weight: 800; border: 1px solid ${item.dark ? 'transparent' : item.color + '33'};`;
      }
      // Dynamic hash fallback
      const hues = [210, 150, 45, 280, 340, 180, 20];
      const charCode = sub.charCodeAt(0) || 0;
      const hue = hues[charCode % hues.length];
      return `background: hsl(${hue}, 85%, 92%); color: hsl(${hue}, 90%, 25%); font-weight: 800;`;
    };

    const defaultTimetable = {
      periods: [
        { name: '早自習', time: '08:00~08:40', mon: '晨讀', tue: '晨光', wed: '書法', thu: '晨讀', fri: '社團' },
        { name: '第一節', time: '08:45~09:25', mon: '國語', tue: '數學', wed: '英語', thu: '國語', fri: '數學' },
        { name: '第二節', time: '09:35~10:15', mon: '國語', tue: '自然', wed: '數學', thu: '社會', fri: '英語' },
        { name: '第三節', time: '10:30~11:10', mon: '數學', tue: '自然', wed: '體育', thu: '數學', fri: '國語' },
        { name: '第四節', time: '11:20~12:00', mon: '社會', tue: '英語', wed: '綜合', thu: '美勞', fri: '音樂' },
        { name: '午餐午休', time: '12:00~13:20', mon: '午休', tue: '午休', wed: '放學', thu: '午休', fri: '午休' },
        { name: '第五節', time: '13:30~14:10', mon: '體育', tue: '國語', wed: '', thu: '美勞', fri: '綜合' },
        { name: '第六節', time: '14:20~15:00', mon: '音樂', tue: '社會', wed: '', thu: '資訊', fri: '彈性' },
        { name: '第七節', time: '15:15~15:55', mon: '彈性', tue: '彈性', wed: '', thu: '閱讀', fri: '彈性' }
      ]
    };

    let tableData = JSON.parse(localStorage.getItem('puti_class_timetable') || 'null') || defaultTimetable;
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const dayNames = ['週一', '週二', '週三', '週四', '週五'];
    const currentDayIdx = new Date().getDay(); // 1 = Mon, ..., 5 = Fri
    let selectedSubject = '國語';

    const subjects = ['國語', '數學', '英語', '自然', '社會', '體育', '美勞', '音樂', '資訊', '綜合', '彈性', '晨讀', '空白'];

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Subject Quick Palette Bar with Adaptive Colors -->
        <div style="background: #FFF9DB; padding: 6px 10px; border-radius: 10px; border: 1px dashed #FFE066; display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 0.76rem; font-weight: 800; color: #D9480F; display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fa-solid fa-stamp"></i> 快速蓋章筆：當前選中【<strong id="tt-active-sub" style="color: #E8590C;">${selectedSubject}</strong>】（點擊格子直接蓋上）</span>
            <button class="action-btn-secondary" id="tt-print-btn" style="height: 24px; padding: 0 8px; font-size: 0.72rem;"><i class="fa-solid fa-print"></i> 列印課表</button>
          </div>
          <div id="tt-palette-chips" style="display: flex; flex-wrap: wrap; gap: 5px;">
            ${subjects.map(s => {
              const cfg = subjectColors[s] || { bg: '#EDF2F7', color: '#2D3748' };
              const isSel = s === selectedSubject;
              return `<button type="button" class="tt-sub-chip ${isSel ? 'active' : ''}" data-sub="${s}" style="background: ${cfg.bg}; color: ${cfg.color}; font-weight: 800; border: 1.5px solid ${isSel ? '#FF922B' : (cfg.dark ? 'transparent' : cfg.color + '44')}; box-shadow: ${isSel ? '0 0 0 2px #FF922B' : 'none'};">${s}</button>`;
            }).join('')}
          </div>
        </div>

        <!-- Timetable Grid with Adaptive Color Badges -->
        <div style="flex: 1; overflow-y: auto; background: white; border-radius: 12px; border: 1.5px solid #E9ECEF; padding: 4px;">
          <table class="timetable-table" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 0.88rem;">
            <thead>
              <tr style="background: #F8F9FA; border-bottom: 2px solid #DEE2E6;">
                <th style="padding: 6px 4px; width: 16%; color: #495057;">節次 / 時間</th>
                ${dayNames.map((d, i) => `
                  <th style="padding: 6px 4px; width: 16.8%; ${i + 1 === currentDayIdx ? 'background: #FFF3BF; color: #D9480F; font-weight: 900; border-top-left-radius: 6px; border-top-right-radius: 6px;' : 'color: #495057;'}">
                    ${d} ${i + 1 === currentDayIdx ? '<span style="font-size:0.7rem; background:#FF922B; color:white; padding:1px 4px; border-radius:4px; margin-left:2px;">今日</span>' : ''}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody id="tt-tbody"></tbody>
          </table>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '班級功課表',
      icon: 'fa-calendar-week',
      iconColor: '#3A86FF',
      width: 630,
      height: 500,
      type: 'timetable',
      contentHtml: content,
      onInit: (el) => {
        const tbody = el.querySelector('#tt-tbody');
        const activeSubEl = el.querySelector('#tt-active-sub');
        const paletteChips = el.querySelectorAll('.tt-sub-chip');
        const printBtn = el.querySelector('#tt-print-btn');

        const renderRows = () => {
          tbody.innerHTML = tableData.periods.map((p, rowIdx) => {
            const isNoon = p.name === '午餐午休' || p.name === '早自習';
            return `
              <tr style="border-bottom: 1px solid #E9ECEF; ${isNoon ? 'background: #FAFAFA;' : ''}">
                <td style="padding: 6px 2px; font-weight: 800; color: #495057; font-size: 0.78rem;">
                  <div>${p.name}</div>
                  <div style="font-size: 0.68rem; color: #868E96; font-family: var(--font-num); font-variant-numeric: tabular-nums;">${p.time}</div>
                </td>
                ${days.map((d, colIdx) => {
                  const val = p[d] || '';
                  const isToday = colIdx + 1 === currentDayIdx;
                  const styleStr = getSubjectStyle(val);
                  return `
                    <td class="tt-cell" data-row="${rowIdx}" data-day="${d}" style="padding: 6px 2px; cursor: pointer; transition: background 0.15s ease; ${isToday ? 'background: #FFFBEA;' : ''}">
                      <div class="tt-subject-badge" style="padding: 4px 6px; border-radius: 8px; font-size: 0.88rem; transition: transform 0.15s ease; ${styleStr}">
                        ${val || '-'}
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `;
          }).join('');

          // Bind click to stamp subject
          tbody.querySelectorAll('.tt-cell').forEach(cell => {
            cell.addEventListener('click', () => {
              const r = parseInt(cell.getAttribute('data-row'), 10);
              const d = cell.getAttribute('data-day');
              tableData.periods[r][d] = selectedSubject === '空白' ? '' : selectedSubject;
              localStorage.setItem('puti_class_timetable', JSON.stringify(tableData));
              renderRows();
              window.soundEngine.playPop();
            });
          });
        };

        // Select palette subject
        paletteChips.forEach(chip => {
          chip.addEventListener('click', () => {
            paletteChips.forEach(c => {
              c.style.boxShadow = 'none';
              c.classList.remove('active');
            });
            chip.classList.add('active');
            chip.style.boxShadow = '0 0 0 2px #FF922B';
            selectedSubject = chip.getAttribute('data-sub');
            activeSubEl.textContent = selectedSubject;
            window.soundEngine.playTick();
          });
        });

        // Print Friendly
        printBtn.addEventListener('click', () => {
          const printWin = window.open('', '_blank');
          printWin.document.write(`
            <html>
              <head>
                <title>班級功課表列印</title>
                <style>
                  body { font-family: sans-serif; text-align: center; padding: 20px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                  th, td { border: 1.5px solid #333; padding: 10px; font-size: 15px; }
                  th { background: #eee; }
                </style>
              </head>
              <body>
                <h2>國小班級學生週功課表</h2>
                <table>
                  <thead>
                    <tr><th>節次 / 時間</th><th>週一</th><th>週二</th><th>週三</th><th>週四</th><th>週五</th></tr>
                  </thead>
                  <tbody>
                    ${tableData.periods.map(p => `
                      <tr>
                        <td><strong>${p.name}</strong><br><small>${p.time}</small></td>
                        <td>${p.mon || ''}</td><td>${p.tue || ''}</td><td>${p.wed || ''}</td><td>${p.thu || ''}</td><td>${p.fri || ''}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </body>
            </html>
          `);
          printWin.document.close();
          printWin.focus();
          setTimeout(() => { printWin.print(); }, 250);
        });

        renderRows();
      }
    });
  },

  // =========================================================================
  // 重要日子倒數 (Days Countdown)
  // =========================================================================
  spawnDaysCountdown(wm) {
    const saved = JSON.parse(localStorage.getItem('puti_days_countdown_target') || 'null') || {
      title: '第一次段考',
      date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    };

    let targetTitle = saved.title;
    let targetDateStr = saved.date;

    const presets = [
      { name: '第一次段考', days: 14 },
      { name: '第二次段考', days: 45 },
      { name: '校外教學', days: 7 },
      { name: '校慶運動會', days: 30 },
      { name: '寒暑假倒數', days: 60 },
      { name: '畢業典禮', days: 90 }
    ];

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px; justify-content: space-between;">
        <!-- Top Target Title & Date Picker -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF9DB; padding: 6px 10px; border-radius: 10px; border: 1px dashed #FFE066; gap: 6px;">
          <input type="text" id="dc-title-input" value="${targetTitle}" placeholder="倒數事件名稱..." style="flex: 1; padding: 4px 8px; border: 1px solid #CED4DA; border-radius: 6px; font-weight: 800; font-size: 0.85rem; outline: none;">
          <input type="date" id="dc-date-input" value="${targetDateStr}" style="padding: 4px 6px; border: 1px solid #CED4DA; border-radius: 6px; font-weight: 800; font-size: 0.8rem; outline: none; cursor: pointer;">
        </div>

        <!-- Giant Countdown Display -->
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFFDF9 0%, #FFF5EA 100%); border-radius: 16px; border: 2px solid #FFE8CC; padding: 12px; box-shadow: 0 4px 12px rgba(255, 123, 0, 0.06); text-align: center;">
          <div style="font-size: 0.95rem; font-weight: 800; color: #495057; display: flex; align-items: center; gap: 6px;">
            <span>距離【<strong id="dc-event-label" style="color: #E8590C;">${targetTitle}</strong>】</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin: 4px 0;">
            <span style="font-size: 1.2rem; font-weight: 800; color: #868E96;">還有</span>
            <span id="dc-days-num" class="time-num" style="font-size: 3.6rem; font-weight: 900; color: #D9480F; font-family: var(--font-num); line-height: 1;">--</span>
            <span style="font-size: 1.2rem; font-weight: 800; color: #868E96;">天</span>
          </div>
          <div id="dc-status-tip" style="font-size: 0.82rem; font-weight: 800; color: #2B8A3E;">目標日期：${targetDateStr}</div>
        </div>

        <!-- Quick Presets Bar -->
        <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px;">
          ${presets.map(p => `
            <button type="button" class="dc-preset-chip action-btn-secondary" data-name="${p.name}" data-days="${p.days}" style="height: 24px; padding: 0 8px; font-size: 0.72rem; white-space: nowrap; border-radius: 999px;">
              + ${p.name}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    wm.createWindow({
      title: '重要日子倒數',
      icon: 'fa-calendar-check',
      iconColor: '#E63946',
      width: 360,
      height: 330,
      type: 'days-countdown',
      contentHtml: content,
      onInit: (el) => {
        const titleInput = el.querySelector('#dc-title-input');
        const dateInput = el.querySelector('#dc-date-input');
        const eventLabel = el.querySelector('#dc-event-label');
        const daysNum = el.querySelector('#dc-days-num');
        const statusTip = el.querySelector('#dc-status-tip');
        const presetChips = el.querySelectorAll('.dc-preset-chip');

        const updateCountdown = () => {
          targetTitle = titleInput.value.trim() || '重要日子';
          targetDateStr = dateInput.value;
          eventLabel.textContent = targetTitle;

          localStorage.setItem('puti_days_countdown_target', JSON.stringify({
            title: targetTitle,
            date: targetDateStr
          }));

          const target = new Date(targetDateStr + 'T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const diffMs = target - today;
          const diffDays = Math.round(diffMs / 86400000);

          if (diffDays > 0) {
            daysNum.textContent = diffDays;
            daysNum.style.color = '#D9480F';
            statusTip.textContent = `🎯 倒數計時中，大家一起加油！(${targetDateStr})`;
            statusTip.style.color = '#2B8A3E';
          } else if (diffDays === 0) {
            daysNum.textContent = '0';
            daysNum.style.color = '#E03131';
            statusTip.textContent = `🎉 就是今天！全力以赴！`;
            statusTip.style.color = '#E03131';
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
          } else {
            daysNum.textContent = Math.abs(diffDays);
            daysNum.style.color = '#868E96';
            statusTip.textContent = `⏳ 此重要日子已過去 ${Math.abs(diffDays)} 天囉！`;
            statusTip.style.color = '#868E96';
          }
        };

        titleInput.addEventListener('input', updateCountdown);
        dateInput.addEventListener('change', () => {
          updateCountdown();
          window.soundEngine.playPop();
        });

        presetChips.forEach(chip => {
          chip.addEventListener('click', () => {
            const name = chip.getAttribute('data-name');
            const d = parseInt(chip.getAttribute('data-days'), 10);
            const future = new Date(Date.now() + d * 86400000);
            titleInput.value = name;
            dateInput.value = future.toISOString().split('T')[0];
            updateCountdown();
            window.soundEngine.playBell();
          });
        });

        updateCountdown();
      }
    });
  },

};

window.ClassroomWidgets = ClassroomWidgets;
