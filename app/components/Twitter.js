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
