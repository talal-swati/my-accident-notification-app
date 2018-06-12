import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet, Button, Dimensions, Alert, Modal, TouchableHighlight } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import ModalSelector from 'react-native-modal-selector'



export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marker: {
                latitude: '',
                longitude: '',
                
              },
              showModal: false,
              modalVisible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }
    handleClick(event){
            let latAndLong = event.nativeEvent.coordinate;
                this.setState({
                    marker: {
                        latitude: latAndLong.latitude,
                        longitude: latAndLong.longitude,
                        
                    },
            modalVisible: true,
            
        })
    }
    closeModal(){
        this.setState({
            modalVisible: false
        })
    }
    handleModal(selection){
        const kinveyBaseUrl = "https://baas.kinvey.com/";
        const kinveyAppKey = "kid_SJAVDWR1G";
        const kinveyAppSecret = "e2840306d13548f5b3155e8e1306487b";
        const kinveyMarkersUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/markers";
        const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
        const kinveyAppAuthHeaders = {
            'Authorization': "Basic a2lkX1NKQVZEV1IxRzo1ZTZkMGY3NjdhZmE0MzBlOTQ3MGMyODIyMzM2NGIxYg==",
        };
        let markerData = {
            latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude,
            type: selection
        }
        let self = this;
        axios({
            method: "POST",
            url: kinveyMarkersUrl,
            headers: kinveyAppAuthHeaders,
            data: markerData
        }).then(function(response) {
            
            
        }).catch(function (error) {
            console.log(error);
        })
        this.setState({
            modalVisible: false
        });
        setTimeout(() => {
            alert('Благодаря!'); 
        }, 1000);
    }
    render() {
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>

                    <View style={styles.modalView}>
                        <View>
                        <Text style={styles.modalHeading}>Какво има тук?</Text>
                        <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.handleModal('Полиция')}>
                            <Text>Полиция</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.handleModal('ПТП')}>
                            <Text>ПТП</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.handleModal('Ягодки')}>
                            <Text>Ягодки</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.closeModal} onPress={this.closeModal}>
                            <Text>Избери друго място.</Text>
                        </TouchableHighlight>
                </View>
            </View>
            </Modal>

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
                <MapView.Marker
                    coordinate={{latitude: +this.state.marker.latitude, longitude: +this.state.marker.longitude}}
                    title={"Моля изберете от менюто какво има тук!"}
                />
                
                
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
    },
    modalView: {
      marginTop: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    touchableHighlight: {
        margin: 30,
        backgroundColor:'#fff176',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    modalHeading: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30
    },
    closeModal : {
        margin: 30,
        backgroundColor:'#03a9f4',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    }
  });