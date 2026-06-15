export default function App() {
  });
// useThrottle
  const throttle = useThrottle(1000);
  const myCallback = throttle(() => {
    // api call ...
  });
// useDebounce
  const debounce = useDebounce(1000);
  const handleSearch = debounce(() => {
    // Executes after 1000ms
  });
  return (
    <>
      <input onChange={handleSearch} /> 
      <button onClick={myCallback}>Check</button>
    </>
  );
}
