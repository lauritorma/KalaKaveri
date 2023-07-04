import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pins, setPins] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      getCurrentLocation();
    } else {
      console.log('Location permission denied');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPin = event => {
    const { coordinate } = event.nativeEvent;
    setSelectedLatitude(coordinate.latitude);
    setSelectedLongitude(coordinate.longitude);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setLocationName('');
    setLocationAddress('');
    setDescriptionText('');
  };

  const handleAddSpot = () => {
    const newPin = {
      coordinate: {
        latitude: selectedLatitude,
        longitude: selectedLongitude,
      },
      locationName: locationName,
      locationAddress: locationAddress,
      description: descriptionText,
    };

    setPins([...pins, newPin]);
    setModalVisible(false);
    setLocationName('');
    setLocationAddress('');
    setDescriptionText('');
    setSelectedLatitude(null);
    setSelectedLongitude(null);
  };

  // Render loading text while waiting for current location
  if (!currentLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleAddPin}
      >
        {pins.map((pin, index) => (
          <Marker key={index} coordinate={pin.coordinate}>
            <Callout>
              <TouchableOpacity onPress={() => Alert.alert(pin.locationName, pin.description)}>
                <View>
                  <Text>{pin.locationName}</Text>
                </View>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalContainerHeader}>Lisää kalastuspaikka</Text>
          <TextInput
            placeholder="Name"
            value={locationName}
            onChangeText={text => setLocationName(text)}
            style={styles.textInputDefault}
          />
          <TextInput
            placeholder="Location"
            value={locationAddress}
            onChangeText={text => setLocationAddress(text)}
            style={styles.textInputDefault}
          />
          <TextInput
            placeholder="Description"
            value={descriptionText}
            onChangeText={text => setDescriptionText(text)}
            style={styles.textInputDescription}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddSpot} style={styles.addButton}>
              <Text style={styles.buttonText}>Add Spot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerHeader: {
    color: 'white',
    fontSize: 21,
    marginBottom: 30,
    textAlign: 'center'
  },
  textInputDefault: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  textInputDescription: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 130,
    marginTop: 50,
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: 'red',
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default MapScreen;
