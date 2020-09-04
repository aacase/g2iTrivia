import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const isLastQuestion = (arrayLength, index) => arrayLength != 0 && index + 1 == arrayLength;

export default function QuizScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const quizQuestions = useSelector((state) => state.quizReducer.questions);
  const quizIndex = useSelector((state) => state.quizReducer.index);
  const quizOver = useSelector((state) => state.quizReducer.quizOver);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // When the quiz is over according to the redux state, navigate to the results screen
    quizOver ? navigation.navigate("Results") : null;
  }, [quizOver]);

  const handleAnswer = (answer) => {
    if (!isLastQuestion(quizQuestions.length, quizIndex)) {
      dispatch({ type: "ANSWER_QUESTION", payload: answer });
      dispatch({ type: "INCREASE_INDEX" });
    } else if (
      isLastQuestion(quizQuestions.length, quizIndex)
    ) {
      dispatch({ type: "ANSWER_QUESTION", payload: answer });
      dispatch({ type: "END_QUIZ" });
    }
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
                onPress={() => handleAnswer("True")}
                style={styles.footerControl}
                size="small"
              >
                {t("quiz.true")}
              </Button>
              <Button
                style={styles.footerControl}
                onPress={() => handleAnswer("False")}
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
