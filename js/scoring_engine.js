/**
 * EPPS Scoring Engine
 * Engine perhitungan skoring Edwards Personal Preference Schedule (EPPS)
 * Menghitung skor r, c, RS, Percentile, Kategori, Konsistensi (con), dan Narasi Interpretasi.
 */

class EPPSSCorer {
  constructor(data) {
    this.data = data || EPPS_DATA;
  }

  calculate(answers, normCode, participantInfo = {}) {
    const code = parseInt(normCode, 10) || 3;
    const norm = this.data.norms[code] || this.data.norms[3];
    const factorList = this.data.factorList;

    // 1. Inisialisasi skor r dan c untuk 15 faktor
    const factorScores = {};
    factorList.forEach(f => {
      factorScores[f] = { r: 0, c: 0, rs: 0, pct: 0, category: "", narrative: "" };
    });

    // 2. Iterasi jawaban 1..225
    let answeredCount = 0;
    for (let q = 1; q <= 225; q++) {
      const ans = answers[q] ? answers[q].toLowerCase() : null;
      if (ans === 'a' || ans === 'b') {
        answeredCount++;
        const effect = this.data.questionEffects[q] ? this.data.questionEffects[q][ans] : null;
        if (effect && factorScores[effect.factor]) {
          if (effect.type === 'r') {
            factorScores[effect.factor].r += 1;
          } else if (effect.type === 'c') {
            factorScores[effect.factor].c += 1;
          }
        }
      }
    }

    // 3. Hitung RS dan Total RS
    let totalRS = 0;
    factorList.forEach(f => {
      const rs = factorScores[f].r + factorScores[f].c;
      factorScores[f].rs = rs;
      totalRS += rs;

      // Lookup percentile dari norma
      const scoreRow = norm.scores[rs] || norm.scores[Math.min(28, Math.max(0, rs))];
      const pct = scoreRow && scoreRow[f] !== undefined ? scoreRow[f] : 0;
      factorScores[f].pct = pct;

      // Tentukan kategori
      let katKey = "sedang";
      let katLabel = "Sedang";
      if (pct <= 3) {
        katKey = "sangat_rendah";
        katLabel = "Sangat Rendah";
      } else if (pct <= 16) {
        katKey = "rendah";
        katLabel = "Rendah";
      } else if (pct <= 84) {
        katKey = "sedang";
        katLabel = "Sedang";
      } else if (pct <= 96) {
        katKey = "tinggi";
        katLabel = "Tinggi";
      } else {
        katKey = "sangat_tinggi";
        katLabel = "Sangat Tinggi";
      }

      factorScores[f].category = katLabel;
      factorScores[f].categoryKey = katKey;

      // Ambil narasi psikologis
      const narr = this.data.narratives[f] ? this.data.narratives[f][katKey] : "";
      factorScores[f].narrative = narr;
      factorScores[f].meta = this.data.factors[f] || {};
    });

    // 4. Hitung Konsistensi (con)
    let conScore = 0;
    const conDetails = [];
    this.data.consistencyPairs.forEach((pair, idx) => {
      const ans1 = answers[pair.q1];
      const ans2 = answers[pair.q2];
      const isMatch = ans1 && ans2 && ans1.toLowerCase() === ans2.toLowerCase();
      if (isMatch) conScore += 1;
      conDetails.push({
        pairIndex: idx + 1,
        q1: pair.q1,
        q2: pair.q2,
        ans1: ans1 || "-",
        ans2: ans2 || "-",
        isMatch: !!isMatch
      });
    });

    // Lookup con percentile
    const conRow = norm.scores[conScore] || norm.scores[Math.min(28, Math.max(0, conScore))];
    const conPct = conRow && conRow.con !== undefined ? conRow.con : 0;

    let conKat = "Jujur";
    if (conPct <= 3) conKat = "Sangat Pembohong";
    else if (conPct <= 16) conKat = "Pembohong";
    else if (conPct <= 84) conKat = "Cukup Jujur";
    else if (conPct <= 96) conKat = "Jujur";
    else conKat = "Sangat Jujur";

    const isValid = conScore >= 9; // Kriteria standar psikodiagnostik EPPS (skor konsistensi >= 9 atau 10 dianggap valid)

    return {
      participant: participantInfo,
      normCode: code,
      normName: norm.name,
      answeredCount,
      totalQuestions: 225,
      totalRS,
      factorScores,
      factorList,
      consistency: {
        score: conScore,
        maxScore: 15,
        percentile: conPct,
        category: conKat,
        isValid,
        details: conDetails
      },
      calculatedAt: new Date().toISOString()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EPPSSCorer;
}
