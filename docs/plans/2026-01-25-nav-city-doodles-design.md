# Nav City Doodles - Design Specification

## Overview

Add animated hand-drawn doodle easter eggs to navbar chapter links. When users hover over a city name for 1.3 seconds, a sketchy doodle peeks up from below the navbar with a "being drawn" animation.

## Cities & Doodles

| City | Doodle | Animation |
|------|--------|-----------|
| New York | Yellow taxi | Peeks up, drives left-to-right, exits |
| Chicago | Wind swirls + leaves | Peeks up, leaves spiral/tumble, drift off |
| Boulder | Flatirons peaks | Peeks up, peaks "draw themselves" base to tip |
| Forest City | Network nodes | Peeks up, nodes appear, lines draw between them |

## Visual Style

- Hand-drawn sketch aesthetic, black ink with accent colors
- Imperfect wobbly lines, notebook margin art style
- Generated with Nano Banana Pro (Gemini) as reference, then traced to SVG
- Consistent stroke weight across all 4 doodles

## Interaction Timing

```
0ms      → Hover begins
500ms    → Priming: text shifts to chapter color
1300ms   → Doodle peeks up, draw animation plays (~500ms)
On leave → Doodle slides down, text resets
```

## Mobile Behavior

- Easter eggs disabled on touch devices
- Detected via `@media (hover: hover)` or `window.matchMedia('(hover: hover)')`
- Links behave normally on mobile, no alternative trigger

## Technical Architecture

### Component Structure

```
src/components/
  Navbar.tsx                 # Adds DoodlePortal + preload
  NavCityLink.tsx            # Handles timer + priming + portal positioning
  doodles/
    DoodlePortal.tsx         # Portal container at document root
    TaxiDoodle.tsx           # NY animated SVG
    WindDoodle.tsx           # Chicago animated SVG
    FlatironsDoodle.tsx      # Boulder animated SVG
    NetworkDoodle.tsx        # Forest City animated SVG
    index.ts                 # Exports map: chapterId → component
```

### Rendering Strategy

- Doodles render via React Portal into `<div id="doodle-layer">` at document root
- Portal positioned absolutely using link's `getBoundingClientRect()`
- Avoids navbar `overflow` clipping

### Preloading

- All 4 SVG components imported at Navbar mount
- Rendered hidden (`opacity: 0`, `pointer-events: none`) to warm cache
- Ensures instant reveal with no flash

### Animation Tech

- Framer Motion for peek-up translate and orchestration
- SVG `stroke-dasharray` + `stroke-dashoffset` for draw effect
- CSS transitions for text color priming

## Asset Creation Workflow

1. **Generate references**: Use Nano Banana Pro with consistent style prompt
2. **Trace to SVG**: Create simplified vector versions (~50-80px wide)
3. **Optimize**: Keep paths wobbly, consistent stroke width
4. **Animate**: Add Framer Motion + stroke animations

### Generation Prompts

Style prefix for all:
> "Hand-drawn sketch doodle, black ink on white, imperfect wobbly lines, notebook margin art style, simple and charming"

- NY: "...of a yellow NYC taxi cab, side view, simple cartoon"
- Chicago: "...of wind swirls with 2-3 falling leaves, dynamic motion"
- Boulder: "...of the Flatirons mountain peaks, iconic Boulder Colorado silhouette"
- Forest City: "...of 4 nodes connected by lines, network diagram, techy but hand-drawn"

## Success Criteria

- Doodles feel like a delightful surprise, not an annoyance
- Animation is smooth (60fps), no jank on reveal
- Desktop-only, gracefully hidden on mobile
- Each city's doodle is immediately recognizable as that city
