import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";
import React, { useEffect } from "react";

import { Main } from "./src/components/Main";
import { Setting } from "./src/components/Setting";

export type RootStackParamList = {
  Main: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const db = SQLite.openDatabase("db");

export default function App() {
  // Init table
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, date text);"
      );
    });
  }, []);

  return (
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
  );
}
