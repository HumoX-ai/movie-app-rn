import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpComingMovies,
} from "../api";

import { TopRatedMovie } from "../components/top-rated-movie";
import { UpcomingMovie } from "../components/upcoming-movie";
import TrandingMovie from "../components/tranding-movie";

export const Home = ({ navigation }) => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTrandingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);
  const getTrandingMovies = async () => {
    const data = await fetchTrendingMovies();
    setTrending(data.results);
    setIsLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpComingMovies();
    setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    setTopRated(data.results);
  };

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    setPopular(data.results);
  };

  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2 border-b-2 mb-5">
          <Text className="text-white text-2xl font-semibold">Movipedia</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View className="absolute top-0 bottom-0 left-0 right-0 flex-1 justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {trending.length > 0 && <TrandingMovie trending={trending} />}

            {upcoming.length > 0 && (
              <UpcomingMovie upcoming={upcoming} title={"Upcoming Movie"} />
            )}
            {upcoming.length > 0 && (
              <UpcomingMovie
                upcoming={trending.reverse()}
                title={"Trending movie"}
              />
            )}
            {topRated.length > 0 && <TrandingMovie trending={topRated} />}
          </ScrollView>
        </>
      )}
    </View>
  );
};
