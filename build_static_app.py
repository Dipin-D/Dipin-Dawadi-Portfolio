from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parent
SOURCE_APP = ROOT / "app"
DIST = ROOT / "dist"


def build():
    if DIST.exists():
        shutil.rmtree(DIST)

    shutil.copytree(SOURCE_APP, DIST)

    (DIST / ".nojekyll").write_text("", encoding="utf-8")


if __name__ == "__main__":
    build()
