import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default class input extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <KeyboardAvoidingView>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                    placeholderTextColor="black"
                    secureTextEntry={this.props.issecure}
                    keyboardType={this.props.type}
                />
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        // flex: 1,
        // flexDirection: "column"
        width: 280,
        borderRadius: 5,
        marginTop: 20,
        paddingLeft: 20,
        borderColor: "black",
        color: "black"

    }
})
