export const fetchData = async (url) => {
  const myHeader = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  });
  const init = {
    method: "GET",
    headers: myHeader,
    mode: "cors",
  };
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error();
    }

    const fetchedData = await response.json();

    return fetchedData;
  } catch (err) {
    return err;
  }
};
