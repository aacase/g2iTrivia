import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
export default function HomeScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('home.title')}</Text>
        <Text>{t('home.subtitle')}</Text>
        <Text>{t('home.challenge')}</Text>
        <Button title={t('home.beginButton')} onPress={() => navigation.navigate("Quiz")}></Button>
      </View>
    );
  }