import * as React from 'react';
import { View, Text } from 'react-native';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";


export default function ResultsScreen() {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Results Screen</Text>
        <Text onPress={() => navigation.navigate("Home")}>Play Again?</Text>
      </View>
    );
  }