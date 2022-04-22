#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

git add -A
git commit -m 'chore: deploy'
git push

cd -