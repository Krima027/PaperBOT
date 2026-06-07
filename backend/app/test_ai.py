# test_ai.py - Run this to check if your Gemini key works
# Usage: python test_ai.py

import sys

API_KEY = "PASTE_YOUR_KEY_HERE"  # <-- replace this

try:
    from google import genai
except ImportError:
    print("Installing google-genai...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "google-genai"])
    from google import genai

print("Testing Gemini AI connection...")
client = genai.Client(api_key=API_KEY)

try:
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Summarize this in one sentence: The Transformer architecture uses self-attention to process sequences in parallel."
    )
    print("\n✅ AI IS WORKING!")
    print("Response:", response.text.strip())
except Exception as e:
    print("\n❌ AI FAILED:", str(e))
    if "403" in str(e) or "allowlist" in str(e):
        print("→ Your key has domain restrictions. Get a new unrestricted key from https://aistudio.google.com/apikey")
    elif "401" in str(e) or "API_KEY_INVALID" in str(e):
        print("→ Invalid key. Double-check you copied it correctly.")
    elif "quota" in str(e).lower():
        print("→ Quota exceeded. Try a different key or wait.")