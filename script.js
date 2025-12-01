// RSS Feed URLs
const RSS_FEEDS = {
    cnn: 'https://news.google.com/rss/search?q=site:cnn.com&ceid=US:en&hl=en-US&gl=US',
    fox: 'https://moxie.foxnews.com/google-publisher/latest.xml',
    msnbc: 'https://feeds.nbcnews.com/nbcnews/public/news', // NBC News (MSNBC content)
    abc: 'https://abcnews.go.com/abcnews/usheadlines'
};

// Current active source
let currentSource = 'cnn';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    loadNews();
    updateTimestamp();
});

// Setup tab switching
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Load news for selected source
            currentSource = tab.dataset.source;
            loadNews();
        });
    });
}

// Load news from RSS feed
async function loadNews() {
    const newsList = document.getElementById('newsList');
    const loading = document.getElementById('loading');

    // Show loading
    loading.style.display = 'block';
    newsList.innerHTML = '';

    try {
        const feedUrl = RSS_FEEDS[currentSource];

        // Use AllOrigins CORS proxy (returns JSON)
        // Add timestamp to prevent caching
        const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}&_t=${new Date().getTime()}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.contents) {
            throw new Error('Failed to fetch news content');
        }

        const content = data.contents;

        const newsItems = [];

        // Regex to find all <item> blocks
        // [\s\S] matches any character including newlines
        const itemRegex = /<item[\s\S]*?>([\s\S]*?)<\/item>/gi;
        let match;

        while ((match = itemRegex.exec(content)) !== null) {
            if (newsItems.length >= 20) break;

            const itemContent = match[1];

            // Helper to extract tag content
            const getTagContent = (tag) => {
                const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
                const tagMatch = regex.exec(itemContent);
                if (!tagMatch) return '';

                let text = tagMatch[1];
                // Remove CDATA wrapper if present
                text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1');
                return text.trim();
            };

            const title = getTagContent('title') || 'No title';
            let link = getTagContent('link');
            const pubDate = getTagContent('pubDate');
            const guid = getTagContent('guid');

            // Fallback to guid if link is empty and guid looks like a URL
            if (!link && guid && guid.startsWith('http')) {
                link = guid;
            }

            // If still no link, try to find http url in the whole item content
            if (!link) {
                const urlMatch = itemContent.match(/https?:\/\/[^"'\s<]+/);
                if (urlMatch) link = urlMatch[0];
            }

            newsItems.push({
                title: title,
                link: link || '#',
                pubDate: pubDate || new Date().toISOString()
            });
        }

        // Save to cache
        localStorage.setItem(`news_cache_${currentSource}`, JSON.stringify({
            timestamp: new Date().getTime(),
            items: newsItems
        }));

        // Hide loading
        loading.style.display = 'none';

        // Display news items
        displayNews(newsItems);

    } catch (error) {
        console.error(error);

        // Try fallback to cache
        const cachedData = localStorage.getItem(`news_cache_${currentSource}`);
        if (cachedData) {
            const { items } = JSON.parse(cachedData);
            loading.style.display = 'none';
            displayNews(items);

            // Add notice
            const notice = document.createElement('div');
            notice.style.cssText = 'font-size: 12px; color: #666; text-align: center; margin-bottom: 10px; font-style: italic;';
            notice.textContent = 'Network error. Showing saved news.';
            newsList.insertBefore(notice, newsList.firstChild);
            return;
        }

        loading.style.display = 'none';
        newsList.innerHTML = `
            <div class="error">
                <p>Unable to load news.</p>
                <p style="font-size: 14px; margin-top: 8px;">${error.message}</p>
            </div>
        `;
    }
}

// Fallback method removed as we are using robust regex parsing now

// Display news items
function displayNews(items) {
    const newsList = document.getElementById('newsList');

    if (!items || items.length === 0) {
        newsList.innerHTML = '<div class="error">No news available.</div>';
        return;
    }

    // Sort items by date (newest first)
    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Filter for news from the past 24 hours
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    let displayItems = items.filter(item => {
        const pubDate = new Date(item.pubDate);
        return pubDate >= twentyFourHoursAgo;
    });

    // If we have fewer than 10 recent items, fill with older ones
    if (displayItems.length < 10) {
        const olderItems = items.filter(item => {
            const pubDate = new Date(item.pubDate);
            return pubDate < twentyFourHoursAgo;
        });

        // Add older items until we reach 10 or run out
        const needed = 10 - displayItems.length;
        displayItems = displayItems.concat(olderItems.slice(0, needed));
    }

    if (displayItems.length === 0) {
        newsList.innerHTML = '<div class="error">No news available.</div>';
        return;
    }

    // Display top 10
    const topTen = displayItems.slice(0, 10);

    topTen.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const pubDate = new Date(item.pubDate);
        const timeAgo = getTimeAgo(pubDate);

        newsItem.innerHTML = `
            <span class="news-number">${index + 1}</span>
            <div class="news-content">
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-link">
                    <div class="news-title">${item.title}</div>
                    <div class="news-time">${timeAgo}</div>
                    <div style="font-size: 10px; color: #9ca3af; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.link}</div>
                </a>
            </div>
        `;

        newsItem.addEventListener('click', () => {
            window.open(item.link, '_blank');
        });

        newsList.appendChild(newsItem);
    });
}

// Calculate time ago
function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

// Update timestamp
function updateTimestamp() {
    const updateTime = document.getElementById('updateTime');
    const now = new Date();
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
    };
    updateTime.textContent = now.toLocaleString('en-US', options);
}
