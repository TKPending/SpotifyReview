export const capitaliseSpaceTags = (tags: string): string => {
  return tags
    .split(" ")
    .map((tag) => tag.toUpperCase())
    .join(" ");
};
