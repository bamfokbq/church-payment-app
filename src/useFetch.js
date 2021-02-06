import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // COMMENT: Set an {AbortController} to check for the signal and the abort state of the fetch.
    const abortCtrller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortCtrller.signal });
        if (!res.ok) {
          throw Error(`Unable to get data!!!`);
        }
        const jsonData = await res.json();
        setData(jsonData);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        } else {
          setError(error.message);
          setIsPending(false);
        }
      }
    };
    fetchData();
    // COMMENT: Clean up the stat after the fetch is aborted.
    return () => abortCtrller.abort();
  }, [url]);
  return { data, error, isPending, setData };
};

export default useFetch;
