import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getQuizQuestions, answerQuestion } from "../services/QuizService";

export default function QuizScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizIndex, setQuizIndex] = React.useState(0);
  React.useEffect(() => {
    const getQuestions = async () => {
      setQuizQuestions(await getQuizQuestions());
    };
    getQuestions();
  }, []);

  const handleAnswerQuestion = function (answer) {
    let quizLogic = answerQuestion(answer, quizIndex, quizQuestions);
    setQuizQuestions(quizLogic.questions);
    quizLogic.index + 1 <= quizQuestions.length
      ? setQuizIndex(quizLogic.index)
      : navigation.navigate("Results");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Card style={styles.card}>
        <View>
          <Text category="h6">
            {quizQuestions.length
              ? quizQuestions[quizIndex].category
              : t("quiz.category")}
          </Text>
        </View>
        <Text>
          {quizQuestions.length
            ? quizQuestions[quizIndex].question
            : t("quiz.question")}
        </Text>
        <View style={[styles.footerContainer]}>
          <Button
            onPress={() => handleAnswerQuestion("True")}
            style={styles.footerControl}
            size="small"
          >
            {t("quiz.true")}
          </Button>
          <Button
            style={styles.footerControl}
            onPress={() => handleAnswerQuestion("False")}
            size="small"
            status="basic"
          >
            {t("quiz.false")}
          </Button>
        </View>
        <View>
          <Text category="h6">
            {quizIndex + 1} {t("quiz.of")} {quizQuestions.length}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 0,
    width: "100%",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
