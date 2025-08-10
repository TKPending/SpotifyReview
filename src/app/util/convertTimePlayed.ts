export const convertTimePlayed = (timestamp: string) => {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12; // convert '0' to '12'

  return `${hours}:${minutes} ${ampm}`;
};
