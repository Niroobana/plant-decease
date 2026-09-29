from google import genai
from google.genai import errors

from app.database import settings


client = genai.Client(
    api_key=settings.gemini_api_key
)


def analyze_plant(
    plant_name: str,
    plant_type: str,
    location: str | None,
    symptom: str
):
    prompt = f"""
You are helping with basic plant care.

Plant name: {plant_name}
Plant type: {plant_type}
Location: {location or "Not provided"}
Symptoms: {symptom}

Give a short educational plant health analysis.

Include:
1. Possible issue
2. Short explanation
3. Three simple care suggestions
4. When expert agricultural advice may be needed

Do not claim the result is a guaranteed diagnosis.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        return response.text

    except errors.ServerError as e:
        print("Gemini server error:", e)
        raise

    except Exception as e:
        print("Gemini error:", e)
        raise