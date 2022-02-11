import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, StatusBar, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [syote, setSyote] = useState('');
  const [tulos, setTulos] = useState('');
  const [valittu, setValittu] = useState(0); //Picker
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://raw.githubusercontent.com/jajusu/HTML-harkat/master/sampledata.json`)
    //http://api.exchangeratesapi.io/v1/latest?access_key=  //Oma key täynnä. Jätetty pois GitHubista ja tilalla käytetään saman muotoista sampledataa.
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.rates))
    .catch(error => { 
        Alert.alert('Error', error); 
    });
    console.log("ok");
    console.log(Object.keys(repositories));
  }

  useEffect(() => { // regular non-async function passed to useEffect
    // define async function expression that makes the asynchronous calls...
    (async () => {
    const result = await getRepositories(); // call my async function
    //setRepositories(result);
    })(); // ...and call it immediately
    }, []);

  const laske = () => {
    console.log(valittu)
    console.log(syote)
    let summa=syote/valittu;
    setTulos(summa.toFixed(2));
  }

  return (
    <View style={styles.container}>
      <Image style={styles.kuva} source={require('./euro.jpg')} />
      <StatusBar hidden={true} />
      <Text style={styles.teksti}>{tulos} €</Text>
      <View style={styles.inputJaPicker}>
        <TextInput style={styles.inputti}
          autoFocus={true}
          onChangeText={text => setSyote(text)}
          keyboardType={'numeric'}
        />
        <Picker style={styles.pickeri}
            selectedValue={valittu}
            onValueChange={(itemValue, itemIndex) =>
              setValittu(itemValue)
            }
        >
          {Object.keys(repositories).map((object, i) => 
            <Picker.Item label={object} value={repositories[object]} key={i} />
          )}
        </Picker>
      </View>
      <Button title="Convert" onPress={laske} />
        {/* <Button title="Find" onPress={getRepositories} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 inputJaPicker: {
   flexDirection: 'row',
   paddingBottom: 5
 },
 inputti:{
  fontSize: 18, 
  width: 100,
  borderBottomColor: 'green',
  borderBottomWidth: 2
 },
 pickeri:{
  borderWidth: 1, 
  borderColor: 'red', 
  borderRadius: 4,
  fontSize: 18, 
  width: 120
 },
 teksti:{
   fontSize:30
 },
 kuva:{
  width:200,
  height:200
}

});