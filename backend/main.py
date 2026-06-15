from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json, os, tempfile

app = FastAPI()
api = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_DEFAULT_DATA = os.path.join(os.path.dirname(__file__), "..", "data")
_DATA_DIR   = os.environ.get("QUESTBOARD_DATA", _DEFAULT_DATA)
STATE_FILE  = os.path.join(_DATA_DIR, "state.json")
CONFIG_FILE = os.path.join(_DATA_DIR, "config.json")


def read_json(path):
    if os.path.exists(path):
        try:
            with open(path, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return None


def write_json(path, data):
    """Atomic write: serialize to a temp file in the same dir, fsync, then
    os.replace over the target. A crash mid-write can never corrupt or
    truncate the existing file -- the replace is atomic."""
    directory = os.path.dirname(path)
    os.makedirs(directory, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=directory, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except Exception:
        try:
            os.remove(tmp)
        except OSError:
            pass
        raise


@api.get("/state")
def get_state():
    return read_json(STATE_FILE) or {}


@api.post("/state")
async def post_state(request: Request):
    data = await request.json()
    write_json(STATE_FILE, data)
    return {"ok": True}


@api.get("/config")
def get_config():
    config = read_json(CONFIG_FILE)
    if config is None:
        return {"needs_setup": True}
    return config


@api.post("/config")
async def post_config(request: Request):
    data = await request.json()
    write_json(CONFIG_FILE, data)
    return {"ok": True}


app.include_router(api)

# Built frontend (run `pnpm build` in frontend/). Mount last so it does not
# shadow the /api routes. html=True serves index.html at the root.
_DIST = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.isdir(_DIST):
    app.mount("/", StaticFiles(directory=_DIST, html=True), name="static")
