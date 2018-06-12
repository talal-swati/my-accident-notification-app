import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: null
        };
    }
    componentDidMount() {
        let result = [];
        const kinveyBaseUrl = "https://baas.kinvey.com/";
        const kinveyAppKey = "kid_SJAVDWR1G";
        const kinveyAppSecret = "e2840306d13548f5b3155e8e1306487b";
        const kinveyQuestionsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/markers";
        const kinveyAppAuthHeaders = {
            'Authorization': "Basic a2lkX1NKQVZEV1IxRzo1ZTZkMGY3NjdhZmE0MzBlOTQ3MGMyODIyMzM2NGIxYg==",
        };
        let self = this;
        axios({
            method: "GET",
            url: kinveyQuestionsUrl,
            headers: kinveyAppAuthHeaders,
        }).then(function (response) {
            let result = [];
            for (let entry of response.data) {
                let marker = { latitude: entry.latitude, longitude: entry.longitude, type: entry.type}
                result.push(marker);
            }
            self.setState({ markers: result });

        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
            <MapView
               style={ styles.map }
               initialRegion={{
               latitude: 42.698334,
               longitude: 23.319941,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
               }}
               showsUserLocation={true}
               onPress={ this.handleClick }
               
           > 
           {this.state.markers && this.state.markers.map((marker, i) => {
               return <MapView.Marker
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                title={marker.type}
                key={i}
               
           />
           
           })}
           
           
           </MapView>
           </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      flexDirection: 'row',
      zIndex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }
  });