import requests
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw
import random
import io
import math

def create_professional_hero_image(output_path):
    """Create a professional hero image simulating Navy Yard waterfront."""
    # Create a blank canvas
    img = Image.new('RGB', (1920, 1080), color='#f0f0f0')
    draw = ImageDraw.Draw(img)

    # Sky gradient
    for y in range(540):
        r = int(135 - y * 0.2)
        g = int(206 - y * 0.2)
        b = int(235 - y * 0.1)
        for x in range(1920):
            draw.point((x, y), fill=(r, g, b))

    # Water
    water_color = (70, 130, 180)
    for y in range(540, 1080):
        for x in range(1920):
            # Create a wavy effect
            wave_height = int(10 * (1 + math.sin(x / 100 + y / 50)))
            if y + wave_height < 1080:
                draw.point((x, y), fill=water_color)

    # Buildings silhouette
    building_colors = [(50, 50, 70), (60, 60, 80), (40, 40, 60)]
    for _ in range(10):
        x1 = random.randint(0, 1920)
        width = random.randint(100, 300)
        height = random.randint(300, 800)
        color = random.choice(building_colors)
        draw.rectangle([x1, 540, x1 + width, 1080], fill=color)

    # Soft blur
    img = img.filter(ImageFilter.GaussianBlur(radius=1))

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)

    # Save image
    img.save(output_path, quality=95)

def create_professional_avatar(output_path):
    """Create a professional avatar image."""
    img = Image.new('RGB', (500, 500), color='#f0f0f0')
    draw = ImageDraw.Draw(img)

    # Soft gradient background
    for y in range(500):
        r = int(240 - y * 0.2)
        g = int(240 - y * 0.2)
        b = int(240 - y * 0.2)
        for x in range(500):
            draw.point((x, y), fill=(r, g, b))

    # Professional silhouette
    colors = ['#2c3e50', '#34495e', '#2980b9']
    color = random.choice(colors)
    
    # Draw a professional figure
    draw.ellipse([100, 100, 400, 400], fill=color)

    # Save the avatar
    img.save(output_path)

# Generate images
create_professional_hero_image("C:/Users/User/CascadeProjects/str-cleaning-website/img/navy-yard-hero.jpg")
create_professional_avatar("C:/Users/User/CascadeProjects/str-cleaning-website/img/host-avatar-1.jpg")
create_professional_avatar("C:/Users/User/CascadeProjects/str-cleaning-website/img/host-avatar-2.jpg")

print("Images generated successfully!")
