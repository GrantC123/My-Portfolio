# add-images.ps1
# Script to automatically detect, commit, and deploy new images from folders

Write-Host "`n📂 Available folders:" -ForegroundColor Cyan

# Get existing folders in public/images/
$existingFolders = Get-ChildItem "public/images" -Directory | Select-Object -ExpandProperty Name | Sort-Object
$folderOptions = @()
$index = 1

foreach ($folder in $existingFolders) {
    Write-Host "  $index. $folder" -ForegroundColor White
    $folderOptions += $folder
    $index++
}

Write-Host "  0. Cancel" -ForegroundColor Red

$choice = Read-Host "`nSelect folder number"

if ($choice -eq "0") {
    Write-Host "`nCancelled." -ForegroundColor Red
    exit
}

if ($choice -match '^\d+$' -and [int]$choice -le $folderOptions.Count -and [int]$choice -gt 0) {
    # Use existing folder
    $folder = $folderOptions[[int]$choice - 1]
} else {
    Write-Host "`nInvalid choice. Cancelled." -ForegroundColor Red
    exit
}

Write-Host "`n🔍 Scanning public/images/$folder/ for uncommitted images..." -ForegroundColor Cyan

# Get git status for the selected folder
$gitStatus = git status --porcelain "public/images/$folder/"

# Filter for new and modified image files
$newImages = @()
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')

foreach ($line in $gitStatus) {
    if ($line) {
        # Parse git status output (format: "?? filename" or "M  filename")
        $status = $line.Substring(0, 2).Trim()
        $filepath = $line.Substring(3).Trim()
        
        # Check if it's a new or modified file
        if ($status -eq '?' -or $status -eq 'M' -or $status -eq 'A') {
            # Check if it's an image file
            $extension = [System.IO.Path]::GetExtension($filepath).ToLower()
            if ($imageExtensions -contains $extension) {
                $filename = Split-Path $filepath -Leaf
                $newImages += @{
                    Path = $filepath
                    Filename = $filename
                    Status = if ($status -eq '?') { 'New' } elseif ($status -eq 'M') { 'Modified' } else { 'Added' }
                }
            }
        }
    }
}

if ($newImages.Count -eq 0) {
    Write-Host "`n✓ No uncommitted images found in $folder/" -ForegroundColor Yellow
    Write-Host "  All images in this folder are already committed." -ForegroundColor Gray
    Write-Host "`nTip: Export your images from Figma to public/images/$folder/ first." -ForegroundColor Cyan
    exit
}

Write-Host "`n📸 Found $($newImages.Count) uncommitted image(s):" -ForegroundColor Green
foreach ($img in $newImages) {
    $statusIcon = if ($img.Status -eq 'New') { '✓' } elseif ($img.Status -eq 'Modified') { '~' } else { '+' }
    Write-Host "  $statusIcon $($img.Filename) [$($img.Status)]" -ForegroundColor White
}

# Confirm before proceeding
Write-Host ""
$confirm = Read-Host "Proceed with commit and deploy? (y/n)"

if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "`nCancelled." -ForegroundColor Red
    exit
}

Write-Host "`n📦 Committing images to Git..." -ForegroundColor Cyan
git add "public/images/$folder/"

$commitMessage = if ($newImages.Count -eq 1) {
    "Add $($newImages[0].Filename) to $folder"
} else {
    "Add $($newImages.Count) images to $folder folder"
}

git commit -m $commitMessage

Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host "`n🔄 Revalidating site..." -ForegroundColor Cyan
.\revalidate.ps1

Write-Host "`n✅ Done! Copy these URLs into Notion:" -ForegroundColor Green
Write-Host "`n----------------------------------------" -ForegroundColor DarkGray

$domain = "https://www.grantcrowderdesign.com"
$fullUrls = @()

foreach ($img in $newImages) {
    $relativePath = $img.Path -replace '\\', '/' -replace 'public', ''
    $fullUrl = "$domain$relativePath"
    Write-Host "$fullUrl" -ForegroundColor White
    $fullUrls += $fullUrl
}

Write-Host "----------------------------------------`n" -ForegroundColor DarkGray

# Copy first URL to clipboard for convenience
if ($fullUrls.Count -eq 1) {
    $fullUrls[0] | Set-Clipboard
    Write-Host "📋 URL copied to clipboard!" -ForegroundColor Green
} elseif ($fullUrls.Count -gt 1) {
    # Copy all URLs (one per line) to clipboard
    $allUrls = $fullUrls -join "`n"
    $allUrls | Set-Clipboard
    Write-Host "📋 All URLs copied to clipboard!" -ForegroundColor Green
}

Write-Host ""
