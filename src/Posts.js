import {View, Text, StyleSheet, StatusBar, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from './ReactNativeResponsiveDimensions';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {userLoggedIn} from './redux/SessionSlice';

const Posts = ({navigation}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.session);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={styles.userview}>
          <Image
            source={require('../src/images/user.png')}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{userData.data.name}</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.body}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.title}>TaskApp</Text>
        <Text
          style={styles.title}
          onPress={() => {
            dispatch(userLoggedIn(false));
            navigation.navigate('Login');
          }}>
          Logout
        </Text>
      </View>
      <FlatList data={data} renderItem={renderItem} scrollEnabled />
    </View>
  );
};

export default Posts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: responsiveHeight(7),
    backgroundColor: 'orange',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: responsiveWidth(5),
    justifyContent: 'space-between',
    paddingRight: responsiveWidth(5),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: '#fff',
  },
  item: {
    width: responsiveWidth(90),

    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
  },
  itemTitle: {
    marginTop: responsiveHeight(1),
    width: '90%',
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: '#000',
  },
  itemDescription: {
    marginTop: responsiveHeight(0.5),
    width: '90%',
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    marginBottom: responsiveHeight(1),
  },
  userview: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
  },
  userImage: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },
  userName: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
    fontWeight: '600',
  },
});
