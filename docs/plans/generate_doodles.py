#!/usr/bin/env python3
"""Generate hand-drawn doodle references for nav city easter eggs"""

import os
from google import genai
from google.genai import types

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not set")

client = genai.Client(api_key=api_key)

STYLE_PREFIX = """Hand-drawn sketch doodle, black ink on white background, imperfect wobbly lines,
notebook margin art style, simple and charming, minimal detail, quick sketch aesthetic,
like someone doodled it during a meeting. Single subject centered, no text, no labels."""

CITIES = [
    {
        "id": "new-york",
        "name": "New York Taxi",
        "prompt": f"{STYLE_PREFIX} A yellow NYC taxi cab, side view, simple cartoon style, classic checker cab shape, two wheels visible, cute and minimal."
    },
    {
        "id": "chicago",
        "name": "Chicago Wind",
        "prompt": f"{STYLE_PREFIX} Wind swirls with 2-3 falling autumn leaves, dynamic motion lines showing movement, leaves tumbling in the breeze, playful and energetic."
    },
    {
        "id": "boulder",
        "name": "Boulder Flatirons",
        "prompt": f"{STYLE_PREFIX} The Flatirons mountain peaks of Boulder Colorado, iconic triangular rock formations, simple silhouette style, 3-4 angled peaks, sketch of famous landmark."
    },
    {
        "id": "forest-city",
        "name": "Network Nodes",
        "prompt": f"{STYLE_PREFIX} A simple network diagram with 4 circular nodes connected by lines, techy but hand-drawn feel, like a quick whiteboard sketch of connected dots, abstract but friendly."
    }
]

OUTPUT_DIR = "/Users/slobo/Documents/coding/shiphaus.org/docs/plans/doodle-references"

def generate_doodle(city):
    print(f"\nGenerating: {city['name']}...")

    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=[city["prompt"]],
        config=types.GenerateContentConfig(
            response_modalities=['IMAGE'],
            image_config=types.ImageConfig(
                aspect_ratio="1:1",
                image_size="1K"
            )
        )
    )

    for part in response.parts:
        if part.inline_data is not None:
            image = part.as_image()
            output_path = f"{OUTPUT_DIR}/{city['id']}-doodle.png"
            image.save(output_path)
            print(f"  Saved: {output_path}")
            return True

    print(f"  Failed - no image generated")
    if response.text:
        print(f"  Response: {response.text}")
    return False

if __name__ == "__main__":
    print("Generating city doodle references...")
    print(f"Output directory: {OUTPUT_DIR}")

    success = 0
    for city in CITIES:
        if generate_doodle(city):
            success += 1

    print(f"\nDone! Generated {success}/{len(CITIES)} doodles.")
