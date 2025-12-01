// Demo version with sample data to show the design
// This will display sample headlines so you can see how it looks

// Sample news data (what real news would look like)
const SAMPLE_NEWS = {
    cnn: [
        { title: "Breaking: Major policy announcement expected today", pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Markets react to latest economic indicators", pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "International summit concludes with joint statement", pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Tech company announces groundbreaking innovation", pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Weather update: Storm system moving across region", pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Sports: Championship game draws record viewership", pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Health officials release new guidelines", pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Education reform proposal gains momentum", pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Celebrity news: Award ceremony highlights", pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" },
        { title: "Science breakthrough: New discovery announced", pubDate: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), link: "https://cnn.com" }
    ],
    fox: [
        { title: "Political debate heats up over new legislation", pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Economic recovery shows signs of acceleration", pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Border security measures updated", pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Military exercise demonstrates readiness", pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Local communities respond to funding changes", pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Investigation reveals new details in major case", pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Supreme Court decision impacts nationwide policy", pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Energy sector sees major investment surge", pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Veterans honored in special ceremony", pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" },
        { title: "Transportation infrastructure plan unveiled", pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), link: "https://foxnews.com" }
    ],
    msnbc: [
        { title: "Congressional hearing addresses key concerns", pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Climate change report shows urgent trends", pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Healthcare access expands in major cities", pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Voting rights legislation moves forward", pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Tech regulation debate intensifies", pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Social justice movement gains traction", pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Immigration reform proposal sparks discussion", pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Labor unions negotiate new contracts", pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Education funding reaches historic levels", pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" },
        { title: "Gun safety measures considered by lawmakers", pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), link: "https://msnbc.com" }
    ],
    abc: [
        { title: "National survey reveals shifting opinions", pubDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Entertainment industry recovers from pandemic", pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Space exploration mission achieves milestone", pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Consumer confidence index shows improvement", pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Wildfire season preparations underway", pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Medical breakthrough offers new treatment options", pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Housing market trends analyzed by experts", pubDate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Olympic athletes prepare for competition", pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Cybersecurity threats prompt new protocols", pubDate: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" },
        { title: "Agricultural innovations boost crop yields", pubDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), link: "https://abcnews.com" }
    ]
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

// Load news (using sample data)
function loadNews() {
    const newsList = document.getElementById('newsList');
    const loading = document.getElementById('loading');

    // Show loading briefly for effect
    loading.style.display = 'block';
    newsList.innerHTML = '';

    setTimeout(() => {
        loading.style.display = 'none';
        displayNews(SAMPLE_NEWS[currentSource]);
    }, 500);
}

// Display news items
function displayNews(items) {
    const newsList = document.getElementById('newsList');

    if (!items || items.length === 0) {
        newsList.innerHTML = '<div class="error">No news available.</div>';
        return;
    }

    // Filter for news from the past 24 hours only
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    const recentItems = items.filter(item => {
        const pubDate = new Date(item.pubDate);
        return pubDate >= twentyFourHoursAgo;
    });

    if (recentItems.length === 0) {
        newsList.innerHTML = '<div class="error">No news from the past 24 hours available.</div>';
        return;
    }

    // Display only top 10 from past 24 hours
    const topTen = recentItems.slice(0, 10);

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
