# Revalidate Pages Script
# Run this script after updating Notion to refresh your live site

Write-Host "Revalidating pages..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "https://www.grantcrowderdesign.com/api/revalidate" -Method POST -ContentType "application/json" -Body '{"revalidateAll": true}'
    
    Write-Host ""
    Write-Host "SUCCESS: Pages revalidated successfully!" -ForegroundColor Green
    Write-Host "  Paths: $($response.paths -join ', ')" -ForegroundColor Cyan
    Write-Host "  Message: $($response.message)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your site will show the latest Notion content on the next visit." -ForegroundColor White
} catch {
    Write-Host ""
    Write-Host "ERROR: Failed to revalidate pages:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

