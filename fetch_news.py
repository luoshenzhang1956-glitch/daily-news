import urllib.request
import urllib.parse
import json
import re
from datetime import datetime, timedelta
import ssl
import time
from email.utils import parsedate_to_datetime

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Proxy base for difficult feeds
PROXY_BASE = "https://api.allorigins.win/raw?url="

RSS_SOURCES = {
    'ap': {
        'top': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com&format=rss',
        'world': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com+world&format=rss',
        'us': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com+us&format=rss',
        'business': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com+business&format=rss',
        'tech': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com+technology&format=rss',
        'health': PROXY_BASE + 'https://www.bing.com/news/search?q=site:apnews.com+health&format=rss'
    },
    'npr': {
        'top': 'https://feeds.npr.org/1001/rss.xml',
        'world': 'https://feeds.npr.org/1004/rss.xml',
        'us': 'https://feeds.npr.org/1003/rss.xml',
        'business': 'https://feeds.npr.org/1006/rss.xml',
        'tech': 'https://feeds.npr.org/1019/rss.xml',
        'health': 'https://feeds.npr.org/1128/rss.xml'
    },
    'bbc': {
        'top': 'https://feeds.bbci.co.uk/news/rss.xml',
        'world': 'https://feeds.bbci.co.uk/news/world/rss.xml',
        'us': 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml',
        'business': 'https://feeds.bbci.co.uk/news/business/rss.xml',
        'tech': 'https://feeds.bbci.co.uk/news/technology/rss.xml',
        'health': 'https://feeds.bbci.co.uk/news/health/rss.xml'
    },
    'reuters': {
        'top': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com&format=rss',
        'world': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com+world&format=rss',
        'us': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com+us&format=rss',
        'business': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com+business&format=rss',
        'tech': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com+technology&format=rss',
        'health': PROXY_BASE + 'https://www.bing.com/news/search?q=site:reuters.com+health&format=rss'
    },
    'markets': {
        'top': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664', # Finance
        'world': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362', # World
        'us': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069', # US Economy
        'business': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147', # Business
        'tech': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910', # Tech
        'health': PROXY_BASE + 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000108' # Health
    }
}

REQUIRED_TOPICS = ['world', 'us', 'business', 'tech', 'health']

def clean_text(text):
    if not text: return ""
    text = text.replace('<![CDATA[', '').replace(']]>', '')
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def parse_date(date_str):
    try:
        return parsedate_to_datetime(date_str)
    except:
        return None

def fetch_feed(url):
    try:
        # Use a full, modern User-Agent to avoid bot detection
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
        }
        
        # If using proxy, we need to ensure the target URL is encoded if it wasn't already
        # But here we are manually constructing it, so we should be careful.
        # Actually, urllib.request handles spaces in URLs automatically usually, but for the proxy query param it might be tricky.
        # Let's just use the URL as is, assuming the dictionary values are correct.
        # The PROXY_BASE is "https://api.allorigins.win/raw?url="
        # We need to quote the part AFTER the base.
        
        final_url = url
        if "api.allorigins.win" in url:
            base, target = url.split("?url=", 1)
            final_url = base + "?url=" + urllib.parse.quote(target)
            
        req = urllib.request.Request(final_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"    Error fetching {url}: {e}")
        return None

def extract_items(content):
    if not content: return []
    items = []
    raw_items = re.findall(r'<item[\s\S]*?>([\s\S]*?)</item>', content, re.IGNORECASE)
    
    for raw_item in raw_items:
        title_match = re.search(r'<title>(.*?)</title>', raw_item, re.IGNORECASE | re.DOTALL)
        link_match = re.search(r'<link>(.*?)</link>', raw_item, re.IGNORECASE | re.DOTALL)
        pubdate_match = re.search(r'<pubDate>(.*?)</pubDate>', raw_item, re.IGNORECASE | re.DOTALL)
        
        if not title_match: continue
        
        title = clean_text(title_match.group(1))
        link = clean_text(link_match.group(1)) if link_match else ""
        pubDateStr = clean_text(pubdate_match.group(1)) if pubdate_match else ""
        
        if not link:
            url_match = re.search(r'https?://[^"\s<]+', raw_item)
            if url_match: link = url_match.group(0)
            
        items.append({
            'title': title,
            'link': link,
            'pubDate': pubDateStr,
            'timestamp': parse_date(pubDateStr)
        })
    return items

def smart_select(source_feeds):
    selected_items = []
    seen_titles = set()
    
    # 1. Fetch all feeds for this source
    all_category_items = {}
    for category, url in source_feeds.items():
        print(f"  Fetching {category}...")
        content = fetch_feed(url)
        items = extract_items(content)
        
        if not items:
            print(f"    WARNING: No items found for {category}!")
            if content:
                print(f"    Response snippet: {content[:200]}...")
            else:
                print("    Response was empty.")
        
        # Filter 24h
        now = datetime.now(items[0]['timestamp'].tzinfo if items and items[0]['timestamp'] else None)
        recent_items = []
        for item in items:
            if item['timestamp'] and (now - item['timestamp']) < timedelta(hours=24):
                recent_items.append(item)
        
        all_category_items[category] = recent_items

    # 2. Quota Selection (1 from each required topic)
    for topic in REQUIRED_TOPICS:
        if topic in all_category_items and all_category_items[topic]:
            # Find best item (newest) that hasn't been seen
            for item in all_category_items[topic]:
                # Simple fuzzy check
                title_slug = item['title'].lower()[:20]
                if title_slug not in seen_titles:
                    item['category'] = topic # Tag it
                    selected_items.append(item)
                    seen_titles.add(title_slug)
                    break # Only need 1 per topic

    # 3. Fill remaining slots with Top/Breaking news
    remaining_slots = 10 - len(selected_items)
    if remaining_slots > 0 and 'top' in all_category_items:
        for item in all_category_items['top']:
            if remaining_slots <= 0: break
            
            title_slug = item['title'].lower()[:20]
            if title_slug not in seen_titles:
                item['category'] = 'Top News'
                selected_items.append(item)
                seen_titles.add(title_slug)
                remaining_slots -= 1

    # 4. Sort by date (newest first)
    selected_items.sort(key=lambda x: x['timestamp'] if x['timestamp'] else datetime.min, reverse=True)
    
    # Clean up timestamp object for JSON serialization
    for item in selected_items:
        if 'timestamp' in item: del item['timestamp']
        
    return selected_items

def main():
    final_output = {}
    
    for source, feeds in RSS_SOURCES.items():
        print(f"\nProcessing {source}...")
        final_output[source] = smart_select(feeds)
        print(f"  Selected {len(final_output[source])} items for {source}")

    output = {
        'updated_at': datetime.now().isoformat(),
        'news': final_output
    }
    
    with open('news_data.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print("\nSuccessfully generated news_data.json")

if __name__ == "__main__":
    main()
