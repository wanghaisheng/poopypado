import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";

import { Poop, initTable } from "./src/components/history";
import { Main } from "./src/components/Main";
import { Setting } from "./src/components/Setting";
import { theme } from "./src/components/theme";

export type RootStackParamList = {
  Main: undefined;
  Setting?: {
    entry: Poop;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const db = SQLite.openDatabase("db");

export default function App() {
  useEffect(() => {
    initTable(db);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main">
            {(props) => <Main {...props} db={db} />}
          </Stack.Screen>
          <Stack.Screen name="Setting">
            {(props) => <Setting {...props} db={db} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
