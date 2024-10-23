/**
 * 객체에서 지정된 속성들만 선택하여 새 객체를 반환하는 함수
 * @param obj 원본 객체
 * @param keys 선택할 속성들의 배열
 * @returns 선택된 속성들로 이루어진 새 객체
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> =>
  keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );
