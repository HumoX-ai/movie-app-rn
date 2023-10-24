import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { image500 } from "../api";
import defaultImage from "../../assets/defaultImage.png";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

export const Cast = ({ cast }) => {
  const navigation = useNavigation();
  console.log("Cast", cast);
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5 ">Actors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="mr-4 items-center"
            onPress={() => {
              navigation.navigate("Person", {
                id: item.id,
              });
            }}
          >
            <Image
              source={
                item.profile_path
                  ? { uri: image500(item.profile_path) }
                  : defaultImage
              }
              className="rounded-3xl"
              style={{ width: width * 0.3, height: height * 0.2 }}
            />
            <Text className="text-white text-xs mt-1">
              {item.character.length > 10
                ? item.character.substring(0, 10) + "..."
                : item.character}
            </Text>
            <Text className="text-neutral-400 text-xs">
              {item.original_name.length > 10
                ? item.original_name.substring(0, 10) + "..."
                : item.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
