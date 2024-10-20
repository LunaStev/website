import openai
import os
from datetime import datetime
from pytrends.request import TrendReq
import requests

# OpenAI API 및 Unsplash API 키 설정
openai.api_key = os.getenv('OPENAI_API_KEY')
UNSPLASH_ACCESS_KEY = os.getenv('UNSPLASH_ACCESS_KEY')  # Unsplash API 키

# pytrends 설정
pytrends = TrendReq(hl='en-US', tz=360)

# Google 트렌드에서 인기 주제 가져오기
def get_trending_topics():
    try:
        trending_searches = pytrends.trending_searches(pn='united_states')
        return trending_searches[0].tolist()  # 인기 검색어 리스트
    except Exception as e:
        print(f"Error fetching trending topics: {e}")
        return []

# 이미지 검색 함수
def search_image(query):
    url = f"https://api.unsplash.com/search/photos?query={query}&client_id={UNSPLASH_ACCESS_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            return data['results'][0]['urls']['small']  # 첫 번째 이미지 URL 반환
    return None

# 블로그 포스트 생성 함수
def generate_blog_post(topic):
    prompt = f"Write a detailed blog post about {topic}. Include current trends, challenges, and practical examples."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )

    return response.choices[0].message['content'].strip()

# Jekyll 포스트 파일로 저장
def save_post_to_jekyll(title, content, image_url):
    today = datetime.today().strftime('%Y-%m-%d')
    filename = f"_posts/{today}-{title.replace(' ', '-')}.md"

    with open(filename, 'w') as f:
        f.write(f"---\nlayout: post\ntitle: \"{title}\"\n---\n\n")
        f.write(f"![{title}]({image_url})\n\n")  # 이미지 추가
        f.write(content)

# 인기 개발 관련 주제 가져오기
topics = get_trending_topics()

# 주제를 순환하면서 글 생성
for topic in topics[:5]:  # 상위 5개의 인기 주제로 글 생성
    blog_post = generate_blog_post(topic)
    image_url = search_image(topic)  # 이미지 검색
    save_post_to_jekyll(topic, blog_post, image_url)

# GitHub에 자동으로 커밋하고 푸시
def git_push():
    os.system("git add .")
    os.system("git commit -m 'Automated blog post with image'")
    os.system("git push origin master")

# 생성된 포스트 푸시
git_push()
