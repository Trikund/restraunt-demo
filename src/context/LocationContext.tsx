import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { restaurants, type Restaurant } from '../data/mockData';

export interface CityHub {
  city: string;
  areas: string[];
}

export const POPULAR_CITIES: CityHub[] = [
  { city: 'Dehradun', areas: ['Rajpur Road', 'Jakhan', 'Ballupur', 'Paltan Bazaar', 'Sahastradhara Road', 'Dalanwala'] },
  { city: 'Delhi NCR', areas: ['Connaught Place', 'Hauz Khas', 'Saket', 'Cyber Hub', 'Indirapuram', 'Noida Sec 18'] },
  { city: 'Mumbai', areas: ['Bandra West', 'Juhu', 'Colaba', 'Powai', 'Andheri West', 'Lower Parel'] },
  { city: 'Bengaluru', areas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'MG Road', 'JP Nagar'] },
  { city: 'Hyderabad', areas: ['Banjara Hills', 'Jubilee Hills', 'Hitec City', 'Gachibowli', 'Madhapur'] },
  { city: 'Pune', areas: ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Baner', 'Aundh'] },
  { city: 'Chandigarh', areas: ['Sector 17', 'Sector 35', 'Sector 26', 'Phase 7 Mohali', 'Panchkula'] },
  { city: 'Jaipur', areas: ['C Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Raja Park', 'Mansarovar'] },
];

interface LocationState {
  city: string;
  area: string;
  fullAddress: string;
  isDetecting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setCityAndArea: (city: string, area?: string) => void;
  detectGPSLocation: () => Promise<boolean>;
  getLocalizedRestaurants: () => Restaurant[];
}

const LocationContext = createContext<LocationState | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem('aurora_city') || 'Dehradun';
  });

  const [area, setArea] = useState<string>(() => {
    return localStorage.getItem('aurora_area') || 'Rajpur Road';
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aurora_city', city);
    localStorage.setItem('aurora_area', area);
  }, [city, area]);

  // Auto-detect on initial mount if not explicitly set before
  useEffect(() => {
    const hasDetectedBefore = localStorage.getItem('aurora_location_detected');
    if (!hasDetectedBefore) {
      detectGPSLocation();
    }
  }, []);

  const setCityAndArea = (newCity: string, newArea?: string) => {
    const hub = POPULAR_CITIES.find(h => h.city.toLowerCase() === newCity.toLowerCase());
    const selectedArea = newArea || (hub ? hub.areas[0] : 'Central');
    setCity(newCity);
    setArea(selectedArea);
    localStorage.setItem('aurora_location_detected', 'true');
    setIsModalOpen(false);
  };

  const detectGPSLocation = async (): Promise<boolean> => {
    setIsDetecting(true);

    const applyDetectedData = (detectedCity: string, detectedArea?: string) => {
      const cleanCity = detectedCity.replace(/District|Division|Mandal/gi, '').trim() || 'Dehradun';
      const hub = POPULAR_CITIES.find(h => h.city.toLowerCase() === cleanCity.toLowerCase());
      const cleanArea = detectedArea || (hub ? hub.areas[0] : 'Downtown');
      
      setCity(cleanCity);
      setArea(cleanArea);
      localStorage.setItem('aurora_location_detected', 'true');
    };

    // 1. Try Browser Geolocation API with fast reverse geocoding
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 7000 });
        });

        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        if (res.ok) {
          const data = await res.json();
          const cityResult = data.city || data.locality || data.principalSubdivision || 'Dehradun';
          const areaResult = data.localityInfo?.administrative?.[3]?.name || data.locality || 'Central';
          applyDetectedData(cityResult, areaResult);
          setIsDetecting(false);
          return true;
        }
      } catch (err) {
        console.warn('Geolocation GPS skipped or timed out, trying IP fallback...', err);
      }
    }

    // 2. Fast IP Geolocation fallback (works without permission popups!)
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.city) {
          applyDetectedData(ipData.city, ipData.region);
          setIsDetecting(false);
          return true;
        }
      }
    } catch (err) {
      console.warn('IP location fetch failed', err);
    }

    // 3. Fallback to default Dehradun
    applyDetectedData('Dehradun', 'Rajpur Road');
    setIsDetecting(false);
    return false;
  };

  // Generate realistically localized restaurants for the current active city
  const getLocalizedRestaurants = (): Restaurant[] => {
    const hub = POPULAR_CITIES.find(h => h.city.toLowerCase() === city.toLowerCase());
    const availableAreas = hub?.areas || ['Main Market', 'Civil Lines', 'Mall Road', 'Food Street'];

    return restaurants.map((restaurant, idx) => {
      const restaurantArea = availableAreas[idx % availableAreas.length];
      const dist = (1.1 + (idx * 0.45)).toFixed(1);
      const deliveryMins = 20 + (idx * 3);

      return {
        ...restaurant,
        city: city,
        name: `${restaurant.name}`,
        distanceKm: parseFloat(dist),
        location: `${restaurantArea}, ${city}`,
        deliveryTimeString: `${deliveryMins}-${deliveryMins + 10} min`,
      };
    });
  };

  const fullAddress = `${area}, ${city}`;

  return (
    <LocationContext.Provider
      value={{
        city,
        area,
        fullAddress,
        isDetecting,
        isModalOpen,
        setIsModalOpen,
        setCityAndArea,
        detectGPSLocation,
        getLocalizedRestaurants,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
