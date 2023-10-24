import React from "react";
import { Home } from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { Movie } from "../screens/Movie";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Person } from "../screens/Person";
import Search from "../screens/Search";

const Stack = createStackNavigator();
export const AppNavigation = () => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer gestureEnabled={false}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Movie"
          component={Movie}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Person"
          component={Person}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
