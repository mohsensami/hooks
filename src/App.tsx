export default function App() {
  const debounce = useDebounce(1000);

  const handleSearch = debounce(() => {
    // Executes after 1000ms
  });
  return (
    <input onChange={handleSearch} /> 
  );
}
