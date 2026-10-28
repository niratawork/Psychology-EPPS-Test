import os
import sys
import socket
import json
import secrets
import webbrowser
from datetime import datetime, timedelta

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

import uvicorn
from starlette.applications import Starlette
from starlette.responses import JSONResponse, HTMLResponse, Response, RedirectResponse
from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

import database

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8000))

# Inisialisasi Database SQLite
database.init_db()

# In-memory session store: token -> { user_id, username, full_name, expires_at }
SESSIONS = {}

def create_session(user_info: dict) -> str:
    token = secrets.token_urlsafe(32)
    SESSIONS[token] = {
        "user_id": user_info["id"],
        "username": user_info["username"],
        "full_name": user_info["full_name"],
        "expires_at": datetime.now() + timedelta(hours=12)
    }
    return token

def get_current_hr_user(request):
    # Check Cookie or Authorization Header
    token = request.cookies.get("epps_hr_session")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1]

    if not token or token not in SESSIONS:
        return None

    sess = SESSIONS[token]
    if datetime.now() > sess["expires_at"]:
        del SESSIONS[token]
        return None

    return sess

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

# =========================================================================
# ROUTE HANDLERS
# =========================================================================

async def candidate_portal(request):
    """Layar pengerjaan tes khusus kandidat"""
    path = os.path.join(BASE_DIR, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    return HTMLResponse(html)

async def hr_portal(request):
    """Layar portal HRD & Hasil Tes (dilengkapi Login & Proteksi)"""
    path = os.path.join(BASE_DIR, "hr.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    return HTMLResponse(html)

async def api_submit_test(request):
    """Endpoint bagi kandidat mengumpulkan jawaban tes"""
    try:
        body = await request.json()
        cand_name = body.get("participant", {}).get("name", "Tanpa Nama")
        print(f"[API SUBMISSION RECEIVED] Candidate: '{cand_name}'")
        sub_id = database.save_submission(body)
        print(f"[API SUBMISSION SAVED] Assigned ID: #{sub_id} for '{cand_name}'")
        return JSONResponse({
            "status": "success",
            "id": sub_id,
            "message": "Jawaban tes berhasil disimpan ke dalam sistem HRD."
        })
    except Exception as e:
        print(f"[API SUBMISSION ERROR] {e}")
        return JSONResponse({
            "status": "error",
            "message": f"Gagal menyimpan jawaban: {str(e)}"
        }, status_code=500)

async def api_hr_login(request):
    """Endpoint login khusus HRD"""
    try:
        data = await request.json()
        username = data.get("username", "")
        password = data.get("password", "")

        user = database.verify_hr_login(username, password)
        if not user:
            return JSONResponse({
                "status": "error",
                "message": "Username atau password HR salah."
            }, status_code=401)

        token = create_session(user)
        response = JSONResponse({
            "status": "success",
            "token": token,
            "user": {
                "username": user["username"],
                "full_name": user["full_name"]
            }
        })
        # Set HttpOnly cookie
        response.set_cookie(
            "epps_hr_session",
            token,
            max_age=43200, # 12 hours
            httponly=True,
            samesite="lax"
        )
        return response
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

async def api_hr_logout(request):
    token = request.cookies.get("epps_hr_session")
    if token and token in SESSIONS:
        del SESSIONS[token]
    response = JSONResponse({"status": "success", "message": "Berhasil logout."})
    response.delete_cookie("epps_hr_session")
    return response

async def api_hr_me(request):
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"authenticated": False}, status_code=401)
    return JSONResponse({
        "authenticated": True,
        "user": {
            "username": user["username"],
            "full_name": user["full_name"]
        }
    })

async def api_hr_submissions(request):
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"status": "error", "message": "Unauthorized"}, status_code=401)

    submissions = database.get_all_submissions()
    return JSONResponse({"status": "success", "data": submissions})

async def api_hr_submission_detail(request):
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"status": "error", "message": "Unauthorized"}, status_code=401)

    sub_id = int(request.path_params["id"])
    detail = database.get_submission_detail(sub_id)
    if not detail:
        return JSONResponse({"status": "error", "message": "Data tidak ditemukan"}, status_code=404)

    return JSONResponse({"status": "success", "data": detail})

async def api_hr_delete_submission(request):
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"status": "error", "message": "Unauthorized"}, status_code=401)

    sub_id = int(request.path_params["id"])
    database.delete_submission(sub_id)
    return JSONResponse({"status": "success", "message": "Data kandidat berhasil dihapus."})

async def api_hr_change_password(request):
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"status": "error", "message": "Unauthorized"}, status_code=401)

    data = await request.json()
    old_pwd = data.get("old_password", "")
    new_pwd = data.get("new_password", "")

    if not new_pwd or len(new_pwd) < 5:
        return JSONResponse({"status": "error", "message": "Password baru minimal 5 karakter."}, status_code=400)

    ok, msg = database.change_hr_password(user["user_id"], old_pwd, new_pwd)
    if not ok:
        return JSONResponse({"status": "error", "message": msg}, status_code=400)

    return JSONResponse({"status": "success", "message": msg})

async def api_hr_export_csv(request):
    """Ekspor seluruh rekapitulasi nilai psikotes EPPS ke format CSV (Bilingual ID/EN & Summary)"""
    user = get_current_hr_user(request)
    if not user:
        return JSONResponse({"status": "error", "message": "Unauthorized"}, status_code=401)

    subs = database.get_all_submissions()
    factors = ["ach", "def", "ord", "exh", "aut", "aff", "int", "suc", "dom", "aba", "nur", "chg", "end", "het", "agg"]

    # Category translations
    cat_en = {
        "sangat_tinggi": "Very High",
        "tinggi": "High",
        "sedang": "Average",
        "rendah": "Low",
        "sangat_rendah": "Very Low"
    }

    # Header CSV
    factor_headers = []
    for f in factors:
        factor_headers.extend([
            f"{f.upper()}_RS",
            f"{f.upper()}_PERSENTIL",
            f"{f.upper()}_KATEGORI_ID",
            f"{f.upper()}_CATEGORY_EN",
            f"{f.upper()}_RINGKASAN_ID"
        ])

    csv_rows = [
        "ID,Tanggal_Tes,Nama_Kandidat,Gender,Pendidikan,Norma,Total_RS,Skor_Konsistensi,Persentil_Konsistensi,Kategori_Konsistensi,Validitas_Tes,Pelanggaran_Integritas," + ",".join(factor_headers)
    ]

    for s in subs:
        detail = database.get_submission_detail(s["id"])
        f_scores = detail.get("factor_scores", {})
        
        row_parts = [
            str(s["id"]),
            f'"{s["submitted_at"]}"',
            f'"{s["candidate_name"]}"',
            f'"{s["gender"]}"',
            f'"{s["education"]}"',
            f'"{s["norm_name"]}"',
            str(s["total_rs"]),
            str(s["consistency_score"]),
            f"{s['consistency_pct']}%",
            f'"{s["consistency_category"]}"',
            "VALID" if s["is_valid"] else "INVALID",
            str(s["security_violations"])
        ]

        for f in factors:
            f_item = f_scores.get(f, {})
            cat_key = f_item.get("categoryKey", "sedang")
            row_parts.append(str(f_item.get("rs", 0)))
            row_parts.append(f"{f_item.get('pct', 0)}%")
            row_parts.append(f'"{f_item.get("category", "-")}"')
            row_parts.append(f'"{cat_en.get(cat_key, "Average")}"')
            narr_clean = str(f_item.get("narrative", ""))[:120].replace('"', '""')
            row_parts.append(f'"{narr_clean}"')

        csv_rows.append(",".join(row_parts))

    csv_content = "\ufeff" + "\n".join(csv_rows) # with UTF-8 BOM for Excel
    return Response(
        content=csv_content,
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename=Rekap_Hasil_EPPS_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"}
    )

# Static files routes
routes = [
    Route("/", candidate_portal, methods=["GET"]),
    Route("/test", candidate_portal, methods=["GET"]),
    Route("/index.html", candidate_portal, methods=["GET"]),
    Route("/hr", hr_portal, methods=["GET"]),
    Route("/hr.html", hr_portal, methods=["GET"]),
    Route("/api/submit-test", api_submit_test, methods=["POST"]),
    Route("/api/hr/login", api_hr_login, methods=["POST"]),
    Route("/api/hr/logout", api_hr_logout, methods=["POST"]),
    Route("/api/hr/me", api_hr_me, methods=["GET"]),
    Route("/api/hr/submissions", api_hr_submissions, methods=["GET"]),
    Route("/api/hr/submissions/{id:int}", api_hr_submission_detail, methods=["GET"]),
    Route("/api/hr/submissions/{id:int}", api_hr_delete_submission, methods=["DELETE"]),
    Route("/api/hr/export-csv", api_hr_export_csv, methods=["GET"]),
    Route("/api/hr/change-password", api_hr_change_password, methods=["POST"]),
    Mount("/css", StaticFiles(directory=os.path.join(BASE_DIR, "css")), name="css"),
    Mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )
]

app = Starlette(debug=False, routes=routes, middleware=middleware)

if __name__ == "__main__":
    local_ip = get_local_ip()
    local_url = f"http://localhost:{PORT}"
    candidate_url = f"http://{local_ip}:{PORT}"
    hr_url = f"http://{local_ip}:{PORT}/hr"

    print("=" * 68)
    print("      SISTEM ASESMEN PSIKOLOGI EPPS (KANDIDAT & PORTAL HRD)")
    print("=" * 68)
    print(f" Direktori Berkas : {BASE_DIR}")
    print(f" Database SQLite  : {database.DB_PATH}")
    print("-" * 68)
    print(" TAUTAN AKSES:")
    print(f" [1] Portal Kandidat (Tes)      : {candidate_url}")
    print(f" [2] Portal HRD (Hasil & Rekap) : {hr_url}")
    print(f"     Default Login HRD -> Username: admin | Password: admin123")
    print("-" * 68)
    print(" Membuka Portal Kandidat di browser...")
    print(" Tekan Ctrl+C untuk menghentikan server.")
    print("=" * 68)

    try:
        webbrowser.open(local_url)
    except Exception:
        pass

    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="warning")
