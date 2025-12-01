# How to Deploy Your News Aggregator to GitHub Pages

Follow these simple steps to get your news website live and accessible from your phone!

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to https://github.com/signup
2. Create a free account
3. Verify your email

## Step 2: Create a New Repository

1. Go to https://github.com/new
2. **Repository name**: `news-aggregator`
3. **Description**: "Daily news aggregator"
4. Select **Public**
5. Do NOT initialize with README
6. Click **Create repository**

## Step 3: Upload Your Files

GitHub will show you instructions. Use the "uploading an existing file" option:

1. Click **uploading an existing file**
2. Drag and drop these files from `/Users/acheng/.gemini/antigravity/scratch/news-aggregator/`:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Scroll down and click **Commit changes**

## Step 4: Enable GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Click **Pages** in the left sidebar
3. Under "Source":
   - Branch: Select **main**
   - Folder: Select **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes

## Step 5: Get Your Website URL

After deployment, GitHub will show:
```
Your site is published at https://YOUR_USERNAME.github.io/news-aggregator/
```

## Step 6: Access on Your Phone

1. Open the URL on your phone's browser
2. Tap the Share button
3. Select "Add to Home Screen"
4. Now you have an app icon for quick access!

## Optional: Get Free Unlimited API Access

The site works without this, but for better reliability:

1. Go to https://rss2json.com/
2. Click "Get Started Free"
3. Sign up for a free account
4. Copy your API key
5. In your GitHub repository:
   - Open `script.js`
   - Click the pencil icon (Edit)
   - Find `YOUR_API_KEY`
   - Replace with your actual key
   - Click "Commit changes"

## That's It!

Your news aggregator is now live 24/7 for free! It will show fresh news every time you visit.

The GitHub Actions workflow will keep the site active by running every day at 6 AM PST.

---

**Bookmark this URL on your phone:**
`https://YOUR_USERNAME.github.io/news-aggregator/`

(Replace YOUR_USERNAME with your actual GitHub username)
