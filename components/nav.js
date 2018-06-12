import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet, Button } from 'react-native';



export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'post'
        };
    }



    render() {

        return (
            <View style={styles.container}>
                <Button
                    onPress={()=>{this.props.navHandle('report')}}
                    title="Report"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={()=>{this.props.navHandle('list')}}
                    title="List"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center', 
        zIndex: 10
    }
});