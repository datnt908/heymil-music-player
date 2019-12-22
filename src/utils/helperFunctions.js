export const hashStringToInteger = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export const convertSecondToMMSS = (second_number) => {
  let minutes = Math.floor(second_number / 60);
  let seconds = second_number % 60;
  if(minutes < 10) minutes = "0" + minutes;
  if(seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}