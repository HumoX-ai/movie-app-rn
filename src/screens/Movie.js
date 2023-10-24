import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api";
import { LinearGradient } from "expo-linear-gradient";
import { Cast } from "../components/cast";
import { UpcomingMovie } from "../components/upcoming-movie";

export const Movie = ({ navigation }) => {
  const [iconChanged, setIconChanged] = useState("");
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { params: item } = useRoute();

  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item.id]);

  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(item.id);
    setMovie(data);

    setIsLoading(false);
  };

  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(item.id);
    setCast(data.cast);
  };

  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovies(item.id);
    setSimilarMovie(data.results);
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
            <Image
              resizeMode="cover"
              source={{ uri: image500(movie.poster_path) }}
              style={{
                width: width,
                height: height * 0.57,
              }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute top-36"
            />
            <View className={"space-y-4"} style={{ marginTop: -36 }}>
              <Text className="text-white text-3xl font-bold tracking-widest text-center ">
                {movie.title}
              </Text>
              {movie?.id ? (
                <Text className="text-neutral-400 text-base text-center font-semibold">
                  {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
                  {movie?.runtime} min
                </Text>
              ) : null}
              <View className="flex-row justify-center mx-4 space-x-2">
                {movie?.genres?.map((item, index) => (
                  <Text
                    className="text-neutral-400 text-base font-semibold text-center"
                    key={index}
                  >
                    {item.name}{" "}
                    {index + 1 !== movie?.genres?.length ? " •" : null}
                  </Text>
                ))}
              </View>
              <Text className="text-neutral-400 mx-4 tracking-wide">
                {movie?.overview}
              </Text>
            </View>
            {movie?.id && cast.length > 0 && <Cast cast={cast} />}
            {movie?.id && similarMovie.length > 0 && (
              <UpcomingMovie upcoming={similarMovie} title="Similar Movies" />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
