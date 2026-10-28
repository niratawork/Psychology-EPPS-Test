/**
 * Portal HRD - Controller Script (Bilingual ID / EN & Executive Summary)
 * Mengelola Autentikasi HR, Dashboard Kandidat, Kolom Summary, Psikogram, dan Ekspor
 */

class HRPlaform {
  constructor() {
    this.submissions = [];
    this.currentDetail = null;
    this.currentLang = 'id'; // 'id' or 'en'
    this.psychogramChart = null;
    this.radarChart = null;
    this.pollInterval = null;
    this.newlyAddedIds = new Set();
    this.isFirstFetch = true;

    this.init();
  }

  init() {
    this.bindEvents();
    this.checkSession();
  }

  bindEvents() {
    // Form Login HR
    const loginForm = document.getElementById('hr-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.login();
      });
    }

    // Logout Button
    const btnLogout = document.getElementById('btn-hr-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => this.logout());
    }

    // Refresh Data
    const btnRefresh = document.getElementById('btn-refresh-data');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => this.fetchSubmissions());
    }

    // Filter Search & Validity
    const filterSearch = document.getElementById('filter-search');
    const filterValidity = document.getElementById('filter-validity');
    if (filterSearch) filterSearch.addEventListener('input', () => this.renderTable());
    if (filterValidity) filterValidity.addEventListener('change', () => this.renderTable());

    // Language Toggle Buttons
    const btnLangId = document.getElementById('btn-lang-id');
    const btnLangEn = document.getElementById('btn-lang-en');
    if (btnLangId && btnLangEn) {
      btnLangId.addEventListener('click', () => this.setLanguage('id'));
      btnLangEn.addEventListener('click', () => this.setLanguage('en'));
    }

    // Change Password Modal
    const btnPwd = document.getElementById('btn-hr-pwd');
    if (btnPwd) {
      btnPwd.addEventListener('click', () => this.openModal('pwd-modal'));
    }

    const pwdForm = document.getElementById('hr-change-pwd-form');
    if (pwdForm) {
      pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.changePassword();
      });
    }

    // Print Detail Modal
    const btnPrint = document.getElementById('btn-print-detail');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    const btnId = document.getElementById('btn-lang-id');
    const btnEn = document.getElementById('btn-lang-en');

    if (btnId && btnEn) {
      btnId.classList.toggle('active', lang === 'id');
      btnEn.classList.toggle('active', lang === 'en');
    }

    if (this.currentDetail) {
      this.renderDetailModal(this.currentDetail);
    }
  }

  checkSession() {
    if (window.location.protocol === 'file:') {
      const errAlert = document.getElementById('login-error-alert');
      if (errAlert) {
        errAlert.innerHTML = `
          <strong>Perhatian (Mode File):</strong> Anda membuka halaman ini langsung sebagai file lokal (<code>file://</code>).<br>
          Agar database dan autentikasi HR berfungsi, mohon jalankan <strong>start_server.bat</strong> di folder aplikasi, lalu akses melalui: <br>
          <a href="http://localhost:8000/hr" style="color: #2563eb; font-weight: 700; text-decoration: underline;">http://localhost:8000/hr</a>
        `;
        errAlert.style.background = '#eff6ff';
        errAlert.style.borderColor = '#bfdbfe';
        errAlert.style.color = '#1e40af';
        errAlert.style.display = 'block';
      }
      return;
    }

    fetch('/api/hr/me')
      .then(res => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then(data => {
        if (data.authenticated) {
          this.showDashboard(data.user);
        } else {
          this.showLogin();
        }
      })
      .catch(() => {
        this.showLogin();
      });
  }

  login() {
    const username = document.getElementById('hr-username').value.trim();
    const password = document.getElementById('hr-password').value;
    const errAlert = document.getElementById('login-error-alert');

    if (errAlert) errAlert.style.display = 'none';

    if (window.location.protocol === 'file:') {
      if (errAlert) {
        errAlert.innerHTML = `
          <strong>Perhatian:</strong> Server Python belum aktif (dibuka via <code>file://</code>).<br>
          Silakan jalankan file <strong>start_server.bat</strong> di folder aplikasi, lalu buka: <br>
          <a href="http://localhost:8000/hr" style="color: #2563eb; font-weight: 700; text-decoration: underline;">http://localhost:8000/hr</a>
        `;
        errAlert.style.background = '#fef2f2';
        errAlert.style.borderColor = '#fecaca';
        errAlert.style.color = '#991b1b';
        errAlert.style.display = 'block';
      }
      return;
    }

    fetch('/api/hr/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        this.showDashboard(data.user);
      } else {
        if (errAlert) {
          errAlert.textContent = data.message || "Username atau password salah.";
          errAlert.style.display = 'block';
        }
      }
    })
    .catch(err => {
      if (errAlert) {
        errAlert.textContent = "Gagal terhubung ke server.";
        errAlert.style.display = 'block';
      }
    });
  }

  logout() {
    this.stopAutoSync();
    fetch('/api/hr/logout', { method: 'POST' })
      .finally(() => {
        this.showLogin();
      });
  }

  showLogin() {
    this.stopAutoSync();
    document.getElementById('hr-login-view').style.display = 'block';
    document.getElementById('hr-dashboard-view').style.display = 'none';
    document.getElementById('hr-user-actions').style.display = 'none';
  }

  showDashboard(user) {
    document.getElementById('hr-login-view').style.display = 'none';
    document.getElementById('hr-dashboard-view').style.display = 'block';
    document.getElementById('hr-user-actions').style.display = 'flex';

    const nameEl = document.getElementById('hr-admin-name');
    if (nameEl && user) {
      nameEl.textContent = user.full_name || user.username;
    }

    this.fetchSubmissions(false);
    this.startAutoSync();
  }

  startAutoSync() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.fetchSubmissions(true);
    }, 3000); // Sinkronisasi otomatis setiap 3 detik
  }

  stopAutoSync() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  }

  showLiveToast(candidateName) {
    let container = document.getElementById('live-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'live-toast-container';
      container.className = 'live-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'live-toast';
    toast.innerHTML = `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: #059669; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#fff" stroke-width="2.5" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </div>
      <div>
        <div style="font-weight: 700; font-size: 0.88rem;">Hasil Tes Baru Masuk!</div>
        <div style="font-size: 0.82rem; opacity: 0.9;"><strong>${candidateName}</strong> baru saja menyelesaikan ujian EPPS.</div>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

  fetchSubmissions(silent = false) {
    const badge = document.getElementById('candidate-count-badge');
    const syncTimeEl = document.getElementById('live-sync-timestamp');

    if (!silent && badge) {
      badge.textContent = "Memperbarui data...";
    }

    fetch('/api/hr/submissions')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const incomingList = data.data || [];
          
          if (!this.isFirstFetch) {
            // Deteksi kandidat baru yang baru saja masuk
            const newSubs = incomingList.filter(s => !this.submissions.some(old => old.id === s.id));
            if (newSubs.length > 0) {
              console.log("Real-time detected new candidate submissions:", newSubs);
              this.playChime();
              newSubs.forEach(s => {
                this.showLiveToast(s.candidate_name);
                this.newlyAddedIds.add(s.id);
              });
              setTimeout(() => {
                newSubs.forEach(s => this.newlyAddedIds.delete(s.id));
                this.renderTable();
              }, 4500);
            }
          }
          this.isFirstFetch = false;

          const hasChanged = incomingList.length !== this.submissions.length ||
            incomingList.some((s, idx) => !this.submissions[idx] || this.submissions[idx].id !== s.id);

          this.submissions = incomingList;
          this.updateStats();

          if (hasChanged || !silent) {
            this.renderTable();
          }

          if (syncTimeEl) {
            syncTimeEl.textContent = new Date().toLocaleTimeString('id-ID');
          }
        }
      })
      .catch(err => {
        console.error("Gagal mengambil data:", err);
        if (!silent && badge) badge.textContent = "Gagal memuat data.";
      });
  }

  updateStats() {
    const total = this.submissions.length;
    const validCount = this.submissions.filter(s => s.is_valid).length;
    const invalidCount = total - validCount;
    
    let avgCon = "-";
    if (total > 0) {
      const sumCon = this.submissions.reduce((acc, cur) => acc + cur.consistency_score, 0);
      avgCon = (sumCon / total).toFixed(1) + " / 15";
    }

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-valid').textContent = validCount;
    document.getElementById('stat-invalid').textContent = invalidCount;
    document.getElementById('stat-avg-con').textContent = avgCon;

    const countBadge = document.getElementById('candidate-count-badge');
    if (countBadge) {
      countBadge.textContent = `${total} berkas psikotes tersimpan`;
    }
  }

  renderTable() {
    const tbody = document.getElementById('candidates-table-body');
    if (!tbody) return;

    const searchKeyword = (document.getElementById('filter-search').value || '').toLowerCase();
    const validityFilter = document.getElementById('filter-validity').value;

    const filtered = this.submissions.filter(s => {
      const name = (s.candidate_name || '').toLowerCase();
      const edu = (s.education || '').toLowerCase();
      const matchSearch = name.includes(searchKeyword) || edu.includes(searchKeyword);
      let matchVal = true;
      if (validityFilter === 'valid') matchVal = !!s.is_valid;
      if (validityFilter === 'invalid') matchVal = !s.is_valid;
      return matchSearch && matchVal;
    });

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 2.5rem; color: #64748b;">
            Belum ada berkas hasil tes kandidat yang sesuai filter pencarian.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(s => {
      const tr = document.createElement('tr');
      if (this.newlyAddedIds.has(s.id)) {
        tr.className = 'new-row-pulse';
      }

      const valBadge = s.is_valid ? 
        `<span class="badge-valid">VALID</span>` : 
        `<span class="badge-invalid">INKONSISTEN</span>`;

      const secBadge = s.security_violations > 0 ?
        `<span style="color: #dc2626; font-weight: 700;">${s.security_violations}x Insiden</span>` :
        `<span style="color: #059669;">0x (Aman)</span>`;

      const displayName = s.candidate_name && s.candidate_name.trim() ? s.candidate_name : '(Tanpa Nama)';

      tr.innerHTML = `
        <td style="font-weight: 700; color: #64748b;">#${s.id}</td>
        <td style="font-size: 0.82rem; color: #475569;">${s.submitted_at}</td>
        <td><strong style="color: #0f172a; font-size: 0.95rem;">${displayName}</strong></td>
        <td><span style="font-size: 0.85rem;">${s.gender} • ${s.education}</span></td>
        <td><span style="font-size: 0.85rem; color: #64748b;">${s.norm_name}</span></td>
        <td style="text-align: center; font-weight: 700;">${s.consistency_score}/15 (${s.consistency_category})</td>
        <td style="text-align: center;">${valBadge}</td>
        <td style="text-align: center; font-size: 0.85rem;">${secBadge}</td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <button class="btn btn-primary btn-sm btn-view-detail" data-id="${s.id}" title="Lihat Laporan Lengkap & Psikogram">
              Buka Laporan
            </button>
            <button class="btn btn-secondary btn-sm btn-delete-sub" data-id="${s.id}" style="color: #dc2626;" title="Hapus Berkas">
              Hapus
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-view-detail').addEventListener('click', () => {
        this.openDetail(s.id);
      });

      tr.querySelector('.btn-delete-sub').addEventListener('click', () => {
        if (confirm(`Yakin ingin menghapus berkas tes kandidat "${s.candidate_name}"?`)) {
          this.deleteSubmission(s.id);
        }
      });

      tbody.appendChild(tr);
    });
  }

  openDetail(subId) {
    fetch(`/api/hr/submissions/${subId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.renderDetailModal(data.data);
        }
      });
  }

  renderDetailModal(data) {
    this.currentDetail = data;
    const isEn = this.currentLang === 'en';

    // 1. Header Meta Bilingual
    document.getElementById('modal-candidate-name').textContent = data.candidate_name;
    const normText = EPPS_DATA.normLabelsBilingual && EPPS_DATA.normLabelsBilingual[data.norm_code] ?
      EPPS_DATA.normLabelsBilingual[data.norm_code][this.currentLang] : data.norm_name;
    
    const genderText = isEn ? 
      (data.gender.toUpperCase().includes('LAKI') ? 'Male' : 'Female') : 
      data.gender;
    
    const dateLabel = isEn ? 'Test Date' : 'Tanggal Tes';
    const normLabel = isEn ? 'Norm' : 'Norma';
    const eduLabel = isEn ? 'Education' : 'Pendidikan';

    document.getElementById('modal-candidate-meta').textContent = 
      `${genderText} • ${eduLabel}: ${data.education} • ${normLabel}: ${normText} • ${dateLabel}: ${data.submitted_at}`;

    // 2. Validity Box Bilingual
    const conScoreEl = document.getElementById('detail-con-score');
    const conDescEl = document.getElementById('detail-con-desc');
    const valTitle = document.getElementById('detail-val-title');
    const valDesc = document.getElementById('detail-val-desc');
    const valBox = document.getElementById('detail-validity-box');

    conScoreEl.textContent = `${data.consistency_score} / 15`;
    
    // Category lookup
    let catKey = 'jujur';
    if (data.consistency_pct <= 3) catKey = 'sangat_pembohong';
    else if (data.consistency_pct <= 16) catKey = 'pembohong';
    else if (data.consistency_pct <= 84) catKey = 'cukup_jujur';
    else if (data.consistency_pct <= 96) catKey = 'jujur';
    else catKey = 'sangat_jujur';

    const conCatText = EPPS_DATA.consistencyBilingual && EPPS_DATA.consistencyBilingual[catKey] ?
      EPPS_DATA.consistencyBilingual[catKey][this.currentLang] : data.consistency_category;

    const pctLabel = isEn ? 'Percentile' : 'Persentil';
    const catLabel = isEn ? 'Category' : 'Kategori';
    conDescEl.textContent = `${pctLabel}: ${data.consistency_pct}% • ${catLabel}: ${conCatText}`;

    if (data.is_valid) {
      valBox.className = 'validity-card';
      valTitle.textContent = isEn ? 
        "Assessment Status: VALID & HIGHLY RELIABLE" : 
        "Status Hasil: VALID & KONSISTEN";
      valDesc.textContent = isEn ? 
        `Candidate responded with high consistency (${data.consistency_score}/15). The EPPS profile provides an accurate and dependable psychological assessment.` :
        `Kandidat menjawab dengan tingkat kejujuran dan konsistensi tinggi (${data.consistency_score}/15). Profil EPPS reliabel untuk diinterpretasikan.`;
    } else {
      valBox.className = 'validity-card invalid';
      valTitle.textContent = isEn ? 
        "Assessment Status: QUESTIONABLE / INCONSISTENT" : 
        "Status Hasil: PERLU PERHATIAN (INKONSISTEN)";
      valDesc.textContent = isEn ? 
        `Warning: Low consistency score (${data.consistency_score}/15). The responses may be random, defensive, or hesitant. Recommend conducting a behavioral follow-up interview.` :
        `Peringatan: Skor konsistensi rendah (${data.consistency_score}/15 - ${conCatText}). Jawaban kemungkinan tidak konsisten atau bersifat defensif.`;
    }

    // 3. Render Executive Summary (Ringkasan Eksekutif)
    this.renderExecutiveSummary(data);

    // 4. Update Titles & Table Headers Bilingual
    document.getElementById('exec-summary-title').textContent = isEn ?
      "Executive Psychological Profile Summary" : 
      "Ringkasan Eksekutif Profil Kepribadian (Executive Summary)";
    
    document.getElementById('chart-psychogram-title').textContent = isEn ?
      "EPPS Personality Needs Psychogram (Percentile)" :
      "Psikogram Kebutuhan EPPS (Persentil)";
    
    document.getElementById('chart-radar-title').textContent = isEn ?
      "Personality Dynamics Radar Chart" :
      "Peta Radar Profil Kepribadian";
    
    document.getElementById('table-score-title').textContent = isEn ?
      "Scoring Recap Table & Indicator Summary (15 Factors)" :
      "Rekapitulasi 15 Faktor Skor EPPS & Kolom Ringkasan";

    document.getElementById('th-aspect-name').textContent = isEn ? "Psychological Need" : "Nama Aspek Kebutuhan";
    document.getElementById('th-pct').textContent = isEn ? "Percentile" : "Persentil";
    document.getElementById('th-cat').textContent = isEn ? "Category" : "Kategori";
    document.getElementById('th-summary').textContent = isEn ? "Indicator Summary" : "Ringkasan Indikator (Summary)";

    // 5. Populate Scoring Table with Summary Column
    const tbody = document.getElementById('detail-scoring-tbody');
    tbody.innerHTML = '';
    const factorList = EPPS_DATA.factorList;
    const factorScores = data.factor_scores;

    factorList.forEach(f => {
      const item = factorScores[f] || { r: 0, c: 0, rs: 0, pct: 0, category: "-", categoryKey: "sedang" };
      const catKey = item.categoryKey || 'sedang';

      const meta = isEn && EPPS_DATA.factors_en && EPPS_DATA.factors_en[f] ?
        EPPS_DATA.factors_en[f] : (EPPS_DATA.factors[f] || {});
      
      const categoryLabel = EPPS_DATA.categoryLabelsBilingual && EPPS_DATA.categoryLabelsBilingual[catKey] ?
        EPPS_DATA.categoryLabelsBilingual[catKey][this.currentLang] : item.category;

      const summaryText = EPPS_DATA.shortSummaries && EPPS_DATA.shortSummaries[f] && EPPS_DATA.shortSummaries[f][catKey] ?
        EPPS_DATA.shortSummaries[f][catKey][this.currentLang] : (item.category || "-");

      const badgeClass = `badge-${catKey.replace('_', '-')}`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${f.toUpperCase()}</strong></td>
        <td>
          <div style="font-weight: 700; color: #1e293b;">${meta.name || f}</div>
          <div style="font-size: 0.75rem; color: #64748b;">${meta.desc || ''}</div>
        </td>
        <td style="text-align: center; font-weight: 500;">${item.r}</td>
        <td style="text-align: center; font-weight: 500;">${item.c}</td>
        <td style="text-align: center; font-weight: 700;">${item.rs}</td>
        <td style="text-align: center; font-weight: 800; color: #2563eb;">${item.pct}%</td>
        <td><span class="badge-category ${badgeClass}">${categoryLabel}</span></td>
        <td style="font-size: 0.86rem; color: #334155; line-height: 1.4;">${summaryText}</td>
      `;
      tbody.appendChild(tr);
    });

    // 6. Render Charts Bilingual
    this.renderModalCharts(factorList, factorScores);

    // 7. Render Narrative Interpretations Bilingual
    const narrContainer = document.getElementById('detail-narratives-container');
    narrContainer.innerHTML = '';

    factorList.forEach(f => {
      const item = factorScores[f] || {};
      const catKey = item.categoryKey || 'sedang';

      const meta = isEn && EPPS_DATA.factors_en && EPPS_DATA.factors_en[f] ?
        EPPS_DATA.factors_en[f] : (EPPS_DATA.factors[f] || {});

      const categoryLabel = EPPS_DATA.categoryLabelsBilingual && EPPS_DATA.categoryLabelsBilingual[catKey] ?
        EPPS_DATA.categoryLabelsBilingual[catKey][this.currentLang] : item.category;

      let narrText = "";
      if (isEn && EPPS_DATA.narratives_en && EPPS_DATA.narratives_en[f]) {
        narrText = EPPS_DATA.narratives_en[f][catKey] || "";
      } else if (EPPS_DATA.narratives && EPPS_DATA.narratives[f]) {
        narrText = EPPS_DATA.narratives[f][catKey] || "";
      }

      const div = document.createElement('div');
      div.className = 'narrative-item';

      div.innerHTML = `
        <div class="narrative-title-row">
          <div class="narrative-title">${meta.name} (${f.toUpperCase()}) - ${meta.desc}</div>
          <div class="narrative-score-info">
            <span class="badge-category badge-${catKey.replace('_', '-')}">${categoryLabel}</span>
            <span style="font-weight: 700; color: #2563eb;">${isEn ? 'Percentile' : 'Persentil'}: ${item.pct}%</span>
            <span style="color: #64748b;">(RS: ${item.rs})</span>
          </div>
        </div>
        <p class="narrative-desc">${narrText || "Tidak ada narasi spesifik."}</p>
      `;
      narrContainer.appendChild(div);
    });

    // 8. Security Audit Log Summary Bilingual
    const secContainer = document.getElementById('detail-security-summary');
    const secReport = data.security_report || {};
    const violations = secReport.violationLog || [];

    if (violations.length === 0) {
      secContainer.innerHTML = `
        <div style="color: #059669; font-weight: 600;">
          ${isEn ? 
            "✓ The test was completed smoothly without any window/tab switching or suspicious activity (0 incidents)." :
            "✓ Pengerjaan berlangsung tertib tanpa ada perpindahan tab atau tindakan mencurigakan (0x insiden)."}
        </div>
      `;
    } else {
      let logHtml = `<div style="color: #dc2626; font-weight: 700; margin-bottom: 0.5rem;">
        ${isEn ? `Detected ${violations.length} tab/window switching incident(s) during the examination:` : `Terdeteksi ${violations.length} insiden perpindahan tab/jendela selama tes:`}
      </div><ul style="margin-left: 1.25rem;">`;
      violations.forEach((v) => {
        logHtml += `<li><strong>[${v.time}]</strong> ${v.reason}</li>`;
      });
      logHtml += `</ul>`;
      secContainer.innerHTML = logHtml;
    }

    this.openModal('detail-modal');
  }

  renderExecutiveSummary(data) {
    const container = document.getElementById('exec-summary-content');
    if (!container) return;

    const isEn = this.currentLang === 'en';
    const factorScores = data.factor_scores || {};
    const factorList = EPPS_DATA.factorList;

    // Sort factors by percentile
    const sorted = [...factorList].map(f => ({
      code: f,
      pct: factorScores[f] ? factorScores[f].pct : 0,
      rs: factorScores[f] ? factorScores[f].rs : 0,
      catKey: factorScores[f] ? factorScores[f].categoryKey : 'sedang',
      name: (isEn && EPPS_DATA.factors_en && EPPS_DATA.factors_en[f]) ?
            EPPS_DATA.factors_en[f].name : (EPPS_DATA.factors[f] ? EPPS_DATA.factors[f].name : f)
    })).sort((a, b) => b.pct - a.pct);

    const top3 = sorted.slice(0, 3);
    const low3 = sorted.slice(-3).reverse();

    // Work style synthesis (ach, ord, end)
    const ach = factorScores['ach'] ? factorScores['ach'].pct : 50;
    const ord = factorScores['ord'] ? factorScores['ord'].pct : 50;
    const end = factorScores['end'] ? factorScores['end'].pct : 50;
    
    let workStyleText = "";
    if (ord >= 80 && end >= 80) {
      workStyleText = isEn ?
        "Demonstrates exceptional diligence, meticulous organization, and remarkable endurance. Highly reliable in structured, deadline-driven roles requiring high accuracy." :
        "Menunjukkan etos kerja sangat tekun, teratur, dan memiliki daya tahan tinggi. Sangat reliabel pada tugas terstruktur dengan tenggat waktu ketat dan presisi tinggi.";
    } else if (ach >= 80) {
      workStyleText = isEn ?
        "Highly ambitious, achievement-oriented, and enjoys tackling difficult challenges. Strives to exceed expectations and gain professional excellence." :
        "Sangat berorientasi pada target dan prestasi (achievement-driven). Memiliki dorongan kuat untuk menuntaskan pekerjaan yang menantang dan kompleks.";
    } else if (ord <= 25) {
      workStyleText = isEn ?
        "Prefers a flexible, informal work pace; may resist rigid routine and performs best with open-ended creative exploration." :
        "Cenderung fleksibel dan spontan dalam bekerja; kurang menyukai birokrasi kaku dan bekerja optimal dalam ruang kerja adaptif.";
    } else {
      workStyleText = isEn ?
        "Maintains a balanced, pragmatic work style. Capable of handling routine demands while adapting to practical workplace changes." :
        "Menampilkan gaya kerja seimbang dan realistis. Mampu menyelesaikan rutinitas kerja dengan disiplin yang proporsional.";
    }

    // Interpersonal & Social Style (aff, nur, dom, aut)
    const aff = factorScores['aff'] ? factorScores['aff'].pct : 50;
    const dom = factorScores['dom'] ? factorScores['dom'].pct : 50;
    const aut = factorScores['aut'] ? factorScores['aut'].pct : 50;
    const nur = factorScores['nur'] ? factorScores['nur'].pct : 50;

    let socialStyleText = "";
    if (aff <= 20) {
      socialStyleText = isEn ?
        "Strongly independent and introverted. Values professional focus over informal socializing; thrives when given focused, solitary assignments." :
        "Pribadi mandiri dengan kecenderungan introversi tinggi. Membatasi pergaulan sosial informal dan bekerja sangat fokus pada tugas individual.";
    } else if (dom >= 75) {
      socialStyleText = isEn ?
        "Natural influencer with strong assertiveness. Confident in steering group decisions, guiding peers, and stepping into leadership responsibilities." :
        "Memiliki jiwa kepemimpinan alami dan asertif. Percaya diri mengarahkan kelompok, memandu rekan kerja, dan mengambil keputusan.";
    } else if (nur >= 75) {
      socialStyleText = isEn ?
        "Highly cooperative, empathetic, and considerate. Natural team supporter who prioritizes mutual harmony and helpful service." :
        "Sangat kooperatif, ramah, dan empatik. Menjadi perekat keharmonisan kelompok dengan kepedulian tinggi terhadap sesama tim.";
    } else {
      socialStyleText = isEn ?
        "Balanced social adaptability; maintains functional professional rapport without excessive social dependency or friction." :
        "Adaptabilitas sosial proporsional; mampu menjalin kerja sama profesional secara wajar dan harmonis.";
    }

    // Recommendations for HR
    let hrRecommendation = "";
    if (ord >= 80 && end >= 80 && aff <= 30) {
      hrRecommendation = isEn ?
        "Highly recommended for operational, analytical, finance, quality assurance, engineering, or specialized administrative positions requiring high accuracy, grit, and autonomy." :
        "Sangat direkomendasikan untuk posisi operasional, analisis data, keuangan/akuntansi, quality control, teknik, atau administrasi terencana yang menuntut ketelitian tinggi, ketekunan, dan kemandirian.";
    } else if (dom >= 75 && ach >= 70) {
      hrRecommendation = isEn ?
        "Well-suited for supervisory, business development, management trainee, or project leadership roles that require initiative and drive." :
        "Sangat cocok untuk jalur kepemimpinan (Supervisor / Management Trainee), pengembangan bisnis, atau penanggung jawab proyek yang membutuhkan inisiatif tinggi.";
    } else if (aff >= 70 || nur >= 70) {
      hrRecommendation = isEn ?
        "Well-suited for collaborative team roles, customer relations, human resources, hospitality, or client-facing assignments." :
        "Sangat cocok untuk peran yang menuntut kolaborasi tim, layanan pelanggan, hubungan masyarakat, atau fungsi pendukung organisasi.";
    } else {
      hrRecommendation = isEn ?
        "Adaptive candidate suitable for core functional assignments matching their educational qualification." :
        "Kandidat memiliki profil adaptif yang dapat disesuaikan pada berbagai fungsi kerja umum sesuai kualifikasi pendidikannya.";
    }

    let top3Html = top3.map(t => {
      const badgeCls = `badge-${t.catKey.replace('_', '-')}`;
      const catLabel = EPPS_DATA.categoryLabelsBilingual && EPPS_DATA.categoryLabelsBilingual[t.catKey] ?
        EPPS_DATA.categoryLabelsBilingual[t.catKey][this.currentLang] : t.catKey;
      return `
        <li class="top-traits-item">
          <strong>${t.name} (${t.code.toUpperCase()})</strong>
          <span><span class="badge-category ${badgeCls}">${catLabel}</span> <strong style="color: #2563eb; margin-left: 0.35rem;">${t.pct}%</strong></span>
        </li>
      `;
    }).join('');

    let low3Html = low3.map(t => {
      const badgeCls = `badge-${t.catKey.replace('_', '-')}`;
      const catLabel = EPPS_DATA.categoryLabelsBilingual && EPPS_DATA.categoryLabelsBilingual[t.catKey] ?
        EPPS_DATA.categoryLabelsBilingual[t.catKey][this.currentLang] : t.catKey;
      return `
        <li class="top-traits-item">
          <strong>${t.name} (${t.code.toUpperCase()})</strong>
          <span><span class="badge-category ${badgeCls}">${catLabel}</span> <strong style="color: #64748b; margin-left: 0.35rem;">${t.pct}%</strong></span>
        </li>
      `;
    }).join('');

    container.innerHTML = `
      <div class="exec-summary-grid">
        <div class="exec-subcard">
          <h5>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#16a34a" stroke-width="2.5" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            ${isEn ? "Key Dominant Needs (Top Strengths)" : "Kebutuhan Paling Dominan (Kekuatan Utama)"}
          </h5>
          <ul class="top-traits-list">
            ${top3Html}
          </ul>
        </div>

        <div class="exec-subcard">
          <h5>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#d97706" stroke-width="2.5" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            ${isEn ? "Low Needs (Development Areas)" : "Kebutuhan Rendah (Area Perhatian)"}
          </h5>
          <ul class="top-traits-list">
            ${low3Html}
          </ul>
        </div>

        <div class="exec-subcard">
          <h5>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#2563eb" stroke-width="2.5" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            ${isEn ? "Work Style & Task Execution" : "Gaya Kerja & Eksekusi Tugas"}
          </h5>
          <p>${workStyleText}</p>
        </div>

        <div class="exec-subcard">
          <h5>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#7c3aed" stroke-width="2.5" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ${isEn ? "Interpersonal Dynamics & Leadership" : "Dinamika Interpersonal & Kepemimpinan"}
          </h5>
          <p>${socialStyleText}</p>
        </div>
      </div>

      <div style="margin-top: 1.25rem; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1.15rem;">
        <div style="font-weight: 800; color: #1e40af; font-size: 0.92rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          ${isEn ? "HR Placement Recommendation & Takeaways:" : "Rekomendasi Penempatan & Catatan HRD:"}
        </div>
        <div style="font-size: 0.88rem; color: #1e3a8a; line-height: 1.6;">
          ${hrRecommendation}
        </div>
      </div>
    `;
  }

  renderModalCharts(factorList, factorScores) {
    if (typeof Chart === 'undefined') return;

    const isEn = this.currentLang === 'en';
    const labels = factorList.map(f => {
      const meta = isEn && EPPS_DATA.factors_en && EPPS_DATA.factors_en[f] ?
        EPPS_DATA.factors_en[f] : (EPPS_DATA.factors[f] || {});
      return f.toUpperCase();
    });
    const percentiles = factorList.map(f => factorScores[f] ? factorScores[f].pct : 0);

    // 1. Psychogram Bar Chart
    const ctxBar = document.getElementById('hrPsychogramCanvas');
    if (ctxBar) {
      if (this.psychogramChart) this.psychogramChart.destroy();

      const barColors = percentiles.map(p => {
        if (p <= 3) return '#ef4444';
        if (p <= 16) return '#f59e0b';
        if (p <= 84) return '#3b82f6';
        if (p <= 96) return '#10b981';
        return '#8b5cf6';
      });

      this.psychogramChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: isEn ? 'Percentile (%)' : 'Persentil (%)',
            data: percentiles,
            backgroundColor: barColors,
            borderRadius: 4,
            barThickness: 16
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
                  const f = factorList[ctx.dataIndex];
                  const item = factorScores[f];
                  const meta = isEn && EPPS_DATA.factors_en && EPPS_DATA.factors_en[f] ?
                    EPPS_DATA.factors_en[f] : (EPPS_DATA.factors[f] || {});
                  const catLabel = EPPS_DATA.categoryLabelsBilingual && EPPS_DATA.categoryLabelsBilingual[item.categoryKey] ?
                    EPPS_DATA.categoryLabelsBilingual[item.categoryKey][this.currentLang] : item.category;
                  return `${meta.name}\nRS: ${item.rs} (r:${item.r}, c:${item.c})\n${isEn ? 'Category' : 'Kategori'}: ${catLabel}`;
                }
              }
            }
          },
          scales: {
            y: { min: 0, max: 100, ticks: { stepSize: 20 } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // 2. Radar Chart
    const ctxRadar = document.getElementById('hrRadarCanvas');
    if (ctxRadar) {
      if (this.radarChart) this.radarChart.destroy();

      this.radarChart = new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: isEn ? 'Personality Needs Map' : 'Peta Kebutuhan Psikologis',
            data: percentiles,
            backgroundColor: 'rgba(59, 130, 246, 0.25)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            pointBackgroundColor: '#3b82f6',
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: { min: 0, max: 100, ticks: { display: false } }
          },
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }

  deleteSubmission(id) {
    fetch(`/api/hr/submissions/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.submissions = this.submissions.filter(s => s.id !== id);
          this.updateStats();
          this.renderTable();
        }
      });
  }

  changePassword() {
    const old_password = document.getElementById('old-pwd').value;
    const new_password = document.getElementById('new-pwd').value;
    const confirm_pwd = document.getElementById('confirm-pwd').value;

    if (new_password !== confirm_pwd) {
      alert("Konfirmasi password baru tidak cocok.");
      return;
    }

    fetch('/api/hr/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ old_password, new_password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert("Password HR berhasil diperbarui! Silakan gunakan password baru saat login berikutnya.");
        this.closeModal('pwd-modal');
        document.getElementById('hr-change-pwd-form').reset();
      } else {
        alert(data.message || "Gagal mengubah password.");
      }
    });
  }

  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  window.hrPlatform = new HRPlaform();
});
