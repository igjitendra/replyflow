$files = Get-ChildItem -Path "src/content/templates" -Filter "*.md"
$industries = @('real-estate', 'restaurant', 'clinic', 'salon')

foreach ($ind in $industries) {
    Write-Host "===================="
    Write-Host "PURPOSES FOR: $ind"
    Write-Host "===================="
    $purposes = @()
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -Raw
        if ($content -match 'industry:\s*([^\r\n]+)') {
            if ($matches[1].Trim() -eq $ind) {
                if ($content -match 'purpose:\s*([^\r\n]+)') {
                    $purposes += $matches[1].Trim()
                }
            }
        }
    }
    $purposes | Select-Object -Unique | ForEach-Object { Write-Host "  - $_" }
}
