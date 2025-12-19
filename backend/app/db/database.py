from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017/"
DB_NAME = "techtitans"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

# Collections
users_collection = db["users"]
services_collection = db["services"]
bookings_collection = db["bookings"]
reviews_collection = db["reviews"]
