export const useLocalStorage = <T>(initState: T): [T, (state: T | ((p: T) => T)) => void] => {
  const localState = localStorage.getItem("counter sprint 2");

  let dataFromLS: T;
  try {
    dataFromLS = JSON.parse(localState || "") as T;
  } catch (error) {
    dataFromLS = initState;
  }

  const writeToLS = (state: T | ((p: T) => T)) => {
    if (typeof state === "function") {
      state = (state as (p: T) => T)(dataFromLS);
    }
    localStorage.setItem("counter sprint 2", JSON.stringify({ ...state }));
  };

  return [dataFromLS, writeToLS];
};
