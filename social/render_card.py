from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
html = (HERE / "card.html").read_text()
out = HERE / "linkedin-card.png"

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 1200}, device_scale_factor=2)
    pg.set_content(html, wait_until="networkidle")
    pg.screenshot(path=str(out))
    b.close()
print("wrote", out)
