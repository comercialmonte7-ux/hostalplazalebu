#!/usr/bin/env python3
"""
Optimize the Hostal Plaza Lebu logo:
1. Remove white background outside the circle
2. Crop tightly to the circular logo
3. Generate optimized favicon versions
"""

from PIL import Image, ImageDraw
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
public_dir = os.path.join(project_dir, "public")
input_path = os.path.join(public_dir, "logo-final.png")

# Backup the original
backup_path = os.path.join(public_dir, "logo-final-backup.png")

# Open the image
img = Image.open(input_path).convert("RGBA")
width, height = img.size
print(f"Original size: {width}x{height}")

# Save backup
img.save(backup_path)
print(f"Backup saved to: {backup_path}")

# Step 1: Find the circle boundary
# Scan pixels to find the circle edge (where non-white content begins)
pixels = img.load()

# Find the bounding box of non-white/non-transparent content
min_x, min_y = width, height
max_x, max_y = 0, 0

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Consider pixel as "content" if it's not white/near-white
        if a > 10 and not (r > 240 and g > 240 and b > 240):
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

print(f"Content bounds: ({min_x}, {min_y}) to ({max_x}, {max_y})")

# Step 2: Crop to content area with a small padding
padding = 2
crop_box = (
    max(0, min_x - padding),
    max(0, min_y - padding),
    min(width, max_x + padding + 1),
    min(height, max_y + padding + 1)
)
cropped = img.crop(crop_box)
cw, ch = cropped.size
print(f"Cropped size: {cw}x{ch}")

# Step 3: Make it square (use the larger dimension)
size = max(cw, ch)
square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
offset_x = (size - cw) // 2
offset_y = (size - ch) // 2
square.paste(cropped, (offset_x, offset_y))

# Step 4: Apply circular mask to make corners transparent
mask = Image.new("L", (size, size), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse([0, 0, size - 1, size - 1], fill=255)

# Apply mask - make outside circle transparent
result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
result.paste(square, mask=mask)

# Step 5: Save the optimized logo
output_path = os.path.join(public_dir, "logo-final.png")
result.save(output_path, "PNG", optimize=True)
result_size = os.path.getsize(output_path)
print(f"Optimized logo saved: {output_path} ({result_size} bytes, {size}x{size})")

# Step 6: Create favicon version (smaller, for browser tab)
favicon_size = 192
favicon = result.resize((favicon_size, favicon_size), Image.LANCZOS)
favicon_path = os.path.join(public_dir, "favicon.png")
favicon.save(favicon_path, "PNG", optimize=True)
favicon_file_size = os.path.getsize(favicon_path)
print(f"Favicon saved: {favicon_path} ({favicon_file_size} bytes, {favicon_size}x{favicon_size})")

# Step 7: Create a 32x32 version for browser tab (standard favicon size)
favicon32 = result.resize((32, 32), Image.LANCZOS)
favicon32_path = os.path.join(public_dir, "favicon-32.png")
favicon32.save(favicon32_path, "PNG", optimize=True)
print(f"Favicon 32x32 saved: {favicon32_path}")

print("\n✅ Logo optimization complete!")
print("The white background has been removed and the circle fills the entire space.")
