import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "@ui-kitten/components";
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
      : navigation.navigate("Results", {
          quizResults: quizLogic.questions,
        });
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Text category="h3">
          {quizQuestions.length
            ? quizQuestions[quizIndex].category
            : t("quiz.category")}
        </Text>
      </View>
      <View style={styles.questionsContainer}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Text style={styles.question} category="h6">
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
                status="danger"
              >
                {t("quiz.false")}
              </Button>
            </View>
          </Card>
          <View style={{ marginTop: 50 }}>
            <Text category="h6">
              {quizIndex + 1} {t("quiz.of")} {quizQuestions.length}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  questionsContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  question: {
    height: 100,
  },
  cardContainer: {
    height: 300,
    width: "100%",
    alignItems: "center",
  },
  card: {
    flex: 1,
    margin: 0,
    width: "100%",
    height: 200,
  },
  footerContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
