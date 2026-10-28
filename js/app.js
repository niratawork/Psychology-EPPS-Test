/**
 * EPPS Online Assessment & Scoring Platform - Application Controller
 */

class EPPSApp {
  constructor() {
    this.scorer = new EPPSSCorer(EPPS_DATA);
    this.antiCheat = new AntiCheatGuard({
      onViolation: (count, reason) => this.handleSecurityViolation(count, reason)
    });

    this.participant = {
      name: "",
      gender: "LAKI-LAKI",
      education: "S1",
      normCode: 3
    };

    this.answers = {};
    this.currentQuestion = 1;
    this.viewMode = 'card'; // 'card' or 'sheet'
    this.sheetPage = 1;
    this.sheetPerPage = 25; // 25 questions per sheet page

    // Timer settings: 40 minutes = 2400 seconds
    this.totalDurationSeconds = 40 * 60;
    this.remainingSeconds = this.totalDurationSeconds;
    this.timerInterval = null;
    this.testStartTime = null;

    this.psychogramChart = null;
    this.radarChart = null;
    this.activeFilter = 'all'; // 'all', 'unanswered', 'answered'

    this.init();
  }

  init() {
    this.antiCheat.init();
    this.bindEvents();
    this.restoreSessionIfExists();
  }

  bindEvents() {
    // Form Registrasi
    const regForm = document.getElementById('reg-form');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitRegistration();
      });
    }

    // Gender/Pendidikan auto select norm
    const genderSelect = document.getElementById('reg-gender');
    const eduSelect = document.getElementById('reg-edu');
    if (genderSelect && eduSelect) {
      const updateNorm = () => {
        const g = genderSelect.value;
        const e = eduSelect.value;
        const isCollege = e === 'D3' || e === 'S1' || e === 'MAHASISWA';
        const normSelect = document.getElementById('reg-norm');
        if (normSelect) {
          if (isCollege) {
            normSelect.value = (g === 'LAKI-LAKI') ? '1' : '2';
          } else {
            normSelect.value = (g === 'LAKI-LAKI') ? '3' : '4';
          }
        }
      };
      genderSelect.addEventListener('change', updateNorm);
      eduSelect.addEventListener('change', updateNorm);
    }

    // Guidelines checkbox & start button
    const agreeCheck = document.getElementById('agree-guidelines');
    const btnStart = document.getElementById('btn-start-test');
    if (agreeCheck && btnStart) {
      agreeCheck.addEventListener('change', () => {
        btnStart.disabled = !agreeCheck.checked;
      });
      btnStart.addEventListener('click', () => {
        this.startTest();
      });
    }

    // Option A & B card buttons
    const optABox = document.getElementById('opt-a-box');
    const optBBox = document.getElementById('opt-b-box');
    if (optABox && optBBox) {
      optABox.addEventListener('click', () => this.selectAnswer('a'));
      optBBox.addEventListener('click', () => this.selectAnswer('b'));
    }

    // Question navigation buttons (prev / next)
    const btnPrev = document.getElementById('btn-prev-q');
    const btnNext = document.getElementById('btn-next-q');
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevQuestion());
    if (btnNext) btnNext.addEventListener('click', () => this.nextQuestion());

    // Jump to first unanswered
    const btnJumpUnans = document.getElementById('btn-jump-unanswered');
    if (btnJumpUnans) {
      btnJumpUnans.addEventListener('click', () => this.jumpToFirstUnanswered());
    }

    // View mode tabs (Card vs Sheet)
    const btnModeCard = document.getElementById('tab-mode-card');
    const btnModeSheet = document.getElementById('tab-mode-sheet');
    if (btnModeCard && btnModeSheet) {
      btnModeCard.addEventListener('click', () => this.setViewMode('card'));
      btnModeSheet.addEventListener('click', () => this.setViewMode('sheet'));
    }

    // Sheet pagination
    const btnSheetPrev = document.getElementById('sheet-prev');
    const btnSheetNext = document.getElementById('sheet-next');
    if (btnSheetPrev && btnSheetNext) {
      btnSheetPrev.addEventListener('click', () => {
        if (this.sheetPage > 1) {
          this.sheetPage--;
          this.renderSheetView();
        }
      });
      btnSheetNext.addEventListener('click', () => {
        const maxPages = Math.ceil(EPPS_DATA.questions.length / this.sheetPerPage);
        if (this.sheetPage < maxPages) {
          this.sheetPage++;
          this.renderSheetView();
        }
      });
    }

    // Submit test button
    const btnFinish = document.getElementById('btn-finish-test');
    if (btnFinish) {
      btnFinish.addEventListener('click', () => this.promptSubmitConfirmation());
    }

    // Confirm submit in modal
    const btnConfirmSubmit = document.getElementById('btn-confirm-submit');
    if (btnConfirmSubmit) {
      btnConfirmSubmit.addEventListener('click', () => {
        this.closeModal('submit-modal');
        this.finishTest();
      });
    }

    // Filter Navigator Grid
    const filterAll = document.getElementById('filter-all');
    const filterUnans = document.getElementById('filter-unanswered');
    const filterAns = document.getElementById('filter-answered');
    if (filterAll && filterUnans && filterAns) {
      filterAll.addEventListener('click', () => this.setNavigatorFilter('all'));
      filterUnans.addEventListener('click', () => this.setNavigatorFilter('unanswered'));
      filterAns.addEventListener('click', () => this.setNavigatorFilter('answered'));
    }

    // Keyboard Shortcuts (A, B, Arrows)
    document.addEventListener('keydown', (e) => {
      const activeScreen = document.querySelector('.screen.active');
      if (!activeScreen || activeScreen.id !== 'test-screen') return;

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'a' || e.key === 'A') {
        this.selectAnswer('a');
      } else if (e.key === 'b' || e.key === 'B') {
        this.selectAnswer('b');
      } else if (e.key === 'ArrowLeft') {
        this.prevQuestion();
      } else if (e.key === 'ArrowRight') {
        this.nextQuestion();
      }
    });

    // Report Actions: Print / PDF
    const btnPrint = document.getElementById('btn-print-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // Report Actions: Download JSON
    const btnDownload = document.getElementById('btn-download-results');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => this.downloadResultsJSON());
    }

    // Report Actions: Retake Test
    const btnRetake = document.getElementById('btn-retake-test');
    if (btnRetake) {
      btnRetake.addEventListener('click', () => {
        if (confirm("Mulai tes baru? Data tes saat ini akan direset.")) {
          this.resetTest();
        }
      });
    }

    // Demo Sample Data Loader
    const btnLoadDemo = document.getElementById('btn-load-demo');
    if (btnLoadDemo) {
      btnLoadDemo.addEventListener('click', () => this.loadDemoSample());
    }

    // Quick Fill Answers on Test Screen (for testing without changing candidate name)
    const btnQuickFill = document.getElementById('btn-quick-fill-test');
    if (btnQuickFill) {
      btnQuickFill.addEventListener('click', () => this.quickFillTestAnswers());
    }

    // View Answers Detail Button
    const btnViewAnswers = document.getElementById('btn-view-answers');
    if (btnViewAnswers) {
      btnViewAnswers.addEventListener('click', () => this.openAnswersModal());
    }

    // Share / QR Code Modal Button
    const btnOpenShare = document.getElementById('btn-open-share');
    if (btnOpenShare) {
      btnOpenShare.addEventListener('click', () => this.openShareModal());
    }

    const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
    if (btnCopyShareUrl) {
      btnCopyShareUrl.addEventListener('click', () => {
        const input = document.getElementById('share-url-input');
        if (input) {
          input.select();
          navigator.clipboard.writeText(input.value);
          this.antiCheat.showToastWarning("Tautan berhasil disalin ke clipboard!");
        }
      });
    }
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  submitRegistration() {
    const nameInput = document.getElementById('reg-name');
    const name = nameInput ? nameInput.value.trim() : '';
    const gender = document.getElementById('reg-gender').value;
    const edu = document.getElementById('reg-edu').value;
    const norm = parseInt(document.getElementById('reg-norm').value, 10);

    if (!name) {
      alert("Silakan masukkan nama lengkap Anda.");
      if (nameInput) nameInput.focus();
      return;
    }

    this.participant = {
      name,
      gender,
      education: edu,
      normCode: norm
    };

    // Simpan ke sessionStorage agar tidak hilang jika halaman ter-refresh
    sessionStorage.setItem('epps_participant', JSON.stringify(this.participant));

    // Update guidelines badge
    const participantLabel = document.getElementById('guideline-participant-info');
    if (participantLabel) {
      participantLabel.textContent = `${name} (${gender}, ${edu} - Norma: ${EPPS_DATA.normLabels[norm] || 'Umum'})`;
    }

    this.showScreen('guidelines-screen');
  }

  startTest() {
    // Request fullscreen if supported for security
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    document.body.classList.add('secure-mode');

    // Pastikan identitas kandidat tidak hilang saat navigasi
    if (!this.participant || !this.participant.name) {
      try {
        const stored = sessionStorage.getItem('epps_participant');
        if (stored) this.participant = JSON.parse(stored);
      } catch(e) {}
    }
    if (!this.participant || !this.participant.name) {
      const regName = document.getElementById('reg-name');
      const val = regName ? regName.value.trim() : '';
      this.participant = {
        name: val || "Peserta EPPS",
        gender: document.getElementById('reg-gender') ? document.getElementById('reg-gender').value : 'LAKI-LAKI',
        education: document.getElementById('reg-edu') ? document.getElementById('reg-edu').value : 'S1',
        normCode: document.getElementById('reg-norm') ? parseInt(document.getElementById('reg-norm').value, 10) : 3
      };
      sessionStorage.setItem('epps_participant', JSON.stringify(this.participant));
    }

    // Activate Anti-Cheat Guard with participant's identity
    const pCode = "EPPS-" + Math.floor(100000 + Math.random() * 900000);
    this.antiCheat.activate(this.participant.name, pCode);

    // Update UI elements in test topbar
    const nameEl = document.getElementById('test-bar-name');
    if (nameEl) nameEl.textContent = this.participant.name;

    const metaEl = document.getElementById('test-bar-meta');
    if (metaEl) {
      const normLabel = (EPPS_DATA.normLabels && EPPS_DATA.normLabels[this.participant.normCode]) ? EPPS_DATA.normLabels[this.participant.normCode] : 'Umum';
      metaEl.textContent = `${this.participant.gender} • ${this.participant.education} • Norma: ${normLabel}`;
    }

    // Start Timer (40 minutes)
    this.initTimer();

    // Render questions and navigator grid
    this.renderQuestionCard();
    this.renderNavigatorGrid();
    this.updateProgress();

    this.showScreen('test-screen');
  }

  initTimer() {
    // Check if session start time exists in sessionStorage
    const storedStartTime = sessionStorage.getItem('epps_timer_start');
    const now = Date.now();

    if (storedStartTime) {
      const elapsed = Math.floor((now - parseInt(storedStartTime, 10)) / 1000);
      this.remainingSeconds = Math.max(0, this.totalDurationSeconds - elapsed);
    } else {
      sessionStorage.setItem('epps_timer_start', now.toString());
      this.remainingSeconds = this.totalDurationSeconds;
    }

    this.updateTimerDisplay();

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.remainingSeconds = 0;
        this.updateTimerDisplay();
        this.antiCheat.showToastWarning("Waktu 40 menit telah habis! Mengumpulkan jawaban otomatis...");
        setTimeout(() => {
          this.finishTest(true); // force submit
        }, 1200);
        return;
      }

      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timerEl = document.getElementById('test-timer-val');
    const timerBox = document.getElementById('test-timer-box');
    if (timerEl) timerEl.textContent = formatted;

    if (timerBox) {
      timerBox.classList.remove('timer-warning', 'timer-danger');
      if (this.remainingSeconds <= 60) {
        timerBox.classList.add('timer-danger');
      } else if (this.remainingSeconds <= 300) {
        timerBox.classList.add('timer-warning');
      }
    }
  }

  renderQuestionCard() {
    const qData = EPPS_DATA.questions[this.currentQuestion - 1];
    if (!qData) return;

    // Question number
    const numEl = document.getElementById('card-q-num');
    if (numEl) numEl.textContent = `Soal #${qData.no} dari 225`;

    // Statement A & B
    const textA = document.getElementById('opt-a-text');
    const textB = document.getElementById('opt-b-text');
    if (textA) textA.textContent = qData.a;
    if (textB) textB.textContent = qData.b;

    // Current selection state
    const currentAns = this.answers[this.currentQuestion];
    const optABox = document.getElementById('opt-a-box');
    const optBBox = document.getElementById('opt-b-box');

    if (optABox) {
      optABox.classList.toggle('selected', currentAns === 'a');
    }
    if (optBBox) {
      optBBox.classList.toggle('selected', currentAns === 'b');
    }

    // Previous/Next button states
    const btnPrev = document.getElementById('btn-prev-q');
    const btnNext = document.getElementById('btn-next-q');
    if (btnPrev) btnPrev.disabled = this.currentQuestion <= 1;
    if (btnNext) btnNext.disabled = this.currentQuestion >= EPPS_DATA.questions.length;

    this.highlightActiveGridCell();
  }

  selectAnswer(choice) {
    this.answers[this.currentQuestion] = choice.toLowerCase();

    // Visual feedback
    const optABox = document.getElementById('opt-a-box');
    const optBBox = document.getElementById('opt-b-box');
    if (optABox && optBBox) {
      optABox.classList.toggle('selected', choice === 'a');
      optBBox.classList.toggle('selected', choice === 'b');
    }

    // Update navigator cell
    const cell = document.getElementById(`grid-cell-${this.currentQuestion}`);
    if (cell) cell.classList.add('answered');

    this.updateProgress();

    // Auto advance to next question smoothly after short delay
    if (this.currentQuestion < EPPS_DATA.questions.length) {
      setTimeout(() => {
        this.nextQuestion();
      }, 140);
    } else {
      // If last question, check if any remaining unanswered
      this.checkCompletionNotice();
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
      this.renderQuestionCard();
    }
  }

  nextQuestion() {
    if (this.currentQuestion < EPPS_DATA.questions.length) {
      this.currentQuestion++;
      this.renderQuestionCard();
    }
  }

  goToQuestion(num) {
    if (num >= 1 && num <= EPPS_DATA.questions.length) {
      this.currentQuestion = num;
      if (this.viewMode === 'card') {
        this.renderQuestionCard();
      } else {
        // Find which sheet page contains this question
        this.sheetPage = Math.ceil(num / this.sheetPerPage);
        this.renderSheetView();
      }
    }
  }

  jumpToFirstUnanswered() {
    for (let q = 1; q <= EPPS_DATA.questions.length; q++) {
      if (!this.answers[q]) {
        this.goToQuestion(q);
        return;
      }
    }
    this.antiCheat.showToastWarning("Luar biasa! Semua 225 soal telah terjawab lengkap.");
  }

  updateProgress() {
    const answeredCount = Object.keys(this.answers).length;
    const total = EPPS_DATA.questions.length;
    const pct = Math.round((answeredCount / total) * 100);

    const progressFill = document.getElementById('test-progress-fill');
    if (progressFill) progressFill.style.width = `${pct}%`;

    const summaryText = document.getElementById('nav-answered-summary');
    if (summaryText) {
      summaryText.textContent = `${answeredCount} / ${total} Terjawab (${pct}%)`;
    }

    const filterUnansBtn = document.getElementById('filter-unanswered');
    if (filterUnansBtn) {
      filterUnansBtn.textContent = `Kosong (${total - answeredCount})`;
    }

    const filterAnsBtn = document.getElementById('filter-answered');
    if (filterAnsBtn) {
      filterAnsBtn.textContent = `Terjawab (${answeredCount})`;
    }

    this.checkCompletionNotice();
  }

  checkCompletionNotice() {
    const answeredCount = Object.keys(this.answers).length;
    const total = EPPS_DATA.questions.length;
    const banner = document.getElementById('test-completion-notice');
    if (banner) {
      if (answeredCount === total) {
        banner.style.display = 'flex';
        banner.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span><strong>Notifikasi C684:</strong> Jawaban sudah lengkap! Seluruh 225 pasangan soal telah Anda isi. Anda dapat mengumpulkan tes sekarang.</span>
        `;
      } else {
        banner.style.display = 'none';
      }
    }
  }

  renderNavigatorGrid() {
    const gridContainer = document.getElementById('navigator-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    const total = EPPS_DATA.questions.length;

    for (let q = 1; q <= total; q++) {
      const cell = document.createElement('button');
      cell.id = `grid-cell-${q}`;
      cell.className = 'grid-cell';
      cell.textContent = q;

      if (this.answers[q]) {
        cell.classList.add('answered');
      }
      if (q === this.currentQuestion) {
        cell.classList.add('current');
      }

      cell.addEventListener('click', () => {
        this.goToQuestion(q);
      });

      gridContainer.appendChild(cell);
    }
  }

  highlightActiveGridCell() {
    document.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('current'));
    const activeCell = document.getElementById(`grid-cell-${this.currentQuestion}`);
    if (activeCell) {
      activeCell.classList.add('current');
      activeCell.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  setNavigatorFilter(filter) {
    this.activeFilter = filter;
    ['filter-all', 'filter-unanswered', 'filter-answered'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove('active');
    });

    const activeBtn = document.getElementById(`filter-${filter}`);
    if (activeBtn) activeBtn.classList.add('active');

    const total = EPPS_DATA.questions.length;
    for (let q = 1; q <= total; q++) {
      const cell = document.getElementById(`grid-cell-${q}`);
      if (!cell) continue;

      const isAns = !!this.answers[q];
      if (filter === 'all') {
        cell.style.display = 'flex';
      } else if (filter === 'unanswered') {
        cell.style.display = isAns ? 'none' : 'flex';
      } else if (filter === 'answered') {
        cell.style.display = isAns ? 'flex' : 'none';
      }
    }
  }

  setViewMode(mode) {
    this.viewMode = mode;
    const cardWrap = document.getElementById('card-view-wrapper');
    const sheetWrap = document.getElementById('sheet-view-wrapper');
    const tabCard = document.getElementById('tab-mode-card');
    const tabSheet = document.getElementById('tab-mode-sheet');

    if (mode === 'card') {
      if (cardWrap) cardWrap.style.display = 'block';
      if (sheetWrap) sheetWrap.style.display = 'none';
      if (tabCard) tabCard.classList.add('active');
      if (tabSheet) tabSheet.classList.remove('active');
      this.renderQuestionCard();
    } else {
      if (cardWrap) cardWrap.style.display = 'none';
      if (sheetWrap) sheetWrap.style.display = 'block';
      if (tabCard) tabCard.classList.remove('active');
      if (tabSheet) tabSheet.classList.add('active');
      this.renderSheetView();
    }
  }

  renderSheetView() {
    const tableBody = document.getElementById('sheet-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIdx = (this.sheetPage - 1) * this.sheetPerPage;
    const endIdx = Math.min(startIdx + this.sheetPerPage, EPPS_DATA.questions.length);
    const pageQuestions = EPPS_DATA.questions.slice(startIdx, endIdx);

    pageQuestions.forEach(q => {
      const tr = document.createElement('tr');
      const isAns = !!this.answers[q.no];
      if (isAns) tr.classList.add('answered-row');

      const ans = this.answers[q.no] || '';

      tr.innerHTML = `
        <td style="font-weight: 700; width: 60px;">#${q.no}</td>
        <td style="width: 42%;"><span style="font-weight: 700; color: #2563eb;">A:</span> ${q.a}</td>
        <td style="width: 42%;"><span style="font-weight: 700; color: #2563eb;">B:</span> ${q.b}</td>
        <td style="width: 16%; text-align: center;">
          <div class="sheet-choice-group">
            <button class="sheet-choice-btn ${ans === 'a' ? 'selected' : ''}" data-q="${q.no}" data-opt="a">A</button>
            <button class="sheet-choice-btn ${ans === 'b' ? 'selected' : ''}" data-q="${q.no}" data-opt="b">B</button>
          </div>
        </td>
      `;

      tr.querySelectorAll('.sheet-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const qNum = parseInt(e.target.getAttribute('data-q'), 10);
          const opt = e.target.getAttribute('data-opt');
          this.answers[qNum] = opt;
          this.currentQuestion = qNum;

          tr.querySelectorAll('.sheet-choice-btn').forEach(b => b.classList.remove('selected'));
          e.target.classList.add('selected');
          tr.classList.add('answered-row');

          const cell = document.getElementById(`grid-cell-${qNum}`);
          if (cell) cell.classList.add('answered');

          this.updateProgress();
        });
      });

      tableBody.appendChild(tr);
    });

    // Pagination info
    const maxPages = Math.ceil(EPPS_DATA.questions.length / this.sheetPerPage);
    const pageInfo = document.getElementById('sheet-page-info');
    if (pageInfo) pageInfo.textContent = `Halaman ${this.sheetPage} dari ${maxPages} (Soal ${startIdx + 1} - ${endIdx})`;

    const btnPrev = document.getElementById('sheet-prev');
    const btnNext = document.getElementById('sheet-next');
    if (btnPrev) btnPrev.disabled = this.sheetPage <= 1;
    if (btnNext) btnNext.disabled = this.sheetPage >= maxPages;
  }

  promptSubmitConfirmation() {
    const answeredCount = Object.keys(this.answers).length;
    const total = EPPS_DATA.questions.length;
    const remaining = total - answeredCount;

    const modalTitle = document.getElementById('modal-submit-title');
    const modalDesc = document.getElementById('modal-submit-desc');
    const modalAlert = document.getElementById('modal-submit-alert');

    if (remaining > 0) {
      if (modalTitle) modalTitle.textContent = "Masih Ada Soal Yang Belum Diisi!";
      if (modalDesc) {
        modalDesc.innerHTML = `Anda baru mengisi <strong>${answeredCount}</strong> dari <strong>${total}</strong> soal. Terdapat <strong>${remaining} soal yang masih kosong</strong>. Sesuai petunjuk tes EPPS, disarankan mengisi semua soal agar hasil skoring akurat.`;
      }
      if (modalAlert) {
        modalAlert.style.display = 'block';
        modalAlert.className = 'notice-banner';
        modalAlert.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path></svg>
          <div>Apakah Anda yakin ingin menyelesaikan sekarang atau kembali untuk melengkapi?</div>
        `;
      }
    } else {
      if (modalTitle) modalTitle.textContent = "Konfirmasi Pengumpulan Jawaban";
      if (modalDesc) {
        modalDesc.innerHTML = `Seluruh <strong>225 soal</strong> telah berhasil Anda jawab dengan lengkap! Sistem siap melakukan perhitungan skoring psikologis otomatis.`;
      }
      if (modalAlert) {
        modalAlert.style.display = 'block';
        modalAlert.className = 'notice-banner';
        modalAlert.style.background = '#ecfdf5';
        modalAlert.style.borderColor = '#a7f3d0';
        modalAlert.style.color = '#065f46';
        modalAlert.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <div>Notifikasi cell C684: <strong>"Jawaban sudah lengkap"</strong>. Siap untuk skoring!</div>
        `;
      }
    }

    this.openModal('submit-modal');
  }

  finishTest(force = false) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    sessionStorage.removeItem('epps_timer_start');

    this.antiCheat.deactivate();
    document.body.classList.remove('secure-mode');

    // Pastikan identitas kandidat tidak pernah kosong
    if (!this.participant || !this.participant.name) {
      try {
        const stored = sessionStorage.getItem('epps_participant');
        if (stored) this.participant = JSON.parse(stored);
      } catch(e) {}
    }
    if (!this.participant || !this.participant.name) {
      const regName = document.getElementById('reg-name');
      const val = regName ? regName.value.trim() : '';
      this.participant = {
        name: val || "Peserta EPPS",
        gender: document.getElementById('reg-gender') ? document.getElementById('reg-gender').value : 'LAKI-LAKI',
        education: document.getElementById('reg-edu') ? document.getElementById('reg-edu').value : 'S1',
        normCode: document.getElementById('reg-norm') ? parseInt(document.getElementById('reg-norm').value, 10) : 3
      };
    }

    // Run scoring calculation
    this.results = this.scorer.calculate(this.answers, this.participant.normCode, this.participant);
    this.results.security = this.antiCheat.getSecurityReport();
    this.results.answers = this.answers;

    // Send submission payload to Server API for HR
    const payload = {
      participant: this.participant,
      normCode: this.participant.normCode,
      normName: (EPPS_DATA.normLabelsBilingual && EPPS_DATA.normLabelsBilingual[this.participant.normCode]) ?
        EPPS_DATA.normLabelsBilingual[this.participant.normCode].id : (EPPS_DATA.normLabels[this.participant.normCode] || "Umum"),
      totalRS: this.results.totalRS,
      consistency: this.results.consistency,
      security: this.results.security,
      factorScores: this.results.factorScores,
      answers: this.answers
    };

    console.log("Mengirim submisi hasil tes kandidat ke server HR:", payload.participant.name, payload);

    // Auto-detect endpoint (handles both http:// and file:// testing)
    const apiUrl = window.location.protocol === 'file:' 
      ? 'http://localhost:8000/api/submit-test' 
      : '/api/submit-test';

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error("HTTP error " + res.status);
      return res.json();
    })
    .then(data => {
      console.log("Submisi sukses tersimpan ke HR:", data);
      this.showCompletionScreen(data.id || "EPPS-" + Date.now().toString().slice(-6), false);
    })
    .catch(err => {
      console.warn("Gagal terhubung ke server HR:", err);
      this.showCompletionScreen("OFFLINE-" + Date.now().toString().slice(-6), true);
    });
  }

  showCompletionScreen(subId, isOffline = false) {
    const nameEl = document.getElementById('completion-candidate-name');
    if (nameEl) nameEl.textContent = (this.participant && this.participant.name) ? this.participant.name : "Peserta";

    const idEl = document.getElementById('completion-session-id');
    if (idEl) idEl.textContent = subId ? `#${subId}` : "EPPS-REC-DONE";

    const timeEl = document.getElementById('completion-timestamp');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleString('id-ID', {
        dateStyle: 'full', timeStyle: 'medium'
      });
    }

    const statusEl = document.getElementById('completion-status-text');
    if (statusEl) {
      if (isOffline) {
        statusEl.innerHTML = `<span style="color: #d97706; font-weight: 700;">Tersimpan Offline (Server Belum Aktif)</span>`;
      } else {
        statusEl.innerHTML = `<span style="color: #059669; font-weight: 700;">Tersimpan ke Database HR</span>`;
      }
    }

    this.showScreen('completion-screen');
  }

  renderResults() {
    const res = this.results;
    if (!res) return;

    // Participant Bio
    document.getElementById('res-name').textContent = res.participant.name || "-";
    document.getElementById('res-gender').textContent = res.participant.gender || "-";
    document.getElementById('res-edu').textContent = res.participant.education || "-";
    document.getElementById('res-norm').textContent = `${res.normName} (Kode ${res.normCode})`;
    document.getElementById('res-date').textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Integrity Log Badge
    const secStatusEl = document.getElementById('res-security-status');
    if (secStatusEl) {
      secStatusEl.textContent = `${res.security.status} (${res.security.violationCount}x insiden)`;
    }

    // Consistency Card
    const con = res.consistency;
    const conScoreEl = document.getElementById('res-con-score');
    const conPctEl = document.getElementById('res-con-pct');
    const conKatEl = document.getElementById('res-con-kat');
    const conBox = document.getElementById('res-validity-box');
    const conStatusText = document.getElementById('res-validity-status-text');

    if (conScoreEl) conScoreEl.textContent = `${con.score} / 15`;
    if (conPctEl) conPctEl.textContent = `${con.percentile}%`;
    if (conKatEl) conKatEl.textContent = con.category;

    if (conBox && conStatusText) {
      if (con.isValid) {
        conBox.className = 'validity-card';
        conStatusText.textContent = `Hasil tes dinyatakan VALID dan KONSISTEN (Skor konsistensi ${con.score}/15). Profil dapat diinterpretasikan dengan akurasi tinggi.`;
      } else {
        conBox.className = 'validity-card invalid';
        conStatusText.textContent = `Peringatan: Skor konsistensi rendah (${con.score}/15 - ${con.category}). Peserta kemungkinan menjawab secara acak, ragu-ragu, atau defensif. Hasil tes perlu dikonfirmasi kembali melalui wawancara psikologis.`;
      }
    }

    // Populate Table
    const tableBody = document.getElementById('scoring-table-body');
    if (tableBody) {
      tableBody.innerHTML = '';
      res.factorList.forEach(f => {
        const item = res.factorScores[f];
        const tr = document.createElement('tr');
        const badgeClass = `badge-${item.categoryKey.replace('_', '-')}`;

        tr.innerHTML = `
          <td><strong>${f.toUpperCase()}</strong></td>
          <td>
            <div style="font-weight: 600;">${item.meta.name || f}</div>
            <div style="font-size: 0.78rem; color: #64748b;">${item.meta.desc || ''}</div>
          </td>
          <td style="text-align: center;">${item.r}</td>
          <td style="text-align: center;">${item.c}</td>
          <td style="text-align: center; font-weight: 700;">${item.rs}</td>
          <td style="text-align: center; font-weight: 700; color: #2563eb;">${item.pct}%</td>
          <td><span class="badge-category ${badgeClass}">${item.category}</span></td>
        `;
        tableBody.appendChild(tr);
      });

      // Total row in footer
      const totalRSEl = document.getElementById('table-total-rs');
      if (totalRSEl) {
        totalRSEl.textContent = `${res.totalRS} / 210`;
      }
    }

    // Render Charts
    this.renderCharts(res);

    // Render Narratives
    this.renderNarratives(res);
  }

  renderCharts(res) {
    if (typeof Chart === 'undefined') {
      console.warn("Chart.js not loaded.");
      return;
    }

    const labels = res.factorList.map(f => f.toUpperCase());
    const percentiles = res.factorList.map(f => res.factorScores[f].pct);
    const rawScores = res.factorList.map(f => res.factorScores[f].rs);

    // 1. Psychogram Bar Chart
    const ctxBar = document.getElementById('psychogramCanvas');
    if (ctxBar) {
      if (this.psychogramChart) this.psychogramChart.destroy();

      const barColors = percentiles.map(p => {
        if (p <= 3) return '#ef4444'; // Red (Sangat Rendah)
        if (p <= 16) return '#f59e0b'; // Amber (Rendah)
        if (p <= 84) return '#3b82f6'; // Blue (Sedang)
        if (p <= 96) return '#10b981'; // Green (Tinggi)
        return '#8b5cf6'; // Purple (Sangat Tinggi)
      });

      this.psychogramChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Persentil (%)',
            data: percentiles,
            backgroundColor: barColors,
            borderRadius: 6,
            barThickness: 20
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                afterLabel: (ctx) => {
                  const f = res.factorList[ctx.dataIndex];
                  const item = res.factorScores[f];
                  return `Raw Score (RS): ${item.rs} (r:${item.r}, c:${item.c})\nKategori: ${item.category}`;
                }
              }
            }
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { stepSize: 20 },
              grid: { color: '#e2e8f0' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // 2. Radar Chart
    const ctxRadar = document.getElementById('radarCanvas');
    if (ctxRadar) {
      if (this.radarChart) this.radarChart.destroy();

      this.radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Profil Kebutuhan EPPS (Persentil)',
            data: percentiles,
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: '#2563eb',
            borderWidth: 2,
            pointBackgroundColor: '#2563eb',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { display: false },
              grid: { color: '#e2e8f0' },
              angleLines: { color: '#e2e8f0' }
            }
          },
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  }

  renderNarratives(res) {
    const container = document.getElementById('narratives-container');
    if (!container) return;

    container.innerHTML = '';

    res.factorList.forEach(f => {
      const item = res.factorScores[f];
      const div = document.createElement('div');
      div.className = 'narrative-item';

      div.innerHTML = `
        <div class="narrative-title-row">
          <div class="narrative-title">${item.meta.name} (${f.toUpperCase()}) - ${item.meta.desc}</div>
          <div class="narrative-score-info">
            <span class="badge-category badge-${item.categoryKey.replace('_', '-')}">${item.category}</span>
            <span style="font-weight: 700; color: #2563eb;">Persentil: ${item.pct}%</span>
            <span style="color: #64748b;">(RS: ${item.rs})</span>
          </div>
        </div>
        <p class="narrative-desc">${item.narrative || "Tidak ada interpretasi naratif khusus untuk skor ini."}</p>
      `;

      container.appendChild(div);
    });
  }

  downloadResultsJSON() {
    if (!this.results) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.results, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `EPPS_Hasil_${this.participant.name.replace(/\s+/g, '_')}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  openShareModal() {
    const urlInput = document.getElementById('share-url-input');
    const qrContainer = document.getElementById('qrcode-container');
    const currentUrl = window.location.href;

    if (urlInput) {
      urlInput.value = currentUrl;
    }

    if (qrContainer && typeof QRCode !== 'undefined') {
      qrContainer.innerHTML = '';
      try {
        new QRCode(qrContainer, {
          text: currentUrl,
          width: 180,
          height: 180,
          colorDark: "#0f172a",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      } catch (err) {
        qrContainer.innerHTML = `<p style="color: #64748b;">${currentUrl}</p>`;
      }
    }

    this.openModal('share-modal');
  }

  openAnswersModal() {
    const modalBody = document.getElementById('modal-answers-list');
    if (!modalBody) return;

    modalBody.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'sheet-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>No</th>
          <th>Pilihan</th>
          <th>Pernyataan Terpilih</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tb = table.querySelector('tbody');
    EPPS_DATA.questions.forEach(q => {
      const ans = this.answers[q.no] || '-';
      const selectedText = ans === 'a' ? q.a : ans === 'b' ? q.b : '<span style="color: red;">Kosong</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">#${q.no}</td>
        <td style="text-align: center; font-weight: 800; color: #2563eb;">${ans.toUpperCase()}</td>
        <td>${selectedText}</td>
      `;
      tb.appendChild(tr);
    });

    modalBody.appendChild(table);
    this.openModal('answers-modal');
  }

  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }

  handleSecurityViolation(count, reason) {
    const counterNav = document.getElementById('violation-counter-nav');
    if (counterNav) {
      counterNav.textContent = count;
      counterNav.parentElement.classList.add('has-violations');
    }
  }

  getSampleAnswers() {
    return {
      1:"b", 2:"b", 3:"b", 4:"a", 5:"b", 6:"b", 7:"a", 8:"a", 9:"b", 10:"b",
      11:"a", 12:"b", 13:"b", 14:"b", 15:"b", 16:"a", 17:"a", 18:"a", 19:"a", 20:"a",
      21:"a", 22:"b", 23:"a", 24:"a", 25:"b", 26:"a", 27:"a", 28:"a", 29:"a", 30:"b",
      31:"b", 32:"b", 33:"a", 34:"a", 35:"a", 36:"b", 37:"b", 38:"a", 39:"a", 40:"b",
      41:"b", 42:"b", 43:"a", 44:"b", 45:"b", 46:"a", 47:"a", 48:"a", 49:"b", 50:"b",
      51:"a", 52:"b", 53:"b", 54:"b", 55:"a", 56:"b", 57:"a", 58:"a", 59:"a", 60:"a",
      61:"b", 62:"b", 63:"a", 64:"b", 65:"b", 66:"b", 67:"b", 68:"a", 69:"b", 70:"b",
      71:"a", 72:"a", 73:"a", 74:"b", 75:"a", 76:"b", 77:"b", 78:"b", 79:"b", 80:"a",
      81:"b", 82:"a", 83:"b", 84:"a", 85:"b", 86:"b", 87:"b", 88:"b", 89:"b", 90:"b",
      91:"b", 92:"a", 93:"b", 94:"a", 95:"a", 96:"b", 97:"a", 98:"a", 99:"a", 100:"a",
      101:"a", 102:"b", 103:"b", 104:"a", 105:"a", 106:"b", 107:"b", 108:"a", 109:"a", 110:"a",
      111:"b", 112:"b", 113:"a", 114:"b", 115:"b", 116:"a", 117:"b", 118:"b", 119:"b", 120:"b",
      121:"b", 122:"a", 123:"b", 124:"a", 125:"b", 126:"a", 127:"b", 128:"b", 129:"b", 130:"b",
      131:"b", 132:"b", 133:"b", 134:"b", 135:"a", 136:"b", 137:"a", 138:"b", 139:"b", 140:"b",
      141:"b", 142:"b", 143:"b", 144:"b", 145:"b", 146:"b", 147:"a", 148:"a", 149:"b", 150:"a",
      151:"b", 152:"b", 153:"b", 154:"b", 155:"a", 156:"b", 157:"b", 158:"a", 159:"a", 160:"a",
      161:"b", 162:"b", 163:"a", 164:"a", 165:"b", 166:"b", 167:"a", 168:"a", 169:"a", 170:"b",
      171:"b", 172:"a", 173:"a", 174:"a", 175:"b", 176:"a", 177:"a", 178:"a", 179:"a", 180:"b",
      181:"a", 182:"a", 183:"a", 184:"a", 185:"b", 186:"a", 187:"a", 188:"b", 189:"a", 190:"a",
      191:"a", 192:"a", 193:"a", 194:"a", 195:"b", 196:"a", 197:"b", 198:"a", 199:"a", 200:"a",
      201:"a", 202:"b", 203:"a", 204:"a", 205:"b", 206:"a", 207:"a", 208:"a", 209:"b", 210:"b",
      211:"b", 212:"b", 213:"a", 214:"b", 215:"b", 216:"b", 217:"b", 218:"a", 219:"b", 220:"b",
      221:"b", 222:"a", 223:"a", 224:"a", 225:"a"
    };
  }

  loadDemoSample() {
    // Memuat jawaban demo dengan MEMPERTAHANKAN nama yang diketik oleh peserta/user
    const nameInput = document.getElementById('reg-name');
    const existingName = (nameInput ? nameInput.value.trim() : '') || (this.participant && this.participant.name ? this.participant.name.trim() : '');
    const finalName = existingName || "Hendri Hermanto (Contoh)";

    const genderInput = document.getElementById('reg-gender');
    const existingGender = (genderInput && genderInput.value) ? genderInput.value : 'LAKI-LAKI';

    const eduInput = document.getElementById('reg-edu');
    const existingEdu = (eduInput && eduInput.value) ? eduInput.value : 'S1';

    const normInput = document.getElementById('reg-norm');
    const existingNorm = (normInput && normInput.value) ? parseInt(normInput.value, 10) : 3;

    if (nameInput) nameInput.value = finalName;

    this.participant = {
      name: finalName,
      gender: existingGender,
      education: existingEdu,
      normCode: existingNorm
    };

    // Simpan ke sessionStorage agar aman jika browser di-refresh
    sessionStorage.setItem('epps_participant', JSON.stringify(this.participant));

    this.answers = { ...this.getSampleAnswers() };
    alert(`225 Jawaban contoh berhasil dimuat untuk kandidat: "${finalName}".\nAnda akan diarahkan ke halaman pedoman & tes. Klik "Selesai & Kumpulkan" untuk mengirim ke Portal HR.`);
    this.submitRegistration();
  }

  quickFillTestAnswers() {
    // Memungkinkan penguji mengisi 225 jawaban simulasi langsung di layar tes tanpa merubah nama
    const candidateName = (this.participant && this.participant.name) ? this.participant.name : "Kandidat";
    this.answers = { ...this.getSampleAnswers() };

    for (let q = 1; q <= EPPS_DATA.questions.length; q++) {
      const cell = document.getElementById(`grid-cell-${q}`);
      if (cell) cell.classList.add('answered');
    }

    this.updateProgress();

    if (this.viewMode === 'card') {
      this.renderQuestionCard();
    } else {
      this.renderSheetView();
    }

    this.antiCheat.showToastWarning(`225 Jawaban simulasi terisi untuk ${candidateName}! Klik 'Selesai & Kumpulkan Jawaban'.`);
  }

  resetTest() {
    this.answers = {};
    this.currentQuestion = 1;
    this.remainingSeconds = this.totalDurationSeconds;
    sessionStorage.removeItem('epps_timer_start');
    sessionStorage.removeItem('epps_participant');
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.showScreen('register-screen');
  }

  restoreSessionIfExists() {
    try {
      const savedPart = sessionStorage.getItem('epps_participant');
      if (savedPart) {
        this.participant = JSON.parse(savedPart);
        const regName = document.getElementById('reg-name');
        if (regName && this.participant.name) {
          regName.value = this.participant.name;
        }
        const regGender = document.getElementById('reg-gender');
        if (regGender && this.participant.gender) {
          regGender.value = this.participant.gender;
        }
        const regEdu = document.getElementById('reg-edu');
        if (regEdu && this.participant.education) {
          regEdu.value = this.participant.education;
        }
        const regNorm = document.getElementById('reg-norm');
        if (regNorm && this.participant.normCode) {
          regNorm.value = this.participant.normCode;
        }
      }
    } catch(e) {}
  }
}

// Global modal close function
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.eppsApp = new EPPSApp();
});
