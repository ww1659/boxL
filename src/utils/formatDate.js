export const formatDateLong = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

export const formatDateNoYear = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString("en-GB", options);
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "short", day: "numeric", month: "short" };
  return date.toLocaleDateString("en-GB", options);
};
