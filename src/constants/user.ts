export const enum UserType {
  USER = 'USER',
  OWNER = 'OWNER',
}
export const cardData = [
  {
    title: 'International Student',
    description: 'I want to find a job 💼',
    accountType: UserType.USER,
  },
  {
    title: '고용주',
    description: '외국인 유학생을 채용하고 싶어요 🤝',
    accountType: UserType.OWNER,
  },
];
