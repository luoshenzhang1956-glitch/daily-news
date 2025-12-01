import urllib.request
import json
import re
from datetime import datetime
import ssl

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

RSS_FEEDS = {
    'cnn': 'https://news.google.com/rss/search?q=site:cnn.com&ceid=US:en&hl=en-US&gl=US',
    'fox': 'https://moxie.foxnews.com/google-publisher/latest.xml',
    'msnbc': 'https://feeds.nbcnews.com/nbcnews/public/news',
    'abc': 'https://abcnews.go.com/abcnews/usheadlines'
}

def clean_text(text):
    if not text: return ""
    # Remove CDATA
    text = text.replace('<![CDATA[', '').replace(']]>', '')
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def fetch_feed(source, url):
    print(f"Fetching {source} from {url}...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
        req = urllib.request.Request(url, headers=headers)
        
        with urllib.request.urlopen(req, context=ctx, timeout=30) as response:
            content = response.read().decode('utf-8')
            
        items = []
        # Find all items
        raw_items = re.findall(r'<item[\s\S]*?>([\s\S]*?)</item>', content, re.IGNORECASE)
        
        for raw_item in raw_items:
            # Extract fields
            title_match = re.search(r'<title>(.*?)</title>', raw_item, re.IGNORECASE | re.DOTALL)
            link_match = re.search(r'<link>(.*?)</link>', raw_item, re.IGNORECASE | re.DOTALL)
            pubdate_match = re.search(r'<pubDate>(.*?)</pubDate>', raw_item, re.IGNORECASE | re.DOTALL)
            
            if not title_match: continue
            
            title = clean_text(title_match.group(1))
            link = clean_text(link_match.group(1)) if link_match else ""
            pubDate = clean_text(pubdate_match.group(1)) if pubdate_match else ""
            
            # Fallback for link
            if not link:
                url_match = re.search(r'https?://[^"\s<]+', raw_item)
                if url_match:
                    link = url_match.group(0)
            
            items.append({
                'title': title,
                'link': link,
                'pubDate': pubDate
            })
            
        print(f"  Found {len(items)} items")
        return items
        
    except Exception as e:
        print(f"  Error fetching {source}: {e}")
        return []

def main():
    all_news = {}
    
    for source, url in RSS_FEEDS.items():
        all_news[source] = fetch_feed(source, url)
        
    # Add metadata
    output = {
        'updated_at': datetime.now().isoformat(),
        'news': all_news
    }
    
    # Save to JSON
    with open('news_data.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print("\nSuccessfully generated news_data.json")

if __name__ == "__main__":
    main()
