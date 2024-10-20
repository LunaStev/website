import requests
import openai
import os
from datetime import datetime
from pytrends.request import TrendReq

# OpenAI API 키 및 Unsplash API 키 설정
openai.api_key = os.getenv('OPENAI_API_KEY')
UNSPLASH_API_KEY = os.getenv('UNSPLASH_API_KEY')

# pytrends 설정
pytrends = TrendReq(hl='en-US', tz=360)

# Google 트렌드 검색을 통한 인기 주제 가져오기
def get_trending_topics():
    try:
        trending_searches = pytrends.trending_searches(pn='united_states')
        topics = trending_searches[0].tolist()  # 인기 검색어 리스트
        return topics
    except Exception as e:
        print(f"Error fetching trending topics: {e}")
        return []

# 이미지 검색 함수
def search_unsplash_images(query):
    url = f"https://api.unsplash.com/search/photos?query={query}&client_id={UNSPLASH_API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if data['results']:
            images = [result['urls']['small'] for result in data['results']]
            return images
        else:
            print("No images found.")
            return []
    else:
        print(f"Error fetching images: {response.status_code}")
        return []

# 블로그 포스트 생성 함수
def generate_blog_post(topic):
    prompt = f"Write a detailed blog post about {topic}"

    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=500
    )

    return response.choices[0].text.strip()

# Jekyll 포스트 파일로 저장
def save_post_to_jekyll(title, content, images):
    today = datetime.today().strftime('%Y-%m-%d')
    filename = f"_posts/{today}-{title.replace(' ', '-')}.md"

    with open(filename, 'w') as f:
        f.write(f"---\nlayout: post\ntitle: \"{title}\"\n---\n\n{content}\n\n")
        for img_url in images:
            f.write(f"![{title}]({img_url})\n\n")  # 이미지를 포스트에 삽입

# Google Trends에서 인기 주제 가져오기
topics = get_trending_topics()

# 주제를 순환하면서 글과 이미지 생성
for topic in topics[:5]:  # 상위 5개의 인기 주제로 글과 이미지 생성
    blog_post = generate_blog_post(topic)
    images = search_unsplash_images(topic)  # 관련 이미지 검색
    save_post_to_jekyll(topic, blog_post, images)  # 포스트 저장

# GitHub에 자동으로 커밋하고 푸시
def git_push():
    os.system("git add .")
    os.system("git commit -m 'Automated blog post'")
    os.system("git push origin master")

# 생성된 포스트 푸시
git_push()
