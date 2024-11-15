import axiosInstance from "../BaseURL";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("lokeshkumaravel29@gmail.com");
  const [password, setPassword] = useState("Lokesh@29");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response.status == 200) {
        Alert.alert("Success", "Login Successful!");
        console.log("Token : " + response.data.token);
        localStorage.setItem("token", response.data.token);
        setError(response.data.message);
        navigation.navigate("Home");
      } else {
        setError(response.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Google login not implemented in this demo.");
  };

  const handleGithubLogin = () => {
    Alert.alert("GitHub Login", "GitHub login not implemented in this demo.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGithubLogin}>
        <Text style={styles.buttonText}>Sign in with GitHub</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Register here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    textAlign: "center",
  },
  registerLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default LoginPage;
