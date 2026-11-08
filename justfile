# doitpoorly.net: Astro build log. Bare `just` lists recipes.

default:
    @just --list

# 📦 Install dependencies
install:
    npm install

# 🛠️ Dev server with hot reload
dev:
    npm run dev

# 🏗️ Build the site into dist/
build:
    npm run build

# ✅ Build, then check every in-page anchor and theme token resolves
check: build
    node scripts/check-built.mjs

# 👀 Serve the built site for review (pass --host to reach it from another machine)
preview *args: build
    npm run preview -- {{args}}
