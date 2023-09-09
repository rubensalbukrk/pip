import React from "react";
import { View, ActivityIndicator, Image } from "react-native";

export default function Preload() {


  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",

          backgroundColor: "#fff",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "40%",
            marginBottom: "5%",
          }}
          source={require("../../../assets/imgs/pip-logo.jpg")}
        />
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    </>
  );
}
