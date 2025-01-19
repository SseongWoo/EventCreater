import { StyleSheet } from 'react-native';
import Colors from './colors';

const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor:Colors.main,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  text: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#C6FF01',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android용 그림자
  },
  sizedBox1:{
    height: '1%',
  },
  sizedBox2:{
    height: '2%',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
});

export default GlobalStyles;
