export type Chapter = 'Neptune' | 'Festivals' | 'Expeditions' | 'Personal';

export type Entry = {
  src: string;
  chapter: Chapter;
  caption: string;
  video: string | null;
};

export const chapters: ('All' | Chapter)[] = ['All', 'Neptune', 'Festivals', 'Expeditions', 'Personal'];

export const entries: Entry[] = [
  // Entries get added here as Kyle sends photos + captions.
  // Shape: { src: 'filename.jpg', chapter: 'Festivals', caption: 'one or two sentences', video: null }
];
