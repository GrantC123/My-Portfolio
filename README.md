# Common Commands Reference

## Revalidation

After updating content in Notion, run this to refresh your live site:

```powershell
.\revalidate.ps1
```

## Git Commands

### Check Status
See what files have changed:
```powershell
git status
```

### Add Files

**Add all changes:**
```powershell
git add -A
```

**Add specific file:**
```powershell
git add path/to/file
```

**Add all images:**
```powershell
git add public/images/
```

**Add specific folder:**
```powershell
git add lib/notion/
```

### Commit Changes

**With a message:**
```powershell
git commit -m "Your commit message here"
```

**Examples:**
```powershell
git commit -m "Add new images"
git commit -m "Update accordion feature"
git commit -m "Fix image aspect ratio"
```

### Push to GitHub

**Push your commits:**
```powershell
git push
```

### Complete Workflow

**Typical workflow after making changes (three commands):**
```powershell
git add -A
git commit -m "Description of changes"
git push
```

**One-line version (works in all PowerShell versions):**
```powershell
git add -A; git commit -m "Description of changes"; git push
```

**Note:** Use `;` to chain commands in PowerShell. This works in all versions. If you have PowerShell 7+, you can also use `&&` which stops if a command fails.

**After updating Notion content:**
```powershell
.\revalidate.ps1
```

## How to Add Images to Notion Projects

### Quick Method (Recommended)

**For Figma Exports:**

If you export images directly from Figma to your project folder:

1. Export image from Figma to `public/images/[folder]/` (e.g., `public/images/data-center/`)
2. Run the script:
   ```powershell
   .\add-images.ps1
   ```
3. Select the folder where you exported (e.g., data-center)
4. Script will auto-detect new images and show them
5. Confirm to commit, push, and revalidate
6. URLs are displayed and copied to clipboard
7. Paste in Notion ✅

The script automatically:
- ✅ Detects all uncommitted images in the folder
- ✅ Commits them to Git
- ✅ Pushes to GitHub
- ✅ Runs revalidation
- ✅ Displays full URLs (with domain)
- ✅ Copies URLs to clipboard

**Example:**
```
Figma → Export to public/images/data-center/hero.jpg
↓
.\add-images.ps1
↓
Select folder: 2 (data-center)
↓
Found: hero.jpg
↓
Confirm: y
↓
https://www.grantcrowderdesign.com/images/data-center/hero.jpg
(copied to clipboard)
```

### Manual Method

To add images manually:

1. **Add the image to your image folder:**
   - Place your image file in `public/images/` (or the appropriate subfolder like `public/images/editorial/`, `public/images/data-center/`, etc.)

2. **Push the image to GitHub:**
   ```powershell
   git add public/images/
   git commit -m "Add new image"
   git push
   ```
   This uploads the image to your GitHub repository, making it available on your live site.

3. **Embed the image path in Notion:**
   - In your Notion project page, add an image block
   - Use the image path: `/images/your-folder/image-name.jpg`
   - Example: `/images/editorial/my-image.jpg`
   - The image will be hosted from your site: `https://www.grantcrowderdesign.com/images/your-folder/image-name.jpg`

4. **Revalidate to see it on the live site:**
   ```powershell
   .\revalidate.ps1
   ```

**Note:** The image must be pushed to GitHub first before it will appear on your live site. The revalidation step refreshes your site to pull the latest content from Notion.

## Notion Callout Components

You can use special callout blocks in Notion to add interactive components to your project pages. Just create a callout block with the appropriate text:

### Masonry Gallery
Displays a dynamic masonry grid of images from a folder. Images are automatically loaded from the folder and randomized.

**Format:**
```
💠 gallery:editorial
```
or
```
🖼️ masonry:editorial
```

**Usage:** Add images to `public/images/editorial/` folder, and they'll automatically appear in the gallery.

### Before/After Slider
Creates an interactive image comparison slider.

**Format:**
```
🔄 slider: /path/to/before.jpg /path/to/after.jpg
```

**Optional parameters:**
- `before:Label` - Custom label for before image
- `after:Label` - Custom label for after image
- `position:50` - Default slider position (0-100)

**Example:**
```
🔄 slider: /images/before.jpg /images/after.jpg before:Original after:Redesigned position:30
```

### Accordion
Creates collapsible sections with headings as triggers.

**Format:**
```
📋 accordion:
```

Add child blocks with heading_1, heading_2, or heading_3 as section titles, followed by content blocks.

**Optional modifiers:**
- Add `h4:` or `size:h4` to heading text for smaller trigger text

### Spacer
Adds vertical spacing between sections.

**Format:**
```
⬇️ spacer:md
```

**Sizes:** `sm` (16px), `md` (32px), `lg` (48px), `xl` (64px), `2xl` (96px)
Or use a custom number: `spacer:16` for 16 units of spacing.

### Column Gap
Controls the gap between columns in multi-column layouts.

**Format:**
```
↔️ gap:6
```

Use any Tailwind spacing number (e.g., 2, 4, 6, 8, 10).

## Development

**Start local server:**
```powershell
npm run dev
```

**Start Storybook:**
```powershell
npm run storybook
```

**Build for production:**
```powershell
npm run build
```
