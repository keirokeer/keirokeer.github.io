# Personal Link Card

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

A customizable personal link card template for GitHub Pages.

## Quick Setup

1. **Clone & install**
```bash
git clone https://github.com/keirokeer/personal-card-template.git
cd personal-card-template
npm install
```

2. **Configure**
- Edit `src/config/settings.js` with your info
- Run `npm run update-config` to update config files

3. **Test & deploy**
```bash
npm run dev          # Test locally
npm run deploy       # Deploy to GitHub Pages
```

## Deployment

1. Enable GitHub Pages in repo settings (gh-pages branch)
2. Update `homepage` in `package.json`
3. Run `npm run deploy`