import React from "react";
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import HomeScreen from "./views/Home";
import QuizScreen from "./views/Quiz";
import ResultsScreen from "./views/Results";

//Translations
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from "./locales/en/translation.json";
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: common_en
      }
    }
  });
const Stack = createStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
