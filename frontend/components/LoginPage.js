import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axiosInstance from "../BaseURL";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    // Prepare the request body
    const data = {
      email: email,
      password: password,
    };

    try {
      // Send POST request to the backend for authentication
      const response = await axiosInstance.post("/auth/login", data);

      // Assuming your backend returns a success message and JWT token
      if (response.data) {
        Alert.alert("Success", "Login Successful!");
        // Store the token if necessary
        // You can store the JWT token in AsyncStorage or other methods as needed
        // Example: AsyncStorage.setItem('token', response.data.token);

        // Navigate to the next screen after successful login
        navigation.navigate("Home"); // Replace with your target route
      } else {
        setError(response.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
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

      {/* Simulated Google and GitHub Login */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in with GitHub</Text>
      </TouchableOpacity>

      {/* Register Link */}
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

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from "react-native";

// const LoginPage = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   // Handle Login
//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in both fields");
//       return;
//     }

//     // Simulate API login request here (you should replace this with your own API logic)
//     if (email === "lokesh@gmail.com" && password === "123") {
//       Alert.alert("Success", "Login Successful!");
//       // You can navigate to the home page or wherever after successful login
//       // navigation.navigate("Home"); // Replace with your route
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   // Simulate Google login
//   const handleGoogleLogin = () => {
//     Alert.alert("Google Login", "Google login not implemented in this demo.");
//   };

//   // Simulate GitHub login
//   const handleGithubLogin = () => {
//     Alert.alert("GitHub Login", "GitHub login not implemented in this demo.");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Sign In</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="E-mail"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//       </View>

//       {error && <Text style={styles.errorText}>{error}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>

//       {/* Simulated Google and GitHub Login */}
//       <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
//         <Text style={styles.buttonText}>Sign in with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={handleGithubLogin}>
//         <Text style={styles.buttonText}>Sign in with GitHub</Text>
//       </TouchableOpacity>

//       {/* Register Link */}
//       <View style={styles.registerContainer}>
//         <Text style={styles.registerText}>
//           Don't have an account?{" "}
//           <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//             <Text style={styles.registerLink}>Register here</Text>
//           </TouchableOpacity>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   registerContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   registerText: {
//     textAlign: "center",
//   },
//   registerLink: {
//     color: "#007bff",
//     fontWeight: "bold",
//   },
// });

// export default LoginPage;
