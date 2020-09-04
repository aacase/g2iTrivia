import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import HomeScreen from "./views/Home";
import QuizScreen from "./views/Quiz";
import ResultsScreen from "./views/Results";
//redux
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import quizSaga from "./redux/sagas/quizSaga";
//Translations
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "./locales/en/translation.json";

//Initiate Translation File and default Settings
const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (cb) => cb("en"),
  init: () => {},
  cacheUserLanguage: () => {},
};
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    resources: {
      en: {
        translation: common_en,
      },
    },
  });

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(quizSaga);

//Create Navigation Wrapper
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Results"
              component={ResultsScreen}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}