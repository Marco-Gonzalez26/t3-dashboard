export const getPages = (pagesCount: number | undefined) => {
  const items: number[] = [];

  if (pagesCount) {
    for (let i = 1; i <= pagesCount; i++) {
      items.push(i);
    }
  }

  return items;
};
