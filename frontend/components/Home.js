import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Transaction from "./Transaction";

const { width, height } = Dimensions.get("window");

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn.dribbble.com/users/5704055/screenshots/17402861/media/eb7b7ccb7af1223224e0fba54b8ee15f.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.heading}>Home</Text>
      </View>
      <View
        style={[
          { alignContent: "center", alignItems: "center", paddingTop: "10%" },
        ]}
      >
        <View style={[styles.box, { backgroundColor: "#2c3e50" }]}>
          {" "}
          <View style={[{ paddingLeft: "5%", paddingTop: "7%" }]}>
            <Text style={[styles.text, { fontSize: "30px", color: "#d0d3d4" }]}>
              Total Balance{" "}
            </Text>
            <Text
              style={[styles.text, { fontWeight: "bold", fontSize: "40px" }]}
            >
              $75,000
            </Text>
            <Text
              style={[styles.text, { fontWeight: "bold", fontSize: "30px" }]}
            ></Text>
          </View>
        </View>
      </View>
      <Transaction />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 350,
    height: 170,
    borderWidth: 2,
    borderRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.05,
    marginRight: width * 0.18,
  },
  heading: {
    fontFamily: "Times New Roman",
    fontSize: "50px",
    fontWeight: "bold",
  },
});

export default Home;
