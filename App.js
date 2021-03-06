import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

export default function App() {
  
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([
    { date: moment().format('LL'), amount: 2000 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 2500 },
    { date: moment().subtract(2, 'days').format('LL'), amount: 3000 },
    { date: moment().subtract(3, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(4, 'days').format('LL'), amount: 4000 },
    { date: moment().subtract(5, 'days').format('LL'), amount: 4000 },
    { date: moment().subtract(5, 'days').format('LL'), amount: 6000 },
    { date: moment().subtract(5, 'days').format('LL'), amount: 4000 }
     ])
  const [events, setEvents] = useState([{
    description: "Welcome, hope your earnings increase every day.",
    amount: 0,
    timestamp: new Date()
  }])
  const [transformedData, setTransformedData] = useState([])

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, 'date')))
  }, [data])

  useEffect(() => {
   setTotal(events.reduce((total, events) => total+Number(events.amount), 0))
  }, [events])

  const groupBy = (array, key) => 
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})

  const addEvent = () => {
    setEvents([...events, {
      description: description,
      amount: amount,
      timestamp: new Date()
    }])
    setDescription('')
    setAmount('')
  }

  const getDates = () => data.map(pair => pair.date)
  const getAmounts = () => transformedData.map(pair => pair.amount)
  const transformData = (groupedData) => {
    const transformedArray = []
    Object.entries(groupedData).forEach(entry => {
      const total = entry[1].reduce((total,pair)=> total +pair.amount, 0)
      transformedArray.push({data: entry[0], amount: total})
    })
    return transformedArray
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text>What You Have</Text>

      <View>
        <Text>Earnings Graph</Text>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts()
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="₹"

          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

    
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
        onPress={addEvent}
        disabled = {!description || !amount}
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