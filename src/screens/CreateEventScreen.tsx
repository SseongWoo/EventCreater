import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Platform, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../styles/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import channels from '../../channels.json'; // JSON 파일
import { sendData } from '../services/HttpRequest';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';


type Props = StackScreenProps<RootStackParamList, 'CreateEvent'>;

const CreateEventScreen: React.FC<Props> = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [apiURL, setApiURL] = useState('https://');
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [multiplier, setMultiplier] = useState(2);
  const [checkboxes, setCheckboxes] = useState(
    Array(15)
      .fill(null)
      .map((_, index) => ({ id: index, label: channels.CHANNEL_NAMES[index], checked: false }))
  );
  const channelMap = new Map<string, string>();
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

channels.CHANNEL_NAMES.forEach((name: string, index: number) => {
  channelMap.set(name, channels.CHANNEL_IDS[index]);
});

  // 배수 계산
  const calculateMultiplier = (increment: boolean) => {
    setMultiplier((prev) => Math.max(2, Math.min(5, increment ? prev + 1 : prev - 1)));
  };

  // 체크박스 토글
  const toggleCheckbox = (id: number) => {
    setCheckboxes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // 시작 날짜 변경
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {setEndDate(selectedDate);}
    }else{
      setShowStartPicker(false);
    }
  };

  // 종료 날짜 변경
  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setEndDate(selectedDate);
      if (selectedDate < startDate) {setStartDate(selectedDate);}
    }else{
      setShowEndPicker(false);
    }
  };
//opt/homebrew/opt/openjdk@17/include
  // 이벤트 등록
  const submitData = async () => {
    setLoading(true);               // 로딩 시작
    setMessage('이벤트 등록 시작');     // 메세지 출력
    if(apiURL != null && description != null && startDate <= endDate && multiplier > 1 && checkboxes.filter((checkbox) => checkbox.checked).length > 0 && new Date(startDate.toDateString()) > new Date(new Date().toDateString())){
      const url = apiURL;
      const jsonData = {
        title: eventTitle,
        description: description,
        eventstart: format(startDate, 'yyyy-MM-dd'),
        eventend: format(endDate, 'yyyy-MM-dd'),
        multiplier: multiplier,
        channel: checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => channelMap.get(checkbox.label)),
      };
      try {
        console.log(jsonData);
        setMessage('데이터 전송중');
        const response = await sendData(url, jsonData);
        console.log('Server Response:', response);
        navigation.goBack();
      } catch (error) {
        setMessage('전송 오류 발생');
        console.error('Failed to send data:', error);
      }
    }else{
      setMessage('오류 발생');
    }
    setLoading(false); // 로딩 종료
  };

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled>

      <View style={styles.messageContainer}><Text style={styles.sectionTitle}>{message}</Text></View>

      <TextInputField label="API URL" value={apiURL} onChange={setApiURL} />
      <TextInputField label="제목" value={eventTitle} onChange={setEventTitle} />
      <TextInputField label="설명" value={description} onChange={setDescription} multiline />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>배수</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => calculateMultiplier(false)}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.multiplier}>{multiplier}</Text>
          <TouchableOpacity style={styles.button} onPress={() => calculateMultiplier(true)}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DatePickerField
        label="시작 날짜"
        date={startDate}
        showPicker={showStartPicker}
        setShowPicker={setShowStartPicker}
        onChange={handleStartDateChange}
      />

      <DatePickerField
        label="종료 날짜"
        date={endDate}
        showPicker={showEndPicker}
        setShowPicker={setShowEndPicker}
        onChange={handleEndDateChange}
      />

    <Text style={styles.sectionTitle}>대상 채널</Text>
    <View style={styles.checkboxGrid}>
      {checkboxes.map((checkbox, index) => (
        <View
          key={checkbox.id}
          style={[
            styles.checkboxContainer,
            index % 3 === 0 ? { marginLeft: 0 } : {}, // 첫 번째 열의 왼쪽 여백 제거
          ]}
        >
          <TouchableOpacity
            style={[styles.checkbox, checkbox.checked && styles.checkboxChecked]}
            onPress={() => toggleCheckbox(checkbox.id)}
          />
          <Text style={styles.checkboxLabel}>{checkbox.label}</Text>
        </View>
      ))}
    </View>

      <TouchableOpacity style={styles.submitButton} onPress={() => submitData()} disabled={loading}>
      {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>이벤트 생성</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

// 공용 텍스트 필드
const TextInputField = ({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{label}</Text>
    <TextInput
      style={[styles.textInput, multiline && styles.textArea]}
      value={value}
      onChangeText={onChange}
      multiline={multiline}
    />
  </View>
);

//날짜 포맷 함수
const formatDate = (date: Date): string => {
  return format(date, 'yyyy년 MMMM d일', { locale: ko });
};

const DatePickerField = ({
  label,
  date,
  showPicker,
  setShowPicker,
  onChange,
}: {
  label: string;
  date: Date;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  onChange: (event: any, selectedDate?: Date) => void;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{label}: {formatDate(date)}</Text>
    <Button title={showPicker ? '확인' : `${label} 선택`} onPress={() => setShowPicker(!showPicker)} />
    {showPicker && (
      <DateTimePicker
        value={date}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={onChange}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.main,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: '10%',
    },
    messageContainer: {
      backgroundColor:Colors.white,
      height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
      },
  section: {
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.sub,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.sub,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    width: '100%',
    height: 40,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: Colors.sub,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.main,
    fontSize: 16,
    fontWeight: 'bold',
  },
  multiplier: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.sub,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '30%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: Colors.sub,
    borderColor: Colors.sub,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: Colors.sub,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 줄바꿈을 허용하여 3열로 배치
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default CreateEventScreen;
