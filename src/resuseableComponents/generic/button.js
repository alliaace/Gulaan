import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={[{
                    width: 280,
                    alignItems: "center",
                    backgroundColor: "red",
                    height: 50,
                    justifyContent: "center",
                    borderRadius: 5,
                    marginTop: 20,

                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={[{ fontSize: 18, color: "white" }, this.props.textstyle]}>{this.props.buttontext}</Text>
            </TouchableOpacity>
        );
    }
}
