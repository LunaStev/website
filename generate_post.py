import openai
import os
from datetime import datetime
from pytrends.request import TrendReq
import requests

# OpenAI API 키 설정
openai.api_key = os.getenv('OPENAI_API_KEY')

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


# 이미지 생성 함수
def generate_image(prompt):
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="512x512"
    )
    return response['data'][0]['url']


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
def save_post_to_jekyll(title, content, images):
    today = datetime.today().strftime('%Y-%m-%d')
    filename = f"_posts/{today}-{title.replace(' ', '-')}.md"

    with open(filename, 'w') as f:
        f.write(f"---\nlayout: post\ntitle: \"{title}\"\n---\n\n")

        # 문단마다 이미지 삽입
        paragraphs = content.split("\n\n")  # 문단 구분
        for i, paragraph in enumerate(paragraphs):
            f.write(paragraph + "\n\n")  # 문단 쓰기
            if i < len(images):  # 이미지가 있는 경우
                f.write(f"![Image for {title}]({images[i]})\n\n")  # 이미지 삽입


# 인기 개발 관련 주제 가져오기
topics = get_trending_topics()

# 주제를 순환하면서 글 생성
for topic in topics[:5]:  # 상위 5개의 인기 주제로 글 생성
    blog_post = generate_blog_post(topic)
    images = []  # 이미지 리스트 초기화

    # 각 문단에 대해 이미지 생성
    paragraphs = blog_post.split("\n\n")  # 문단 구분
    for paragraph in paragraphs:
        image_prompt = f"An illustration for the following content: {paragraph[:30]}..."  # 첫 30자
        image_url = generate_image(image_prompt)  # 이미지 생성
        images.append(image_url)  # 생성된 이미지 URL 추가

    save_post_to_jekyll(topic, blog_post, images)


# GitHub에 자동으로 커밋하고 푸시
def git_push():
    os.system("git add .")
    os.system("git commit -m 'Automated blog post with AI-generated images'")
    os.system("git push origin master")


# 생성된 포스트 푸시
git_push()
