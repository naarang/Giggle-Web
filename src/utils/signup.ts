// 고용주일 때 한국어, 유학생일 때 영어를 보여주기 위함
export const isEmployer = (pathname: string) => {
  if (pathname.includes('/employer')) {
    return 'ko';
  }
  return 'en';
};
