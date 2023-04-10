import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from './ReactNativeResponsiveDimensions';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {getUserDetails, userLoggedIn} from './redux/SessionSlice';
import {useNavigation} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signin = async () => {
    if (email !== '' && password !== '') {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      let isuser = false;
      const users = res.data;
      let userData = null;
      users.map(item => {
        if (item.email.toLowerCase() == email.toLowerCase()) {
          isuser = true;
          userData = item;
        }
      });
      console.log(isuser);
      if (isuser) {
        dispatch(userLoggedIn(true));
        dispatch(getUserDetails(userData));
        setEmail('');
        setPassword('');
        navigation.navigate('Posts');
      } else {
        dispatch(userLoggedIn(false));
      }
    } else {
      Alert.alert('Please Enter Correct Data');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={[styles.input, {marginTop: responsiveHeight(10)}]}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
        style={[styles.input, {marginTop: responsiveHeight(3)}]}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          signin();
        }}>
        <Text style={styles.btnText}>{'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(3),

    fontWeight: '700',
  },
  input: {
    width: '90%',

    height: responsiveHeight(6),
    borderWidth: 0.5,
    paddingLeft: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
  },
  btn: {
    width: '90%',
    height: responsiveHeight(6.3),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'orange',
    marginTop: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: responsiveFontSize(2.2),
    color: '#000',
    fontWeight: '600',
  },
});
