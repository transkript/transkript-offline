export const titlecase = (str?: string | any) => {
  if (!str) {
    return ""; // Return the input string if it's empty or null
  }
  if (!(typeof str == "string")) str = str.toString();
  const words = str.toLowerCase().split(' ');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export const truncate = (str: string, length = 16) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...'
}

export const uppercase = (str?: string) => {
  if (!str) {
    return ""; // Return the input string if it's empty or null
  }
  return str.toUpperCase()
}

export const lowercase = (str?: string) => {
  if (!str) {
    return "";
  }
  return str.toLowerCase()
}
