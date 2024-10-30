export const filterNullParams = (params: object) => {
  const newParams = Object.entries(params).filter(
    ([, value]) => value !== '' && value !== null,
  );
  return Object.fromEntries(newParams);
};
