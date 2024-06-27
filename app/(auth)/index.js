import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import { UserContext } from "../../context/UserContext";

export default function HomePage() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { saveUser } = useContext(UserContext);

  const handlePressable = async () => {
    if (!inputEmail || !inputPassword) {
      alert("Erreur, veuillez remplir tous les champs");
      return;
    }
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: inputEmail,
          password: inputPassword,
        }
      );
      console.log(response.data);
      const { token, id } = response.data;
      saveUser(id, token);
      router.navigate("home");
      alert("Bienvenue");
    } catch (error) {
      console.log(error);
      alert("Mot de passe ou identifiant incorrect");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={setInputEmail}
        value={inputEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={setInputPassword}
        value={inputPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Pressable onPress={handlePressable} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          router.navigate("signup");
        }}
      >
        <Text> create account</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5fcff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderBottomColor: "red",

    borderRadius: 5,
  },
  button: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: 130,
    borderColor: "red",
  },
  buttonText: {
    color: "grey",
    textAlign: "center",
  },
  logo: {
    heigth: 90,
    weight: 80,
  },
});
