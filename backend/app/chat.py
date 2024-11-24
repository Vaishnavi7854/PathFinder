import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

token = os.getenv("GITHUB_TOKEN")
endpoint = "https://models.inference.ai.azure.com"
model_name = "gpt-4o"

client = OpenAI(
    base_url=endpoint,
    api_key=token,
)

def generate_response(user_input: str):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {
                "role": "user",
                "content": user_input,
            }
        ],
        model=model_name,
        stream=True
    )

    full_response = ""
    for update in response:
        if update.choices[0].delta.content:
            full_response += update.choices[0].delta.content
    return full_response