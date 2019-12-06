const key = 'REACT_COOL_IMG';

export const set = (src: string): void => {
  try {
    const data = JSON.parse(sessionStorage.getItem(key)) || {};
    data[src] = new Date();
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`💡react-cool-img: ${error}`);
  }
};

export const get = (src: string): boolean => {
  try {
    const data = JSON.parse(sessionStorage.getItem(key)) || {};
    return !!data[src] || false;
  } catch (error) {
    console.error(`💡react-cool-img: ${error}`);
    return false;
  }
};
