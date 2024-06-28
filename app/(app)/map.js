import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);

        if (status === "granted") {
          const { location } = await Location.getCurrentPositionAsync();
          console.log(location);
          const lat = location.latitude;
          const lng = location.longitude;

          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${lat}&longitude=${lng}`
          );
        }
      } catch (error) {
        console.log(error.message);
        alert("Error");
      }
    };
    getLocation();
  }, []);
}
