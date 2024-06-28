import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const RoomScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    );
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data && (
          <View>
            <FlatList
              data={data.photos}
              renderItem={({ item }) => (
                <Image source={{ uri: item.url }} style={styles.image} />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageList}
            />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>{data.price} €</Text>
            <Text style={styles.rating}>
              {data.ratingValue} stars & {data.reviews} reviews
            </Text>
            <Text style={styles.username}>
              Hosted by {data.user.account.username}
            </Text>
            <Image
              source={{ uri: data.user.account.photo.url }}
              style={styles.avatar}
            />
            <Text
              numberOfLines={showFullDescription ? 0 : 3}
              style={styles.description}
            >
              {data.description}
            </Text>
            <TouchableOpacity onPress={toggleDescription} style={styles.button}>
              <Text style={styles.buttonText}>
                {showFullDescription ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageList: {
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  price: {
    fontSize: 20,
    color: "green",
    margin: 10,
  },
  rating: {
    fontSize: 16,
    color: "gray",
    margin: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default RoomScreen;
