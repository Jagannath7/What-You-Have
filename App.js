import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {
  
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState(0)
  const [events, setEvents] = useState([{
    description: "Welcome, hope your earnings increase every day.",
    amount: 0
  }])

  useEffect(() => {
   setTotal(events.reduce((total, events) => total+Number(events.amount), 0))
  }, [events])

  const addEvent = () => {
    setEvents([...events, {
      description: description,
      amount: amount
    }])
    setDescription('')
    setAmount('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text>What You Have</Text>
    
      <TextInput
        placeholder = 'What did you do today?'
        stlye = {styles.input}
        value={description}
        onChangeText = {text => setDescription(text)}
      />
      
      <TextInput
        placeholder = 'How much did you earn?'
        stlye={styles.input}
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      
      <Button title="Add Event"
        onPress = {addEvent}
      />
     
      <Text>Latest Event: {events[events.length - 1].description}</Text>
      <Text>Latest Earnings: ₹ {events[events.length -1].amount}</Text>
      
      
      <View>
        <Text>Total Income: ₹{total}</Text>
      </View>
    
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