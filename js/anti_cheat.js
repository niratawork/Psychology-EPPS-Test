/**
 * Anti-Cheat & Anti-Leak Protection Suite
 * Proteksi Keamanan & Kerahasiaan Soal Tes EPPS
 */

class AntiCheatGuard {
  constructor(options = {}) {
    this.options = {
      watermarkText: "UJIAN PSIKOLOGI RESMI - RAHASIA",
      participantName: "Peserta",
      participantCode: "",
      maxViolations: 5,
      onViolation: null,
      onTimeUp: null,
      ...options
    };

    this.violations = 0;
    this.violationLog = [];
    this.isActive = false;
    this.blurOverlay = null;
    this.watermarkContainer = null;
  }

  init() {
    this.createBlurOverlay();
    this.attachEventListeners();
  }

  activate(participantName, participantCode) {
    this.options.participantName = participantName || this.options.participantName;
    this.options.participantCode = participantCode || this.options.participantCode;
    this.isActive = true;
    this.renderWatermark();
    console.log("Anti-Cheat Guard Activated for:", this.options.participantName);
  }

  deactivate() {
    this.isActive = false;
    this.removeWatermark();
    if (this.blurOverlay) {
      this.blurOverlay.style.display = 'none';
    }
  }

  createBlurOverlay() {
    let overlay = document.getElementById('security-blur-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'security-blur-overlay';
      overlay.className = 'security-blur-overlay';
      overlay.innerHTML = `
        <div class="security-card">
          <div class="security-icon-warning">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3>Peringatan Keamanan Ujian</h3>
          <p>Anda terdeteksi meninggalkan jendela atau berpindah tab ujian. Demi integritas dan kerahasiaan soal, soal disembunyikan sementara.</p>
          <div class="violation-count-badge">
            Jumlah Pelanggaran Integritas: <strong id="sec-violation-count">0</strong> kali
          </div>
          <button id="btn-resume-test" class="btn btn-primary">Kembali ke Soal Ujian</button>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById('btn-resume-test').addEventListener('click', () => {
        overlay.style.display = 'none';
        const testArea = document.getElementById('test-screen');
        if (testArea) testArea.classList.remove('content-blurred');
      });
    }
    this.blurOverlay = overlay;
  }

  renderWatermark() {
    this.removeWatermark();
    const container = document.createElement('div');
    container.id = 'security-watermark-layer';
    container.className = 'security-watermark-layer';

    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    const timeStr = new Date().toLocaleTimeString('id-ID');
    const label = `${this.options.participantName} • ${this.options.participantCode} • ${dateStr} ${timeStr} • RAHASIA - DILARANG MENYEBARKAN SOAL`;

    // Repeat watermark pattern across screen
    let rowsHtml = '';
    for (let i = 0; i < 18; i++) {
      rowsHtml += `<div class="watermark-row"><span>${label}</span><span>${label}</span></div>`;
    }
    container.innerHTML = rowsHtml;
    document.body.appendChild(container);
    this.watermarkContainer = container;
  }

  removeWatermark() {
    const existing = document.getElementById('security-watermark-layer');
    if (existing) existing.remove();
  }

  recordViolation(reason) {
    if (!this.isActive) return;

    this.violations += 1;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID');
    this.violationLog.push({ time: timeStr, reason });

    const badge = document.getElementById('sec-violation-count');
    if (badge) badge.textContent = this.violations;

    const navBadge = document.getElementById('violation-counter-nav');
    if (navBadge) {
      navBadge.textContent = this.violations;
      navBadge.parentElement.style.display = 'inline-flex';
    }

    if (this.options.onViolation) {
      this.options.onViolation(this.violations, reason);
    }
  }

  showBlurWarning(reason) {
    if (!this.isActive) return;

    this.recordViolation(reason);

    const testArea = document.getElementById('test-screen');
    if (testArea) testArea.classList.add('content-blurred');

    if (this.blurOverlay) {
      this.blurOverlay.style.display = 'flex';
    }
  }

  attachEventListeners() {
    // 1. Disable Right Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      if (this.isActive) {
        e.preventDefault();
        this.showToastWarning("Klik kanan dinonaktifkan demi menjaga kerahasiaan bank soal.");
        return false;
      }
    });

    // 2. Disable Copy, Cut, Paste, Drag
    ['copy', 'cut', 'paste', 'dragstart'].forEach(evt => {
      document.addEventListener(evt, (e) => {
        if (this.isActive) {
          e.preventDefault();
          this.showToastWarning("Tindakan menyalin/menggandakan konten soal dilarang.");
          return false;
        }
      });
    });

    // 3. Disable Keyboard Shortcuts (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S, Ctrl+P, PrintScreen)
    document.addEventListener('keydown', (e) => {
      if (!this.isActive) return;

      // F12 or DevTools
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key))) {
        e.preventDefault();
        this.recordViolation("Percobaan membuka Developer Tools / Inspect Element");
        this.showToastWarning("Developer Tools dinonaktifkan.");
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        this.showToastWarning("Melihat sumber kode dilarang.");
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        this.showToastWarning("Menyimpan halaman soal dinonaktifkan.");
        return false;
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        this.recordViolation("Percobaan mencetak halaman saat tes berlangsung");
        this.showToastWarning("Mencetak soal saat tes berlangsung dilarang.");
        return false;
      }

      // PrintScreen Key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("");
        }
        this.showBlurWarning("Percobaan tangkapan layar (PrintScreen)");
      }
    });

    // 4. Tab Switch & Window Blur Detection
    window.addEventListener('blur', () => {
      if (this.isActive) {
        this.showBlurWarning("Fokus jendela tes hilang / beralih aplikasi");
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (this.isActive && document.hidden) {
        this.showBlurWarning("Berpindah tab atau meminimalkan browser");
      }
    });
  }

  showToastWarning(msg) {
    let toast = document.getElementById('security-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'security-toast';
      toast.className = 'security-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  getSecurityReport() {
    return {
      violationCount: this.violations,
      violationLog: this.violationLog,
      status: this.violations === 0 ? "Aman / Tidak Ada Pelanggaran" :
              this.violations <= 2 ? "Peringatan Ringan" : "Perhatian Khusus / Integritas Rendah"
    };
  }
}
