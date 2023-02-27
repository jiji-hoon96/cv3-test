const findPlatform = (name) => {
  if (name === "naver") {
    return "네이버쇼핑LIVE";
  } else if (name === "coupang") {
    return "쿠팡라이브";
  } else if (name === "cjonstyle") {
    return "CJ온스타일";
  } else {
    return "카카오쇼핑LIVE";
  }
};

export default findPlatform;
