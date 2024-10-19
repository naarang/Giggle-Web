export const searchPlaces = (keyword: string) => {
  const ps = new kakao.maps.services.Places();

  ps.keywordSearch(keyword, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      return data;
    }
  });
};
