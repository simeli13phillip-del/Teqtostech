# TeQtos Image Optimization Script
# Requires ImageMagick to be installed

param(
    [string]$InputPath,
    [string]$OutputPath,
    [int]$Width = 400,
    [int]$Height = 400,
    [int]$Quality = 80
)

if (-not $InputPath -or -not $OutputPath) {
    Write-Host "Usage: .\optimize-image.ps1 -InputPath 'input.jpg' -OutputPath 'output.jpg' [-Width 400] [-Height 400] [-Quality 80]"
    exit 1
}

# Check if ImageMagick is installed
try {
    $null = Get-Command magick -ErrorAction Stop
} catch {
    Write-Host "Error: ImageMagick is not installed. Please install it from https://imagemagick.org/"
    Write-Host "Or use: choco install imagemagick"
    exit 1
}

# Optimize the image
$command = "magick '$InputPath' -resize ${Width}x${Height} -quality $Quality '$OutputPath'"
Write-Host "Running: $command"

try {
    Invoke-Expression $command
    Write-Host "✅ Image optimized successfully: $OutputPath"
    Write-Host "Original: $InputPath"
    Write-Host "Optimized: $OutputPath"
    Write-Host "Size: ${Width}x${Height}, Quality: ${Quality}%"
} catch {
    Write-Host "❌ Error optimizing image: $_"
    exit 1
}