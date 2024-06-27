import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { UserContext } from "../../context/UserContext";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { saveUser } = useContext(UserContext);

  const handlePressable = async () => {
    if (!email || !username || !description || !password || !confirmPassword) {
      alert("Erreur, veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      console.log(response.data);
      alert("Inscription réussie");
      const { token, id } = response.data;
      await saveUser({ token, id }); // Enregistre l'utilisateur et le token
      router.push("home");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        alert(`Erreur: ${error.response.data.error}`);
      } else {
        alert("Erreur lors de l'inscription");
      }
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
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Describe yourself in a few words"
        onChangeText={setDescription}
        value={description}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="confirm password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Pressable onPress={handlePressable} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Text>Already have an account? Sign In</Text>
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
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  logo: {
    height: 90,
    width: 80,
  },
});
