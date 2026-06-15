export function useDebounce(delay) {
  const timeoutId = useRef();

  const debounce = useCallback(
    (callback) => {
      return (...args) => {
        clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return debounce;
}
