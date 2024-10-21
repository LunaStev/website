import os
import time
from datetime import datetime
from pytrends.request import TrendReq
from transformers import pipeline

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


# DistilGPT-2 모델 로드
generator = pipeline('text-generation', model='distilgpt2')


# 블로그 포스트 생성
def generate_blog_post(topic):
    prompt = f"Write a detailed blog post about {topic}. Focus on development trends, outdated technologies, useful features, and interesting facts. Please use markdown syntax, include headings, bullet points, and a conclusion for better readability."

    try:
        response = generator(prompt, max_length=1000, num_return_sequences=1)
        return response[0]['generated_text'].strip()
    except Exception as e:
        print(f"Error generating post: {e}")
        return ""


# Jekyll 포스트 파일로 저장
def save_post_to_jekyll(title, content):
    today = datetime.today().strftime('%Y-%m-%d')
    filename = f"_posts/{today}-{title.replace(' ', '-')}.md"

    with open(filename, 'w') as f:
        f.write(f"---\nlayout: post\ntitle: \"{title}\"\n---\n\n")
        f.write(f"{content}\n")  # 내용 저장


# Google Trends에서 인기 주제 가져오기
topics = get_trending_topics()

# 주제를 순환하면서 글 생성
for topic in topics[:5]:  # 상위 5개의 인기 주제로 글 생성
    blog_post = generate_blog_post(topic)
    if blog_post:  # 포스트가 비어있지 않은 경우에만 저장
        save_post_to_jekyll(topic, blog_post)  # 포스트 저장
    time.sleep(10)  # 각 주제 사이에 10초 대기


# GitHub에 자동으로 커밋하고 푸시
def git_push():
    os.system("git add .")
    os.system("git commit -m 'Automated blog post'")
    os.system("git push origin master")


# 생성된 포스트 푸시
git_push()
