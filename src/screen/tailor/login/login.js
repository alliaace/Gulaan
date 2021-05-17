import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  FlatList,
  ImageBackground
} from 'react-native';
import Input from '../../../resuseableComponents/generic/input';
import CustomButton from '../../../resuseableComponents/generic/button';
import JsonServer from '../../../api/server';
import { connect } from 'react-redux';
import axios from 'axios';
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: 'a@a.com',
      // password: 'admin1234',
      email: '',
      password: '',
      tailordata: null,
      error_message: '',
    };
  }

  login() {
    if (this.state.email === '' || this.state.password === '') {
      alert('fields cannot be empty');
    } else {
      JsonServer
        .post('tailor/login', {
          email: this.state.email,
          password: this.state.password,
        })
        .then(response => {
          console.log(response.data);
          this.setState({ tailordata: response.data });
          this.props.setTailorData(response.data.data);
          this.props.navigation.navigate('TAILORDASHBOARD');
          // this.props.navigation.navigate('DASHBOARD');
        })
        .catch(error => {
          console.log('------------------------------------------------');
          console.log(error);
          console.log('------------------------------------------------');
          console.log('------------------------------------------------');
        });
    }
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ImageBackground source={{ uri: "https://previews.123rf.com/images/vectorchoice/vectorchoice1605/vectorchoice160500095/57692765-vector-abstract-upholstery-dark-green-background-can-be-used-in-cover-design-book-design-website-bac.jpg" }}
          style={styles.main}>
          <KeyboardAvoidingView style={styles.innerView}>
            <Image
              source={{
                uri:
                  'https://logos.textgiraffe.com/logos/logo-name/Gulan-designstyle-summer-m.png',
              }}
              style={{ width: '95%', height: 150 }}
            />
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                width: '95%',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                Tailor SignIn
              </Text>
              {this.state.error_message == '' ? null : (
                <Text style={{ color: 'red' }}>{this.state.error_message}</Text>
              )}
              <Input
                placeholder="Email"
                onChangeText={uemail => this.setState({ email: uemail })}
              />
              <Input
                placeholder="Password"
                onChangeText={upass => this.setState({ password: upass })}
                issecure={true}
              />
              <CustomButton buttontext="Login" onPress={() => this.login()} />
              <Text
                style={{ marginTop: 20, color: 'blue' }}
                onPress={() => this.props.navigation.navigate('TAILORSIGNUP')}>
                Don't have an account? SignUp here
              </Text>
              <CustomButton buttontext="Login as User" onPress={() => this.props.navigation.navigate("SIGNIN")} style={{ backgroundColor: "blue" }} />

            </View>
          </KeyboardAvoidingView>
        </ImageBackground>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'green',
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

const mapStateToProps = state => {
  return {
    userdata: state.userdata,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTailorData: data => {
      dispatch({ type: 'TAILOR_DATA', tailordata: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(login);
