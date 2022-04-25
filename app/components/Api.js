export const post = async (url, data) => {
  var formBody = [];
  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return await fetch(url, {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

export const getFollowedTrends = async (email) => {
  const auth =
    "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21";
  return await fetch(
    `https://no-fomo-backend.herokuapp.com/trends?auth=${auth}&email=${email}`,
    { method: "GET" }
  );
};

export const addNewTrend = async (email, trend, percentage, token) => {
  const auth =
    "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21";
  return await post("https://no-fomo-backend.herokuapp.com/trends", {
    email: email,
    trend: trend,
    percentage: percentage,
    token: token,
    auth: auth,
    mode: "add",
  });
};
export const removeTrend = async (email, trend) => {
  const auth =
    "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21";
  return await post("https://no-fomo-backend.herokuapp.com/trends", {
    email: email,
    trend: trend,
    auth: auth,
    mode: "remove",
  });
};
