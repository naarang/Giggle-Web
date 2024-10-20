export const calculateTimeAgo = (date: string): string => {
  const startTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  const differenceMilliseconds = currentTime - startTime;
  const differenceMinutes = differenceMilliseconds / (1000 * 60);
  if (differenceMinutes < 60)
    return `${Math.floor(differenceMinutes)} mins ago`;

  const differenceHours = differenceMinutes / 60;
  if (differenceHours < 24) return `${Math.floor(differenceHours)} hours ago`;

  const differenceDays = differenceHours / 24;
  if (differenceDays < 7) return `${Math.floor(differenceDays)} days ago`;

  const differenceWeeks = differenceHours / 7;
  if (differenceWeeks < 4) return `${Math.floor(differenceWeeks)} weeks ago`;

  const differenceMonths = differenceDays / 30;
  if (differenceMonths < 4) return `${Math.floor(differenceMonths)} months ago`;

  const differenceYears = differenceDays / 365;
  return `${Math.floor(differenceYears)} years ago`;
};
