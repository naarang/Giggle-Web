export const getCurrentDayAndTime = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();

  const day = days[now.getDay()];
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const hour12 = hours % 12 || 12;
  const period = hours < 12 ? 'a.m.' : 'p.m.';

  return `${day} ${hour12}:${minutes} ${period}`;
};
