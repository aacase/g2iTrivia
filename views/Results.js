import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Card, Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

//Navigation
import { useNavigation } from "@react-navigation/native";
import { scoreQuiz, isCorrect, displayQuestion } from "../services/QuizService";

export default function ResultsScreen(props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const quizResults = props.route.params.quizResults;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text category="h1">{t("results.youScored")}</Text>
      <Text category="h1">{scoreQuiz(quizResults)}</Text>
      <View style={styles.scrollViewHeight}>
        <ScrollView style={styles.scrollView}>
          {quizResults.map((question, index) => (
            <Card style={styles.card} key={index}>
              <Text style={isCorrect(question)} category="p2">
                {displayQuestion(question)}
              </Text>
            </Card>
          ))}
        </ScrollView>
      </View>
      <Button
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
        status="success"
      >
        {t("results.again")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
  },
  scrollViewHeight: {
    height: "70%",
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
