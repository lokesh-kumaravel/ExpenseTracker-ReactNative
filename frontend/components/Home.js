import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Transaction from "./Transaction";
import BarChartExample from "./BarChartExample";
import { ScrollView } from "react-native-web";

const { width, height } = Dimensions.get("window");

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.heading}>Home</Text>
      </View>
      <ScrollView
        style={{ height: "20%" }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            { alignContent: "center", alignItems: "center", paddingTop: "3%" },
          ]}
        >
          <View style={[styles.box, { backgroundColor: "#2c3e50" }]}>
            {" "}
            <View style={[{ paddingLeft: "5%", paddingTop: "7%" }]}>
              <Text
                style={[styles.text, { fontSize: "30px", color: "#d0d3d4" }]}
              >
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
        <BarChartExample />
      </ScrollView>
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
    // backgroundColor: "#fff",
    backgroundColor: "#fcf1ff",
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
    fontSize: "40px",
    fontWeight: "bold",
  },
});

export default Home;
