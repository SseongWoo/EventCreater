import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Colors from '../styles/colors';
import GlobalStyles from '../styles/globalStyles';

type Props = StackScreenProps<RootStackParamList, 'Choice'>;

const ChoiceScreen: React.FC<Props> = ({ navigation }) => {

  const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.sub,
      height: '10%',
      width: '80%',
      borderRadius: 5,
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors.main,
      fontSize: 16,
      fontWeight: 'bold',
    },
    image: {
      height: '25%',
      width:'80%',
    },
  });

  return (
    <View style={GlobalStyles.container}>
      <Image
        source={require('../assets/images/title.png')} // 로컬 이미지
        style={styles.image}
      />
      <View style={GlobalStyles.sizedBox2}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateEvent')}>
        <View style={GlobalStyles.rowContainer}>
          <Text style={styles.buttonText}>이벤트 생성</Text>
          <Text style={styles.buttonText}> {'>'} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChoiceScreen;
