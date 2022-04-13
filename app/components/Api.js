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
