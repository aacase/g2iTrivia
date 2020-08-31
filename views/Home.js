import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('homeTitle')}</Text>
        <Text>{t('homeSubtitle')}</Text>
        <Text>{t('homeChallenge')}</Text>
        <Button title={t('beginButton')} onPress={() => navigation.navigate("Quiz")}></Button>
      </View>
    );
  }