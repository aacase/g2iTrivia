import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const questions = useSelector(state => state.quizReducer.questions);
  React.useEffect(() => {
    //When the api call has finished and the questions are ready, move on to the quiz screen
    questions.length ? navigation.navigate("Quiz") : null;
  }, [questions]);
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text category="h3">{t("home.title")}</Text>
        <Text category="h3">{t("home.titleLineTwo")}</Text>
      </View>

      <Text style={styles.middleText} category="h6">
        {t("home.subtitle")}
      </Text>
      <Text style={styles.middleText} category="h6">
        {t("home.challenge")}
      </Text>
      <Button
        style={styles.button}
        status="success"
        onPress={() => dispatch({ type: 'START_QUIZ' })}
      >
        {t("home.beginButton")}{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  middleText: { width: "70%" },
  button: { marginBottom: 50 },
});
