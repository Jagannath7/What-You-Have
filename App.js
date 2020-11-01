import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {
  
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [details, setDetails] = useState([{
    description: "Welcome, hope your earnings increase every day.",
    amount: 0
  }])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Text>What You Have</Text>
    
      <TextInput
        placeholder = 'What did you do today?'
        stlye={styles.input} />
      
      <TextInput
        placeholder = 'How much did you earn?'
        stlye={styles.input} />
      
      <Button title = "Add event"/>
     
      
    
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'skyblue',
    borderWidth: 1,
    margin:20
  }
})