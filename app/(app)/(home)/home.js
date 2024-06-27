import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  router.navigate({
                    pathname: "/room",
                    params: { id: item._id },
                  });
                }}
              >
                <Text>{item.title}</Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => {
            return String(item._id);
          }}
        />
      )}
    </SafeAreaView>
  );
}
