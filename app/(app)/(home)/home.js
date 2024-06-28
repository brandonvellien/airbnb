import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        router.navigate({
          pathname: "/room",
          params: { id: item._id },
        });
      }}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.photos[0].url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price} €</Text>
      <Image
        source={{ uri: item.user.account.photo.url }}
        style={styles.userPhoto}
      />
      <Text style={styles.rating}>
        {item.ratingValue} stars & {item.reviews} reviews
      </Text>
    </Pressable>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item._id)}
        contentContainerStyle={styles.flatlistContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "gray",
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});
