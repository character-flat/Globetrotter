from config import questions_collection
import asyncio, json
async def seed_database():
    collection = questions_collection
    sample_data = None
    with open('expanded_dataset.json') as file:
        sample_data = json.load(file)
    await collection.insert_many(sample_data)
    print("Database seeded!")

asyncio.run(seed_database())
