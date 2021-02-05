# Resolve all dependencies that the project requires to run.
param(
    [switch]$Verbose
)

. $PSScriptRoot\Write-Status.ps1

if ($Verbose) {
    $quiet = ""
}
else {
    $quiet = "--quiet"
}

Write-Status "Updating npm"
. $PSScriptRoot\Invoke-Npm install -g "npm@6" $quiet
Write-Status "Updating Angular CLI"
. $PSScriptRoot\Invoke-Npm install -g @angular/cli $quiet
Write-Status "Updating requirements"
. $PSScriptRoot\Invoke-Npm install $quiet

Write-Status "Updating Azure Function requirements"
$project_root = Split-Path $PSScriptRoot
$api_root = Join-Path $project_root "api"
Push-Location $api_root
& npm.cmd install
Pop-Location

if ($Global:console_functions) {
  # Define or update the console scripts if we want them
  . $PSScriptRoot\Console-Scripts.ps1
}
