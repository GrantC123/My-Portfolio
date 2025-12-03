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

To add images that will appear on your live site:

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
