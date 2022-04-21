import { post } from "./Api";

const parseFilter = (filterIndex) => {
  if (!filterIndex || filterIndex == 0) {
    return "";
  }
  switch (filterIndex) {
    case 1:
      return "filter%3Amedia";
    case 2:
      return "filter%3Aimages";
    case 3:
      return "filter%3Anative_video";
  }
};

export const handleSearch = (
  cords,
  radius,
  minLikes,
  minRetweets,
  query,
  chosenType
) => {
  let filter = parseFilter(chosenType);
  let baseString = `https://twitter.com/search?q=${query
    .trim()
    .replace(" ", "%20")}%20geocode%3A${cords.latitude}%2C${
    cords.longitude
  }%2C${radius}km%20${filter}%20min_faves%3A${minLikes}%20min_retweets%3A${minRetweets}&src=typed_query&f=live`;
  return baseString;
};

export async function getPlaces() {
  let helper_arr = [];
  let res = await post("https://no-fomo-backend.herokuapp.com/twitter", {
    auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
    mode: "places",
  });
  res = await res.json();

  await res.map((place) => {
    helper_arr.push({ name: place.name, woeid: place.woeid });
  });
  return helper_arr;
}

export async function getTrends(woeid) {
  let helper = [];
  let res = await post("https://no-fomo-backend.herokuapp.com/twitter", {
    auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
    mode: "trends",
    woeid: woeid,
  });
  res = await res.json();
  await res.map((trend) => {
    helper.push({ name: trend.name, tweet_volume: trend.tweet_volume });
  });
  return helper;
}

async function getCounts(query) {
  let helper = [];
  let res = await post("https://no-fomo-backend.herokuapp.com/twitter", {
    auth: "fcdfa1d2961404557b54eeada355ddfc57469792d290a557f81544b8587d6a21",
    mode: "counts",
    query: query,
    granularity: "hour",
  });
  res = await res.json();
  await res.data.map((dataPoint) => {
    helper.push(dataPoint.tweet_count);
  });
  return helper;
}

export const formatData = async (query) => {
  let helper = [];
  let data = await getCounts(query);
  data.map((tweet_count) => {
    helper.push({
      value: tweet_count,
      hideDataPoint: true,
      hideYAxisText: true,
    });
  });
  return helper;
};
