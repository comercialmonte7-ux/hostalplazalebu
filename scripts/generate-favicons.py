#!/usr/bin/env python3
"""
Generate all favicon formats from logo-final.png for Hostal Plaza Lebu.
Creates: favicon.ico (multi-size), favicon-16.png, favicon-32.png, favicon.png (192x192), apple-touch-icon.png (180x180)
"""

from PIL import Image
import os

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")
SOURCE_LOGO = os.path.join(PUBLIC_DIR, "logo-final.png")

def generate_favicons():
    print(f"📂 Loading logo from: {SOURCE_LOGO}")
    
    # Open and verify the source logo
    img = Image.open(SOURCE_LOGO)
    print(f"✅ Logo loaded: {img.size[0]}x{img.size[1]}, mode={img.mode}")
    
    # Ensure RGBA for transparency support
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    
    # --- 1. Generate favicon.ico (multi-resolution: 16x16, 32x32, 48x48) ---
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    sizes_ico = [16, 32, 48]
    ico_images = []
    for size in sizes_ico:
        resized = img.resize((size, size), Image.LANCZOS)
        ico_images.append(resized)
    
    # Save as ICO with multiple sizes embedded
    ico_images[0].save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in sizes_ico],
        append_images=ico_images[1:]
    )
    ico_size = os.path.getsize(ico_path)
    print(f"✅ favicon.ico created ({ico_size:,} bytes) with sizes: {sizes_ico}")
    
    # --- 2. Generate favicon-16.png ---
    path_16 = os.path.join(PUBLIC_DIR, "favicon-16.png")
    img.resize((16, 16), Image.LANCZOS).save(path_16, format="PNG", optimize=True)
    print(f"✅ favicon-16.png created ({os.path.getsize(path_16):,} bytes)")
    
    # --- 3. Generate favicon-32.png ---
    path_32 = os.path.join(PUBLIC_DIR, "favicon-32.png")
    img.resize((32, 32), Image.LANCZOS).save(path_32, format="PNG", optimize=True)
    print(f"✅ favicon-32.png created ({os.path.getsize(path_32):,} bytes)")
    
    # --- 4. Generate favicon.png (192x192 for Android/Chrome) ---
    path_192 = os.path.join(PUBLIC_DIR, "favicon.png")
    img.resize((192, 192), Image.LANCZOS).save(path_192, format="PNG", optimize=True)
    print(f"✅ favicon.png created ({os.path.getsize(path_192):,} bytes)")
    
    # --- 5. Generate apple-touch-icon.png (180x180 for iOS) ---
    path_apple = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
    img.resize((180, 180), Image.LANCZOS).save(path_apple, format="PNG", optimize=True)
    print(f"✅ apple-touch-icon.png created ({os.path.getsize(path_apple):,} bytes)")
    
    # --- Verification ---
    print("\n🔍 Verification - all favicon files in public/:")
    favicon_files = ["favicon.ico", "favicon-16.png", "favicon-32.png", "favicon.png", "apple-touch-icon.png"]
    for f in favicon_files:
        fp = os.path.join(PUBLIC_DIR, f)
        if os.path.exists(fp):
            size = os.path.getsize(fp)
            print(f"   ✅ {f}: {size:,} bytes")
        else:
            print(f"   ❌ {f}: MISSING!")
    
    print("\n🎉 All favicons generated successfully from logo-final.png!")

if __name__ == "__main__":
    generate_favicons()
