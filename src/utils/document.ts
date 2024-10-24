// 객체의 모든 프로퍼티가 공백이 아닌지 확인하는 함수
export const isNotEmpty = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => {
    // null 또는 undefined 체크
    if (value === null || value === undefined) {
      return false;
    }

    // 문자열인 경우 trim()으로 공백 제거 후 길이 확인
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    // 숫자나 불리언 등 다른 타입은 true 반환
    return true;
  });
};
