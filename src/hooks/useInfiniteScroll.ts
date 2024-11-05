import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  fetchNextData: () => void,
  hasNextPage: boolean,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextData(); // 페이지 하단에 도달했을 때 콜백 함수 실행
          }
        });
      },
      { root: null, threshold: 0.1 },
    );

    observer.observe(targetRef.current);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [fetchNextData, hasNextPage]);

  return targetRef;
};
