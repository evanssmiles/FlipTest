export const dateFormat = (input: string): string => {
  const date = new Date(input); // Convert input string to Date object

  const day = date.getDate(); // Get the day of the month
  const month = date.toLocaleString('default', {month: 'long'}); // Get the full month name
  const year = date.getFullYear(); // Get the year

  return `${day} ${month} ${year}`; // Return the formatted string
};

export default dateFormat;
