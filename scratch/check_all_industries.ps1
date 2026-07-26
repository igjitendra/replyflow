$files = Get-ChildItem -Path "src/content/templates" -Filter "*.md"
$stats = @{}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'industry:\s*([^\r\n]+)') {
        $ind = $matches[1].Trim()
        if (-not $stats.ContainsKey($ind)) {
            $stats[$ind] = 0
        }
        $stats[$ind]++
    }
}

Write-Host "--- Industry Template Counts ---"
foreach ($k in $stats.Keys) {
    Write-Host "$k : $($stats[$k])"
}
