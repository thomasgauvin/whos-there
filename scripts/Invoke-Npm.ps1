# Runs NPM from a consistent context
# Any arguments passed into this function are passed to NPM
param(
)

$project_root = Split-Path $PSScriptRoot
$node_root = $project_root

Push-Location $node_root
& npm $args
Pop-Location
