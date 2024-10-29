export const enum UserType {
  USER = 'USER',
  OWNER = 'OWNER',
}
export const cardData = [
  {
    title: '유학생',
    description: '일자리를 찾고 싶은 유학생이에요',
    accountType: UserType.USER,
  },
  {
    title: '고용주',
    description: '알바생을 찾고 싶은 고용주예요',
    accountType: UserType.OWNER,
  },
];
