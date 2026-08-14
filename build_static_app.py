from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parent
SOURCE_APP = ROOT / "app"
DIST = ROOT / "dist"

DEPLOYED_IMAGES = {
    "customer.PNG",
    "portfolio.PNG",
    "enersys1.jpg",
    "enersys2.jpg",
    "RDCT.PNG",
}

DEPLOYED_MEDIA = {
    "hero-portrait.jpg",
    "app-pitch.jpg",
}


def build():
    if DIST.exists():
        shutil.rmtree(DIST)

    shutil.copytree(SOURCE_APP, DIST)

    for candidate in (DIST / "assets" / "images").iterdir():
        if candidate.name not in DEPLOYED_IMAGES:
            candidate.unlink()

    for candidate in (DIST / "assets" / "media").iterdir():
        if candidate.name not in DEPLOYED_MEDIA:
            candidate.unlink()

    for relative_path in (
        ".DS_Store",
        "assets/css/styles.css",
        "assets/js/intro-canvas.js",
        "assets/js/scene.js",
        "assets/image.JPG",
        "assets/hero-portrait-v2.png",
        "assets/og-v2.png",
    ):
        (DIST / relative_path).unlink(missing_ok=True)

    cname = ROOT / "CNAME"
    if cname.exists():
        shutil.copy2(cname, DIST / "CNAME")

    (DIST / ".nojekyll").write_text("", encoding="utf-8")


if __name__ == "__main__":
    build()
