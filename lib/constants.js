export const CATEGORIES = [
  { value: "photo-studio", label: "Photo Studio", homeLabel: "Photo Studios" },
  { value: "film-stage", label: "Film Stage", homeLabel: "Sound Stages" },
  { value: "podcast-lounge", label: "Podcast Lounge", homeLabel: "Podcast Rooms" },
  { value: "music-suite", label: "Music Suite", homeLabel: "Music Suites" },
  { value: "workshop", label: "Workshop", homeLabel: "Art Workshops" },
];

export const categoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === value)?.label || value;