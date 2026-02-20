import { useEffect, useRef, useState, useCallback } from "react";

type GeoLocation = {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
};

type GeoLocationOptions = PositionOptions;

export const useGeoLocation = (
  options?: GeoLocationOptions,
): GeoLocation & { stop: () => void } => {
  const watchIdRef = useRef<number | null>(null);

  const [location, setLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: true,
    error: null,
  });

  const stop = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;

      setLocation((prev) => {
        // جلوگیری از رندر اضافی
        if (prev.latitude === latitude && prev.longitude === longitude) {
          return prev;
        }

        return {
          latitude,
          longitude,
          accuracy,
          loading: false,
          error: null,
        };
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );

    return stop;
  }, [stop]); // ❗ options حذف شد

  return { ...location, stop };
};
