import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { image185 } from "../api";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
export const UpcomingMovie = ({ upcoming, title }) => {
  const navigation = useNavigation();

  return (
    <View className={"mb-8 space-y-4"}>
      <Text className="text-white text-xl font-semibold mx-4">{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {upcoming.map((item) => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
              navigation.navigate("Movie", {
                id: item.id,
              });
            }}
          >
            <View className="mr-4 space-y-1">
              <Image
                source={{ uri: image185(item.poster_path) }}
                className="rounded-3xl"
                style={{ width: width * 0.3, height: height * 0.2 }}
              />
              <Text className="text-white">
                {item.title.length > 15
                  ? item.title.substring(0, 15) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};
