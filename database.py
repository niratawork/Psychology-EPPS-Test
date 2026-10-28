import sqlite3
import hashlib
import os
import json
import secrets
from datetime import datetime

DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
DB_PATH = os.path.join(DB_DIR, "epps_assessment.db")

def get_connection():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=15.0)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA busy_timeout = 5000;")
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Tabel HR Users (Admin)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS hr_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            full_name TEXT,
            created_at TEXT NOT NULL
        )
    """)

    # 2. Tabel Test Submissions (Hasil Tes Kandidat)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS test_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            candidate_name TEXT NOT NULL,
            gender TEXT NOT NULL,
            education TEXT NOT NULL,
            norm_code INTEGER NOT NULL,
            norm_name TEXT NOT NULL,
            total_rs INTEGER NOT NULL,
            consistency_score INTEGER NOT NULL,
            consistency_pct INTEGER NOT NULL,
            consistency_category TEXT NOT NULL,
            is_valid INTEGER NOT NULL,
            security_violations INTEGER DEFAULT 0,
            factor_scores_json TEXT NOT NULL,
            security_report_json TEXT,
            answers_json TEXT NOT NULL,
            submitted_at TEXT NOT NULL
        )
    """)

    # 3. Buat default HR admin jika belum ada
    cursor.execute("SELECT id FROM hr_users WHERE username = 'admin'")
    if not cursor.fetchone():
        salt = secrets.token_hex(16)
        # default password: admin123
        pwd_hash = hash_password("admin123", salt)
        cursor.execute("""
            INSERT INTO hr_users (username, password_hash, salt, full_name, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, ("admin", pwd_hash, salt, "HR Administrator", datetime.now().isoformat()))
        conn.commit()

    conn.commit()
    conn.close()

def hash_password(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000
    ).hex()

def verify_hr_login(username: str, password: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, password_hash, salt, full_name FROM hr_users WHERE username = ?", (username.strip(),))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return None

    uid, uname, stored_hash, salt, full_name = user
    if hash_password(password, salt) == stored_hash:
        return {
            "id": uid,
            "username": uname,
            "full_name": full_name
        }
    return None

def change_hr_password(user_id: int, old_password: str, new_password: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password_hash, salt FROM hr_users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return False, "Pengguna tidak ditemukan."

    stored_hash, salt = row
    if hash_password(old_password, salt) != stored_hash:
        conn.close()
        return False, "Password lama salah."

    new_salt = secrets.token_hex(16)
    new_hash = hash_password(new_password, new_salt)
    cursor.execute("UPDATE hr_users SET password_hash = ?, salt = ? WHERE id = ?", (new_hash, new_salt, user_id))
    conn.commit()
    conn.close()
    return True, "Password berhasil diperbarui."

def save_submission(data: dict):
    conn = get_connection()
    cursor = conn.cursor()

    participant = data.get("participant", {})
    consistency = data.get("consistency", {})
    security = data.get("security", {})
    factor_scores = data.get("factorScores", {})
    answers = data.get("answers", {})

    cand_name = str(participant.get("name", "")).strip() or "Tanpa Nama"
    gender = str(participant.get("gender", "-")).strip() or "-"
    education = str(participant.get("education", "-")).strip() or "-"
    norm_code = int(data.get("normCode") or participant.get("normCode") or 3)
    norm_name = str(data.get("normName", "")).strip() or "Umum (Laki-laki)"

    cursor.execute("""
        INSERT INTO test_submissions (
            candidate_name, gender, education, norm_code, norm_name,
            total_rs, consistency_score, consistency_pct, consistency_category,
            is_valid, security_violations, factor_scores_json, security_report_json,
            answers_json, submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        cand_name,
        gender,
        education,
        norm_code,
        norm_name,
        int(data.get("totalRS", 210)),
        int(consistency.get("score", 0)),
        int(consistency.get("percentile", 0)),
        str(consistency.get("category", "Tidak Diketahui")),
        1 if consistency.get("isValid", False) else 0,
        int(security.get("violationCount", 0)),
        json.dumps(factor_scores, ensure_ascii=False),
        json.dumps(security, ensure_ascii=False),
        json.dumps(answers, ensure_ascii=False),
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))

    submission_id = cursor.lastrowid
    conn.commit()
    conn.close()
    print(f"[DB] Saved submission #{submission_id} for candidate '{cand_name}'")
    return submission_id

def get_all_submissions():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, candidate_name, gender, education, norm_code, norm_name,
               total_rs, consistency_score, consistency_pct, consistency_category,
               is_valid, security_violations, submitted_at
        FROM test_submissions
        ORDER BY id DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_submission_detail(sub_id: int):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM test_submissions WHERE id = ?", (sub_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    res = dict(row)
    res["factor_scores"] = json.loads(res["factor_scores_json"])
    res["security_report"] = json.loads(res["security_report_json"]) if res["security_report_json"] else {}
    res["answers"] = json.loads(res["answers_json"]) if res["answers_json"] else {}
    return res

def delete_submission(sub_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM test_submissions WHERE id = ?", (sub_id,))
    conn.commit()
    conn.close()
    return True
