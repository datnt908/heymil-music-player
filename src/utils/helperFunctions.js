export const convertSecondToMMSS = (second_number) => {
  let minutes = Math.floor(second_number / 60);
  let seconds = second_number % 60;
  if(minutes < 10) minutes = "0" + minutes;
  if(seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}