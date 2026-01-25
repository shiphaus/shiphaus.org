# Shiphaus Doodle Style Guide

Reference for generating consistent hand-drawn doodle illustrations.

## Model & Settings

- **Model**: `gemini-3-pro-image-preview` (Nano Banana Pro)
- **Aspect Ratio**: 1:1
- **Image Size**: 1K (sufficient for references, use 2K for final assets)

## Master Style Prompt

Use this prefix for all Shiphaus doodle generations:

```
Hand-drawn sketch doodle, black ink on white background, imperfect wobbly lines,
notebook margin art style, simple and charming, minimal detail, quick sketch aesthetic,
like someone doodled it during a meeting. Single subject centered, no text, no labels.
```

## Visual Characteristics

- **Line quality**: Wobbly, imperfect, hand-drawn feel
- **Stroke weight**: Consistent medium weight across illustrations
- **Color**: Black ink only (color added in SVG/CSS layer)
- **Detail level**: Minimal - quick sketch, not refined illustration
- **Composition**: Single centered subject, breathing room around edges
- **Texture**: Crosshatching for shading (see Boulder example)
- **Context**: Notebook paper with spiral binding adds authenticity

## City-Specific Prompts

### New York
```
[STYLE PREFIX] A yellow NYC taxi cab, side view, simple cartoon style,
classic checker cab shape, two wheels visible, cute and minimal.
```
**Key elements**: Taxi light on roof, checker pattern on door, rounded body shape

### Chicago
```
[STYLE PREFIX] Wind swirls with 2-3 falling autumn leaves, dynamic motion lines
showing movement, leaves tumbling in the breeze, playful and energetic.
```
**Key elements**: Curved swirl lines, 3 distinct leaves, motion lines for direction

### Boulder
```
[STYLE PREFIX] The Flatirons mountain peaks of Boulder Colorado, iconic triangular
rock formations, simple silhouette style, 3-4 angled peaks, sketch of famous landmark.
```
**Key elements**: Distinctive angled peaks, crosshatch shading, small trees at base

### Forest City (Network School)
```
[STYLE PREFIX] A simple network diagram with 4 circular nodes connected by lines,
techy but hand-drawn feel, like a quick whiteboard sketch of connected dots,
abstract but friendly.
```
**Key elements**: 4-5 nodes, fully connected lines, sketchy circles (not perfect)

## Extending the Style

When creating new doodles for additional cities/concepts:

1. Start with the master style prompt
2. Describe subject simply (1-2 sentences)
3. Emphasize "simple", "minimal", "quick sketch"
4. Reference a specific recognizable landmark or symbol
5. Avoid: complex scenes, multiple subjects, text/labels, realistic rendering

## Example: Adding a New City

**San Francisco** (hypothetical):
```
[STYLE PREFIX] The Golden Gate Bridge, simple side view, two towers with
suspension cables, iconic silhouette, minimal detail.
```

**Tokyo** (hypothetical):
```
[STYLE PREFIX] A cute simplified Tokyo Tower or torii gate, single subject,
clean lines, Japanese doodle aesthetic.
```

## Files in This Directory

- `new-york-doodle.png` - NYC taxi reference
- `chicago-doodle.png` - Wind & leaves reference
- `boulder-doodle.png` - Flatirons reference
- `forest-city-doodle.png` - Network nodes reference

## Generation Script

See `../generate_doodles.py` for the Python script used to generate these.
