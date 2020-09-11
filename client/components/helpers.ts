

export const animateCounter = (start: number, end: number, duration: number, stateValue: number, setter: React.Dispatch<React.SetStateAction<number>>): void => {
  const range = end - start;
  let startTime: number;
  // console.log('NEW ANIMATION', range);
  const callback = (currentTime: number) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }
    const timePassed = currentTime - startTime;
    let progress = timePassed / duration;
    if (progress > 1) progress = 1;
    // console.log(stateValue);
    setter(start + Math.round(progress * range));
    // console.log(progress);
    if (progress !== 1) {
      // console.log('animation not finished!');
      requestAnimationFrame(callback);

    } else {
      if (id) {
        cancelAnimationFrame(id);
      }
    }

  }
  const id = requestAnimationFrame(callback);
}

export const numberToCommaSeperatedString = (x: number): string => {
  if (x < 999) return x.toString();
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const idToStringWithZeroes = (id: number): string => {
  let idString = id.toString();
  while (idString.length < 5) {
    idString = '0' + idString;
  }
  return idString;
}

export const validateNewUsername = (text: string, setter: React.Dispatch<React.SetStateAction<'true' | 'false'>>): ( boolean | void) => {
  let regex = /^[\w]{2,10}$/;
  console.log(text);
  if (regex.test(text) && !text.includes('&nbsp;')) {
    setter('true');
    return true;
  } else {
    setter('false');
    return false;
  }
}

export const removeSpaceCharactersFromString = (str: string): string => {
  while (str.includes('&nbsp')) str = str.replace('&nbsp;', '');
  while (str.includes('<br>')) str = str.replace('<br>', '');
  return str.trim();
}

export const removeSpecialCharactersFromString = (str: string): string => {
  while (str.includes('&nbsp')) str = str.replace('&nbsp;', ' ');

  return str.trim();
}

export const removeTagFromString = (str: string): string => {
  while (str.includes('<br>')) str = str.replace('<br>', '');
  return str;
}