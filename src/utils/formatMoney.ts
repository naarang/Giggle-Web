export const formatMoney = (money: number | string) => {
  const moneyNumber = typeof money === 'number' ? money : parseInt(money);

  return moneyNumber.toLocaleString('en-US');
};
