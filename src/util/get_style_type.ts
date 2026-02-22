export const getStyleByType = (types: string[]): { mood: string; style: string; pose: string } => {
  const typeStyles: Record<string, { mood: string; style: string; pose: string }> = {
    Fire:     { mood: "fierce, passionate, energetic",          style: "dynamic action pose, dramatic flames, strong brushstrokes", pose: "leaping forward with blazing intensity" },
    Fighting: { mood: "powerful, intense, determined",          style: "dynamic action pose, muscle definition, motion blur",      pose: "mid-battle stance, fist raised" },
    Dragon:   { mood: "majestic, fierce, awe-inspiring",        style: "epic wide shot, scales gleaming, cinematic drama",         pose: "soaring through stormy skies" },
    Dark:     { mood: "mysterious, cool, shadowy",              style: "high contrast lighting, deep shadows, noir atmosphere",    pose: "emerging from darkness with a sharp gaze" },
    Psychic:  { mood: "ethereal, mysterious, otherworldly",     style: "glowing aura, floating particles, dreamlike",             pose: "levitating with eyes glowing" },
    Ghost:    { mood: "eerie, mysterious, haunting",            style: "translucent glow, misty atmosphere, dark fantasy",        pose: "drifting through moonlit fog" },
    Normal:   { mood: "cheerful, friendly, cute",               style: "soft pastel colors, round shapes, storybook illustration", pose: "playful and approachable stance" },
    Fairy:    { mood: "magical, adorable, whimsical",           style: "soft pastel colors, sparkles, dreamy watercolor feel",    pose: "dancing with glowing fairy dust" },
    Grass:    { mood: "gentle, lively, nature-loving",          style: "soft natural lighting, lush greens, warm sunlight",       pose: "playing among blooming flowers" },
    Water:    { mood: "serene, graceful, refreshing",           style: "flowing water effects, cool blue tones, gentle shimmer",  pose: "gliding through sparkling water" },
    Ice:      { mood: "elegant, cool, serene",                  style: "crystalline textures, cool blue-white palette, icy glow", pose: "standing gracefully on a frozen lake" },
    Electric: { mood: "energetic, zippy, exciting",             style: "electric sparks, vibrant yellow tones, speed lines",      pose: "crackling with electricity mid-jump" },
    Rock:     { mood: "sturdy, bold, reliable",                 style: "earthy tones, rough textures, strong shadows",           pose: "standing firm on rocky terrain" },
    Ground:   { mood: "tough, grounded, powerful",              style: "dusty warm tones, earth particles, weighty presence",    pose: "stomping the ground with force" },
    Poison:   { mood: "edgy, mischievous, toxic-cool",          style: "purple haze, toxic glow, grunge atmosphere",             pose: "grinning with a sly, menacing aura" },
    Bug:      { mood: "cute, lively, innocent",                 style: "soft natural lighting, dewy greens, charming details",   pose: "perched on a leaf in morning light" },
    Flying:   { mood: "free-spirited, graceful, uplifting",     style: "open sky, wind effects, light feathers, freedom",        pose: "soaring through golden clouds" },
    Steel:    { mood: "cool, stoic, mechanical",                style: "metallic sheen, sharp edges, industrial lighting",       pose: "standing tall with gleaming armor" },
  };

  const primaryType = types[0];
  return typeStyles[primaryType] ?? {
    mood:  "charming, lively, expressive",
    style: "vibrant colors, clean outlines, Pokémon TCG card style",
    pose:  "in a natural and expressive stance",
  };
};
