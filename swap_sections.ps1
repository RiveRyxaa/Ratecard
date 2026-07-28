$lines = Get-Content 'c:\Users\ASUS\Ratecard\index.html'

# Extract sections by line numbers (0-indexed)
$before_ratecard = $lines[0..252]       # Everything before Rate Card
$ratecard = $lines[253..384]            # Rate Card section (lines 254-385)
$terms = $lines[385..416]               # blank line + Terms section (lines 386-417) 
$blank1 = $lines[417]                   # blank line 418
$brands = $lines[418..532]              # Brands section (lines 419-533)
$after_brands = $lines[533..($lines.Length-1)]  # Everything after Brands

# Rebuild: before + brands + ratecard + terms + after
$newLines = @()
$newLines += $before_ratecard
$newLines += ""
$newLines += $brands
$newLines += ""
$newLines += $ratecard
$newLines += $terms
$newLines += $after_brands

# Fix nav order: swap Rate Card and Brands links
$output = $newLines -join "`r`n"
$output = $output.Replace(
    "                <li><a href=`"#ratecard`">Rate Card</a></li>`r`n                <li><a href=`"#brands`">Brands</a></li>",
    "                <li><a href=`"#brands`">Brands</a></li>`r`n                <li><a href=`"#ratecard`">Rate Card</a></li>"
)

Set-Content -Path 'c:\Users\ASUS\Ratecard\index.html' -Value $output -NoNewline
Write-Host "Sections swapped successfully!"
