import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {responsiveFontSize} from './ReactNativeResponsiveDimensions';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    if (session.isUserLoggedIn) {
      navigation.navigate('Posts');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Task App</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  logo: {
    fontSize: responsiveFontSize(5),
    color: '#fff',
  },
});
