# add-images.ps1
# Script to automate adding images to the portfolio and deploying them

param(
    [Parameter(Mandatory=$true)]
    [string[]]$ImagePaths
)

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

Write-Host "  $index. Create new folder" -ForegroundColor Yellow
Write-Host "  0. Cancel" -ForegroundColor Red

$choice = Read-Host "`nSelect folder number"

if ($choice -eq "0") {
    Write-Host "`nCancelled." -ForegroundColor Red
    exit
}

if ($choice -eq $index) {
    # Create new folder
    $newFolder = Read-Host "Enter new folder name"
    $folder = $newFolder
    $folderPath = "public/images/$folder"
    
    if (!(Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath | Out-Null
        Write-Host "Created folder: $folder" -ForegroundColor Green
    }
} elseif ($choice -match '^\d+$' -and [int]$choice -le $folderOptions.Count) {
    # Use existing folder
    $folder = $folderOptions[[int]$choice - 1]
} else {
    Write-Host "`nInvalid choice. Cancelled." -ForegroundColor Red
    exit
}

Write-Host "`n📸 Adding images to public/images/$folder/" -ForegroundColor Cyan

$addedImages = @()

foreach ($image in $ImagePaths) {
    if (Test-Path $image) {
        $filename = Split-Path $image -Leaf
        $destination = "public/images/$folder/$filename"
        
        Copy-Item $image $destination -Force
        Write-Host "  ✓ Added: $filename" -ForegroundColor Green
        
        $addedImages += "/images/$folder/$filename"
    } else {
        Write-Host "  ✗ Not found: $image" -ForegroundColor Red
    }
}

if ($addedImages.Count -gt 0) {
    Write-Host "`n📦 Committing to Git..." -ForegroundColor Cyan
    git add "public/images/$folder/"
    $commitMessage = "Add $($addedImages.Count) image(s) to $folder folder"
    git commit -m $commitMessage
    
    Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
    git push
    
    Write-Host "`n🔄 Revalidating site..." -ForegroundColor Cyan
    .\revalidate.ps1
    
    Write-Host "`n✅ Done! Copy these paths into Notion:" -ForegroundColor Green
    Write-Host "`n----------------------------------------" -ForegroundColor DarkGray
    foreach ($path in $addedImages) {
        Write-Host "$path" -ForegroundColor White
    }
    Write-Host "----------------------------------------`n" -ForegroundColor DarkGray
    
    # Copy first path to clipboard for convenience
    if ($addedImages.Count -eq 1) {
        $addedImages[0] | Set-Clipboard
        Write-Host "📋 Path copied to clipboard!" -ForegroundColor Green
    } elseif ($addedImages.Count -gt 1) {
        Write-Host "💡 Tip: Paths are ready to copy from above" -ForegroundColor Cyan
    }
    
    Write-Host ""
} else {
    Write-Host "`n❌ No images added" -ForegroundColor Red
}

