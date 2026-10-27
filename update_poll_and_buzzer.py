# -*- coding: utf-8 -*-
import sys

widgets_path = r'c:\antigravity\puti-classroomscreen\public\js\widgets.js'
with open(widgets_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. New spawnBuzzer
buzzer_start = text.find('  spawnBuzzer(wm) {')
picker_start = text.find('  spawnPicker(wm) {')

new_buzzer_code = '''  spawnBuzzer(wm) {
    let locked = false;
    let buzzStartTime = Date.now();
    let buzzHistory = [];

    const teams = [
      { id: 1, name: '第一組', key: '1', color: '#E63946' },
      { id: 2, name: '第二組', key: '2', color: '#3A86FF' },
      { id: 3, name: '第三組', key: '3', color: '#2EC4B6' },
      { id: 4, name: '第四組', key: '4', color: '#FF9F1C' }
    ];

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const content = `
      <div class="buzzer-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Status Banner -->
        <div class="buzzer-status-banner" id="buzz-banner" style="background: #FFF9DB; color: #D9480F; border: 1.5px solid #FFE066; border-radius: 12px; padding: 10px; text-align: center; font-weight: 800; font-size: 0.95rem;">
          📢 搶答準備中！點擊按鈕、按鍵盤 1~4 或手機掃碼連線
        </div>

        <!-- 4 Teams On-Screen Quick Buzzer Grid -->
        <div class="buzzer-teams-grid" id="buzz-teams-box" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 4px 0;">
          ${teams.map(t => `
            <div class="team-buzz-card" data-id="${t.id}" id="buzz-card-${t.id}" style="background: #FFF; border: 2px solid ${t.color}33; border-radius: 12px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.15s ease;">
              <div style="font-size: 1.8rem; color: ${t.color}; margin-bottom: 2px;"><i class="fa-solid fa-bell"></i></div>
              <div style="font-weight: 900; font-size: 0.95rem; color: #2D3748;">${t.name}</div>
              <div class="team-buzz-key-badge" style="font-size: 0.7rem; color: #718096; background: #F1F3F5; padding: 2px 6px; border-radius: 4px; margin-top: 4px;">[ ${t.key} ]</div>
            </div>
          `).join('')}
        </div>

        <!-- Live Online Student Buzzers List (前三名搶答榜) -->
        <div style="flex: 1; background: #FFFDF9; border: 1.5px solid #FFE8CC; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; overflow-y: auto;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #D9480F; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span><i class="fa-solid fa-tower-broadcast"></i> 線上即時搶答榜 (毫秒反應時間)：</span>
            <span style="font-size: 0.72rem; color: #718096;">代碼: <strong>${getRoom()}</strong></span>
          </div>
          <div id="buzz-history-list" style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
            <div style="text-align: center; color: #A0AEC0; font-size: 0.85rem; padding: 16px 0;">尚未有人搶答，點擊「開始搶答」發布訊號</div>
          </div>
        </div>

        <!-- Controls Toolbar -->
        <div style="display: flex; gap: 6px; width: 100%;">
          <button class="action-btn-main" id="buzz-start-btn" style="flex: 1.2; height: 36px; font-size: 0.88rem; background: linear-gradient(135deg, #2B8A3E, #20C997);">
            <i class="fa-solid fa-play"></i> 開始搶答
          </button>
          <button class="action-btn-secondary" id="buzz-reset-btn" style="flex: 1; height: 36px; font-size: 0.88rem;">
            <i class="fa-solid fa-rotate-left"></i> 重置
          </button>
          <button class="action-btn-secondary" id="buzz-qr-btn" style="height: 36px; font-size: 0.82rem; padding: 0 12px;" title="放大手機搶答 QR Code">
            <i class="fa-solid fa-qrcode"></i> 手機掃碼
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂搶答神器',
      icon: 'fa-bell',
      iconColor: '#E63946',
      width: 480,
      height: 420,
      type: 'buzzer',
      contentHtml: content,
      onInit: (el) => {
        const banner = el.querySelector('#buzz-banner');
        const startBtn = el.querySelector('#buzz-start-btn');
        const resetBtn = el.querySelector('#buzz-reset-btn');
        const qrBtn = el.querySelector('#buzz-qr-btn');
        const cards = el.querySelectorAll('.team-buzz-card');
        const historyList = el.querySelector('#buzz-history-list');

        const room = getRoom();

        const triggerWinner = (winnerTitle, reactionMs, seatNum = null) => {
          if (locked) return;
          locked = true;

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
              <div style="font-weight: 800; font-size: 0.88rem; color: #2D3748; display: flex; align-items: center; gap: 6px;">
                <span>${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                <span>${h.name}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #E8590C; font-family: var(--font-num);">${h.reaction}s</span>
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
          locked = false;
          buzzStartTime = Date.now();
          buzzHistory = [];
          banner.innerHTML = '📢 搶答準備中！點擊按鈕、按鍵盤 1~4 或手機掃碼連線';
          banner.style.background = '#FFF9DB';
          banner.style.color = '#D9480F';
          banner.style.borderColor = '#FFE066';
          cards.forEach(c => c.style.background = '#FFF');
          renderHistory();

          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', { type: 'BUZZER_RESET' });
          }
          window.soundEngine.playTick();
        };

        // Start Buzzer Round
        startBtn.addEventListener('click', () => {
          resetAll();
          buzzStartTime = Date.now();
          banner.innerHTML = '🔥 搶答開始！學生請立即按下手機或卡片搶答！';
          banner.style.background = '#FFE3E3';
          banner.style.color = '#C92A2A';
          banner.style.borderColor = '#FFA8A8';
          window.soundEngine.playPop();
        });

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
            const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
            if (!buzzHistory.some(h => h.name === t.name)) {
              buzzHistory.push({ name: t.name, reaction: reaction });
              renderHistory();
            }
            triggerWinner(t.name, reaction);
          });
        });

        // Realtime Listener for Mobile Students
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('buzzer/buzz', (data) => {
            if (data.type === 'BUZZ_TRIGGERED') {
              const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
              if (!buzzHistory.some(h => h.name === data.name)) {
                buzzHistory.push({ name: data.name, reaction: reaction });
                renderHistory();
              }
              triggerWinner(data.name, reaction, data.seat);
            }
          });
        }
      }
    });
  },'''

if buzzer_start != -1 and picker_start != -1:
    text = text[:buzzer_start] + new_buzzer_code + '\n\n' + text[picker_start:]
    print("spawnBuzzer updated with cross-device realtime buzzer successfully!")

# 2. New spawnPoll with font-scaling and realtime MQTT
poll_start = text.find('  spawnPoll(wm) {')
rps_start = text.find('  spawnRPS(wm) {')

new_poll_code = '''  spawnPoll(wm) {
    let question = "今日上課重點都聽懂了嗎？";
    let votes = [
      { text: '😃 非常清楚 (聽懂了)', count: 0 },
      { text: '😐 還好 (尚可理解)', count: 0 },
      { text: '🙁 需加油 (還不太懂)', count: 0 }
    ];
    let isBlind = false;
    let pollFontSize = 1.0; // rem

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const templates = {
      smile: { q: '今日學習理解程度評估：', opts: ['😃 非常清楚', '😐 尚可理解', '🙁 還需要練習'] },
      thumbs: { q: '贊成進行這個提案嗎？', opts: ['👍 贊成', '👎 反對'] },
      abcd: { q: '這題正確答案是哪一個？', opts: ['🅰️ 選項 A', '🅱️ 選項 B', '🅲️ 選項 C', '🅳️ 選項 D'] },
      ox: { q: '請判斷下列敘述是非：', opts: ['⭕ 是 (正確)', '❌ 非 (錯誤)'] }
    };

    const content = `
      <div class="poll-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Controls: Templates + Font Scale Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px;">
          <!-- Template Chips -->
          <div style="display: flex; gap: 4px; overflow-x: auto;">
            <button class="preset-chip active" id="tpl-smile">😃 表情</button>
            <button class="preset-chip" id="tpl-thumbs">👍 贊同</button>
            <button class="preset-chip" id="tpl-abcd">🅰️ ABCD</button>
            <button class="preset-chip" id="tpl-ox">⭕ 是非</button>
          </div>

          <!-- Font Scaling Controls -->
          <div class="font-scale-controls" style="display: flex; gap: 3px; align-items: center;">
            <span style="font-size: 0.72rem; color: #718096; font-weight: bold;"><i class="fa-solid fa-text-height"></i> 字級:</span>
            <button type="button" class="font-scale-btn" id="poll-font-minus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="縮小投票字級">A-</button>
            <button type="button" class="font-scale-btn" id="poll-font-reset" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="預設字級">A</button>
            <button type="button" class="font-scale-btn" id="poll-font-plus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="放大投票字級">A+</button>
          </div>
        </div>

        <!-- Question Input -->
        <input type="text" class="poll-question-input" id="poll-q-input" value="${question}" placeholder="在此輸入投票題目..." style="width: 100%; padding: 8px 12px; font-size: 1.05rem; font-weight: 800; border: 2px solid #E2E8F0; border-radius: 10px; outline: none; background: #FFF;">

        <!-- Options Voting List -->
        <div class="poll-options-list" id="poll-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>

        <!-- Bottom Actions -->
        <div style="display: flex; gap: 6px; margin-top: 4px;">
          <button class="action-btn-main" id="poll-qr-big-btn" style="flex: 1.4; height: 34px; font-size: 0.82rem;">
            <i class="fa-solid fa-expand"></i> 學生手機掃碼投票
          </button>
          <button class="action-btn-secondary" id="poll-blind-toggle-btn" style="height: 34px; font-size: 0.82rem; padding: 0 10px;" title="盲投模式 (隱藏長條圖)">
            <i class="fa-solid fa-eye-slash"></i> 盲投
          </button>
          <button class="action-btn-secondary" id="poll-reset-btn" style="height: 34px; font-size: 0.82rem; padding: 0 10px;" title="重置票數">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂即時投票',
      icon: 'fa-square-poll-vertical',
      iconColor: '#4EA8DE',
      width: 440,
      height: 440,
      type: 'poll',
      contentHtml: content,
      onInit: (el) => {
        const qInput = el.querySelector('#poll-q-input');
        const listEl = el.querySelector('#poll-list');
        const resetBtn = el.querySelector('#poll-reset-btn');
        const qrBigBtn = el.querySelector('#poll-qr-big-btn');
        const blindToggleBtn = el.querySelector('#poll-blind-toggle-btn');

        const fontPlusBtn = el.querySelector('#poll-font-plus');
        const fontMinusBtn = el.querySelector('#poll-font-minus');
        const fontResetBtn = el.querySelector('#poll-font-reset');

        const room = getRoom();

        const broadcastPoll = () => {
          const pollData = { question: qInput.value.trim(), options: votes.map(v => v.text) };
          localStorage.setItem('puti_active_poll', JSON.stringify(pollData));
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('poll/state', { type: 'POLL_SYNC', poll: pollData });
          }
        };

        const render = () => {
          const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

          // Apply font size to question
          qInput.style.fontSize = (pollFontSize * 1.05) + 'rem';

          listEl.innerHTML = votes.map((v, i) => {
            const pct = totalVotes > 0 ? Math.round((v.count / totalVotes) * 100) : 0;
            return `
              <div class="poll-opt-row" style="background: #FFF; border: 1.5px solid #E9ECEF; border-radius: 12px; padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button type="button" class="poll-opt-btn" data-idx="${i}" style="border: none; background: none; font-weight: 800; font-size: ${pollFontSize}rem; color: #2D3748; cursor: pointer; text-align: left; padding: 0;">
                    ${v.text}
                  </button>
                  <span style="color: #FF7B00; font-weight: 900; font-size: ${pollFontSize * 0.95}rem; font-family: var(--font-num);">
                    ${isBlind ? '🔒 盲投中' : `${v.count} 票 (${pct}%)`}
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
              votes[idx].count++;
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

        // Template chips
        el.querySelectorAll('.preset-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            el.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const key = chip.id.replace('tpl-', '');
            if (templates[key]) {
              qInput.value = templates[key].q;
              votes = templates[key].opts.map(o => ({ text: o, count: 0 }));
              render();
              broadcastPoll();
              window.soundEngine.playPop();
            }
          });
        });

        qInput.addEventListener('input', broadcastPoll);

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
          votes.forEach(v => v.count = 0);
          render();
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('poll/state', { type: 'POLL_RESET' });
          }
          window.soundEngine.playTick();
        });

        qrBigBtn.addEventListener('click', () => {
          const origin = window.location.origin;
          const pollUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/student-poll.html?room=' + room;
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📊 學生手機/平板即時投票', pollUrl, `全班拿出手機對準掃描 (教室代碼: ${room})，投票即時同步大螢幕！`);
          }
        });

        // Realtime Listener for Mobile Students Voting
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('poll/vote', (data) => {
            if (data.type === 'VOTE_SUBMITTED') {
              const idx = data.optionIndex;
              if (votes[idx]) {
                votes[idx].count++;
                window.soundEngine.playPop();
                render();
              }
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
  },'''

if poll_start != -1 and rps_start != -1:
    text = text[:poll_start] + new_poll_code + '\n\n' + text[rps_start:]
    print("spawnPoll updated with font-scaling and realtime MQTT successfully!")

with open(widgets_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("widgets.js finished update!")
