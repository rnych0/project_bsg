from fastapi import FastAPI, Form
from pymongo import MongoClient

app = FastAPI()

# MongoDB 연결 정보
MONGODB_URI = "mongodb+srv://rnych0:sa01@cluster0.vknxhqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# MongoDB 클라이언트 생성
client = MongoClient(MONGODB_URI)
db = client["db_fashion"]
collection = db["item_collection"]

# 선택된 키워드를 받아서 MongoDB에서 신발 추천
@app.post("/recommendations")
async def get_recommendations(keywords: str = Form(...)):
    keyword_list = keywords.split(",")
    
    # MongoDB에서 'review' 필드에 키워드를 포함하는 상위 10개 신발을 검색합니다.
    shoes = collection.find({"review": {"$in": keyword_list}}).limit(10)
    
    # 검색된 신발 정보를 반환합니다.
    return {"shoes": list(shoes)}
