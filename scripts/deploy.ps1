# 构建并发布到 GitHub Pages(把 dist 目录推送到远程仓库的 gh-pages 分支)。
# 用法: npm run deploy
Set-Location (Join-Path $PSScriptRoot '..')

$remote = git remote get-url origin
if (-not $remote) { Write-Host '还没有配置远程仓库 origin'; exit 1 }
$name = git config user.name
$email = git config user.email

npm run build
if ($LASTEXITCODE -ne 0) { Write-Host '构建失败,已取消发布'; exit 1 }

Push-Location dist
try {
    # .nojekyll 让 GitHub Pages 原样提供文件
    New-Item -ItemType File -Name '.nojekyll' -Force | Out-Null
    git init -q -b gh-pages
    git config user.name $name
    git config user.email $email
    git add -A
    git commit -q -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git push -f $remote gh-pages
    $code = $LASTEXITCODE
}
finally {
    Pop-Location
    Remove-Item -Recurse -Force (Join-Path 'dist' '.git') -ErrorAction SilentlyContinue
}
if ($code -ne 0) { Write-Host '推送失败'; exit 1 }
Write-Host '发布完成。网页通常在 1-2 分钟内更新。'
