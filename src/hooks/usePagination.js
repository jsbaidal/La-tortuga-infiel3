import { useEffect, useState } from 'react';

export default function usePagination(items, itemsPerPage, resetKey) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;

  return {
    page: safePage,
    totalPages,
    items: items.slice(startIndex, startIndex + itemsPerPage),
    next: () => setPage((p) => Math.min(totalPages, p + 1)),
    prev: () => setPage((p) => Math.max(1, p - 1)),
  };
}
