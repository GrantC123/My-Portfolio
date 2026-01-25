# Using the Masonry Gallery in Notion

## Overview
You can now add a masonry gallery to any Notion project page using a simple callout component. The gallery automatically loads images from a specified folder and displays them in a beautiful randomized masonry layout.

## How to Use

### Step 1: Create Your Notion Project Page
1. Open your Notion Projects database
2. Create a new page or edit an existing one
3. Set the required properties:
   - **Slug**: `editorial-imagery` (or your desired slug)
   - **Summary**: Your project summary text
   - **Role**, **Timeline**, **Tools**, **Deliverables**: Project details
   - **Hero Image Path**: `/images/editorial/editorial-imagery-header.jpg`
   - **Next Project Slug**: The slug of the project to show next (e.g., `bankrate`)

### Step 2: Add Content to Your Page
Write your project content in Notion as you normally would:
- Paragraphs describing the project
- Headings for sections
- Images, callouts, lists, etc.

### Step 3: Insert the Gallery Callout
Wherever you want the masonry gallery to appear, create a callout block and type:

```
💠 gallery:editorial
```

or 

```
🖼️ masonry:editorial
```

**Note:** The emoji doesn't matter - it's just for visual reference in Notion. The important part is the text `gallery:editorial` or `masonry:editorial`.

### Step 4: Add Images to the Folder
1. Add your image files to `public/images/editorial/` folder
2. The gallery will automatically:
   - Load all images from the folder
   - Exclude the hero image (`editorial-imagery-header.jpg`)
   - Randomize the order
   - Display them in a masonry grid with random aspect ratios

### Step 5: Push and Deploy
```powershell
git add .
git commit -m "Add editorial imagery project to Notion"
git push
.\revalidate.ps1
```

## Example Notion Page Structure

```
📄 Editorial Imagery (Page Title)

Properties:
- Slug: editorial-imagery
- Summary: Over my time at Redventures, I've had the opportunity...
- Role: Product Designer
- Timeline: 2023-2024
- Tools: Figma, Midjourney, Adobe Creative Suite
- Hero Image Path: /images/editorial/editorial-imagery-header.jpg
- Next Project Slug: bankrate

Body Content:
────────────────────────────────────────

## Challenge

The magazine needed to create visually compelling imagery that would 
stand out in a crowded digital space while maintaining their brand identity.

## Approach

I utilized AI tools like Midjourney combined with traditional design 
principles to create a series of striking editorial images.

### Design Process

1. **Research & Ideation**
   - Analyzed competitor imagery
   - Identified key visual themes
   
2. **Creation & Iteration**
   - Generated concepts using AI
   - Refined and polished in Photoshop

💠 gallery:editorial

## Results

The new imagery increased engagement by 40% and helped establish a 
distinctive visual identity for the brand.
```

## How It Works

### Automatic Image Loading
- The gallery fetches images from `/api/editorial-images`
- This API route reads all images from `public/images/editorial/`
- Supports: `.jpg`, `.jpeg`, `.png`, `.webp`
- Automatically excludes the hero image
- Randomizes the order on each page load

### Adding/Removing Images
To add new images to the gallery:
1. Drop the image file into `public/images/editorial/`
2. Push to GitHub
3. The gallery updates automatically - no code changes needed!

### Styling
The gallery includes:
- Responsive masonry layout (1-4 columns based on screen size)
- Random aspect ratios for visual interest
- Hover effects with zoom
- Clickable images that open in a lightbox
- Zoom controls in the lightbox

## Future Gallery Types

You can extend this system by adding more gallery types:

```typescript
// In block-renderer.tsx, add more cases:
if (galleryType === 'portfolio') return <PortfolioGallery />
if (galleryType === 'photography') return <PhotographyGallery />
```

Then in Notion, use:
```
💠 gallery:portfolio
```

## Troubleshooting

### Gallery not showing?
- Check the callout text is exactly `gallery:editorial` or `masonry:editorial`
- Verify images exist in `public/images/editorial/`
- Check browser console for errors

### Images not loading?
- Ensure image files are pushed to GitHub
- Run `.\revalidate.ps1` to refresh the cache
- Check image file extensions are supported

### Images not updating?
- The gallery randomizes on each page load
- If you added new images, make sure they're pushed to GitHub
- Clear browser cache or hard refresh (Ctrl+Shift+R)

## Benefits of This Approach

✅ **Easy Content Management** - Edit project details in Notion without touching code  
✅ **Automatic Image Loading** - Just drop images in a folder  
✅ **Flexible Placement** - Put the gallery anywhere in your content  
✅ **Consistent System** - Uses the same callout pattern as other components  
✅ **Fully Responsive** - Works beautifully on all screen sizes  
✅ **Interactive** - Images open in a zoomable lightbox  

