import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fetchPersonMovies,
  fetchPersonalDetails,
  image342,
  image500,
} from "../api";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { UpcomingMovie } from "../components/upcoming-movie";

export const Person = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const { params: item } = useRoute();
  const [iconChanged, setIconChanged] = useState("");

  const navigation = useNavigation();

  const { height, width } = Dimensions.get("window");
  useEffect(() => {
    getPersonDetails();
    getpersonMovies();
    setIsLoading(false);
  }, [item.id]);

  const getPersonDetails = async () => {
    const data = await fetchPersonalDetails(item.id);
    setPerson(data);
    console.log("Person", data);
  };

  const getpersonMovies = async () => {
    const data = await fetchPersonMovies(item.id);
    setPersonMovies(data.cast);
    console.log(data);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-slate-900 flex-1"
    >
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size={30} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIconChanged(!iconChanged)}>
            <HeartIcon
              color={iconChanged ? "red" : "white"}
              size={30}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <>
            <View style={{ height: height }}>
              <ActivityIndicator
                size="large"
                className="absolute top-0 bottom-0 left-0 right-0"
              />
            </View>
          </>
        ) : (
          <View>
            <View
              className={"flex-row justify-center"}
              style={{
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                <Image
                  source={{ uri: image342(person?.profile_path) }}
                  style={{
                    height: height * 0.47,
                    width: width * 0.74,
                    objectFit: "cover",
                  }}
                />
              </View>
            </View>
            <View className={"mt-6"}>
              <Text className={"text-3xl text-white font-bold text-center"}>
                {person?.name}
              </Text>
              <Text className={"text-neutral-400 text-base text-center"}>
                {person?.place_of_birth}
              </Text>
            </View>
            <View
              className={
                "mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"
              }
            >
              <View
                className={"border-r-2 border-r-neutral-400 px-2 items-center"}
              >
                <Text className={"text-white font-semibold"}>Gender</Text>
                <Text className={"text-neutral-400 text-sm"}>
                  {person?.gender === 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View
                className={"border-r-2 border-r-neutral-400 px-2 items-center"}
              >
                <Text className={"text-white font-semibold"}>Birthday</Text>
                <Text className={"text-neutral-400 text-sm"}>
                  {person?.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.known_for_department}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.popularity?.toFixed(2)} %
                </Text>
              </View>
            </View>
            <View className={"my-6 mx-4 space-y-2"}>
              <Text className="text-white text-lg">Biography</Text>
              <Text className={"text-neutral-400 tracking-wide"}>
                {person?.biography}
              </Text>
            </View>
            {person?.id && personMovies.length > 0 && (
              <UpcomingMovie title={"Movies"} upcoming={personMovies} />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
