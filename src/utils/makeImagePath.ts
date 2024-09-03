export function makeImagePath(id: string | undefined, format?: string) {
  if (id === null)
    return `https://via.placeholder.com/300x170.png?text=No+Image+Available`;
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
