# Daily News Brief

A simple, mobile-friendly news aggregator that displays the top 10 headlines from CNN, Fox News, MSNBC, and ABC News.

## Features

- 📱 Mobile-optimized design
- 🔄 Auto-updates daily at 6:00 AM PST
- 📰 Top 10 headlines from 4 major news sources
- ⚡ Fast, lightweight, no dependencies
- 🆓 100% free hosting via GitHub Pages

## Live Site

Visit: `https://YOUR_USERNAME.github.io/news-aggregator/`

(Replace YOUR_USERNAME with your GitHub username after deployment)

## How It Works

- **RSS Feeds**: Fetches latest news from RSS feeds via RSS2JSON API
- **GitHub Actions**: Automatically triggers at 6 AM PST daily
- **GitHub Pages**: Hosts the static website for free

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Edit files and refresh to see changes

## Deployment Instructions

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `news-aggregator`
3. Set to **Public**
4. Click "Create repository"

### Step 2: Push Code to GitHub

```bash
cd /Users/acheng/.gemini/antigravity/scratch/news-aggregator
git init
git add .
git commit -m "Initial commit: Daily News Brief"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/news-aggregator.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Site

Your site will be available at:
`https://YOUR_USERNAME.github.io/news-aggregator/`

## RSS2JSON API Key (Optional)

The site works without an API key, but you can get a free key for unlimited requests:

1. Visit https://rss2json.com/
2. Sign up for a free account
3. Get your API key
4. Replace `YOUR_API_KEY` in `script.js` with your actual key

## Supported News Sources

- **CNN**: Top Stories
- **Fox News**: Latest Headlines
- **MSNBC**: Breaking News
- **ABC News**: Top Stories

## Mobile Access

Simply bookmark the GitHub Pages URL on your phone's home screen for quick access every morning!

## Updates

The site automatically fetches fresh news every time you visit. GitHub Actions runs daily at 6 AM PST to keep the deployment active.

## License

Free to use and modify!
