# TeQtos Images Guide

## 📁 Image Organization Structure

```
assets/images/
├── avatars/           # Profile pictures and user avatars
├── testimonials/      # Testimonial backgrounds and images
├── logos/            # Company logos and branding
├── icons/            # UI icons and graphics
├── team/             # Team member photos (future)
├── portfolio/        # Project portfolio images (future)
└── backgrounds/      # Background images and patterns (future)
```

## 🖼️ How to Add Images to Your Website

### Method 1: Local Images (Recommended)

1. **Save your image** in the appropriate folder:
   - `assets/images/avatars/` - for profile pictures
   - `assets/images/logos/` - for company logos
   - `assets/images/testimonials/` - for testimonial images

2. **Use in HTML:**
   ```html
   <img src="assets/images/avatars/your-image.jpg" alt="Description">
   ```

### Method 2: External Images (CDN/Stock Photos)

```html
<!-- Using Unsplash for stock photos -->
<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Professional headshot">

<!-- Using placeholder services -->
<img src="https://via.placeholder.com/400x400/3b82f6/ffffff?text=TeQtos" alt="Placeholder">
```

### Method 3: SVG Icons and Graphics

```html
<!-- Inline SVG (best for icons) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>

<!-- External SVG file -->
<img src="assets/images/logos/teqtos-logo.svg" alt="TeQtos Logo">
```

## 📏 Image Optimization Tips

### File Formats
- **Photos**: Use JPEG (.jpg) for best compression
- **Graphics/Logos**: Use PNG for transparency, SVG for scalability
- **Icons**: Use SVG for crisp scaling at any size

### Image Sizes
- **Avatars**: 100x100px or 200x200px
- **Logos**: 200x60px (header), 400x120px (footer)
- **Backgrounds**: 1920x1080px for full-width
- **Thumbnails**: 300x200px for cards

### Optimization Commands
```bash
# Resize image (requires ImageMagick)
magick input.jpg -resize 400x400 output.jpg

# Compress JPEG
magick input.jpg -quality 80 output.jpg

# Convert to WebP (modern format)
magick input.jpg -quality 80 output.webp
```

## 🎨 CSS for Images

### Responsive Images
```css
.responsive-img {
  width: 100%;
  height: auto;
  max-width: 400px;
}
```

### Image Hover Effects
```css
.image-hover {
  transition: transform 0.3s ease;
}

.image-hover:hover {
  transform: scale(1.05);
}
```

### Background Images
```css
.hero-bg {
  background-image: url('assets/images/backgrounds/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

## 🔧 HTML Image Best Practices

### Always Include Alt Text
```html
<!-- Good -->
<img src="avatar.jpg" alt="John Doe, AV Technician">

<!-- Bad -->
<img src="avatar.jpg" alt="">
```

### Lazy Loading
```html
<img src="image.jpg" alt="Description" loading="lazy">
```

### Responsive Images
```html
<picture>
  <source media="(max-width: 768px)" srcset="mobile-image.jpg">
  <source media="(min-width: 769px)" srcset="desktop-image.jpg">
  <img src="fallback-image.jpg" alt="Description">
</picture>
```

## 📝 Current Images in Use

### Navigation
- `assets/images/logos/teqtos-logo.svg` - Header logo

### Top Candidates Section
- `assets/images/avatars/avatar-1.svg` - Marcus Johnson
- `assets/images/avatars/avatar-2.svg` - Sarah Chen
- `assets/images/avatars/default-avatar.svg` - David Rodriguez

### Testimonials
- `assets/images/testimonials/testimonial-bg.svg` - Background pattern

## 🚀 Adding New Images

1. **Choose the right folder** based on image type
2. **Optimize the image** for web (size, format, compression)
3. **Add to HTML** with proper alt text and responsive classes
4. **Test on different devices** and screen sizes
5. **Update this guide** if you add new categories

## 📚 Useful Resources

- [Unsplash](https://unsplash.com) - Free stock photos
- [Pexels](https://pexels.com) - Free stock photos
- [Placeholder.com](https://placeholder.com) - Placeholder images
- [TinyPNG](https://tinypng.com) - Image compression
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

---

**Last Updated:** April 16, 2026