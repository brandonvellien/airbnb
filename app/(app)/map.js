import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { ActivityIndicator } from "react-native";

export default function MapScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        let roomDataArray = [];
        if (status === "granted") {
          const { coords } = await Location.getCurrentPositionAsync();

          const lat = coords.latitude;
          const lng = coords.longitude;
          console.log(coords);
          //   console.log(lng);

          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${lat}&longitude=${lng}`
          );
          roomDataArray = data;
        } else {
          const { data } = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
          );
          roomDataArray = data;
        }
        const coordsTab = [];

        for (let i = 0; i < roomDataArray.length; i++) {
          coordsTab.push({
            latitude: roomDataArray[i].location[1],
            longitude: roomDataArray[i].location[0],
            id: roomDataArray[i]._id,
          });
        }
        setData(coordsTab);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("Error");
      }
    };
    getLocation();
  }, []);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((item) => {
        console.log(item);
        return (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            onPress={() => {
              router.push({
                pathname: "/room",
                params: { id: item.id },
              });
            }}
          />
        );
      })}
    </MapView>
  );
}
