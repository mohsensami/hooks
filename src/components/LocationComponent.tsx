import { useGeoLocation } from "../hooks/useGeoLocation";

export default function LocationComponent() {
  const { latitude, longitude, loading, error, stop } = useGeoLocation({
    enableHighAccuracy: true,
    timeout: 10000,
  });

  if (loading) return <p>Getting location...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Lat: {latitude}</p>
      <p>Lng: {longitude}</p>

      <button onClick={stop}>Stop tracking</button>
    </div>
  );
}
