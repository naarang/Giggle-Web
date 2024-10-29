export const HOUR_LIST = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0'),
);
export const MINUTE_LIST = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);
