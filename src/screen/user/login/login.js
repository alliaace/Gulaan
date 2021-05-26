import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
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
      // email: 'ddd@gmail.com',
      // password: '12345678',
      // email: 't@t.com',
      // password: 'admin1234',
      email: 'h@gmail.com',
      password: 'admin1234',
      // email: '',
      // password: '',
    };
  }

  login() {
    // alert("wait")
    if (this.state.email === '' || this.state.password === '') {
      alert('fields cannot be empty');
    }
    else {

      JsonServer
        .post('user/login', {
          email: this.state.email,
          password: this.state.password,
        })
        .then(response => {
          console.log(response.data);
          this.props.setUserData((response.data.data));
          this.props.navigation.navigate('USERDASHBOARD');
        })
        .catch(error => console.log(error.response));
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
              style={{ width: "95%", height: 150 }}
            />
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                width: "100%",
                alignItems: 'center',

              }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold' }}>User SignIn</Text>
              <Input
                placeholder="Email"
                onChangeText={uemail => this.setState({ email: uemail })}
              />
              <Input
                placeholder="Password"
                onChangeText={upass => this.setState({ password: upass })}
              />
              <CustomButton buttontext="Login" onPress={() => this.login()} />
              <Text
                style={{ marginTop: 20, color: 'blue' }}
                onPress={() => this.props.navigation.navigate('SIGNUP')}>
                Don't have an account? SignUp here
              </Text>
              <CustomButton buttontext="Login as Tailor" onPress={() => this.props.navigation.navigate("TAILORSIGNIN")} style={{ backgroundColor: "blue" }} />

            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
const mapStateToProps = state => {
  return {
    userdata: state.userdata,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUserData: data => {
      dispatch({ type: 'USER_DATA', userdata: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(login);
