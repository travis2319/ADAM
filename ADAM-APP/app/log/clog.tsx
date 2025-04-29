// ...existing imports
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {  useNavigation, router } from 'expo-router';
import { useRoute, RouteProp } from '@react-navigation/native';
import { DateData } from 'react-native-calendars'; // Import the correct type

const today = moment();
const startOfWeek = moment().startOf('week').add(1, 'day'); // Start from Monday

export default function CarLogScreen() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [weekDates, setWeekDates] = useState<moment.Moment[]>([]);
  const [showMonthlyCalendar, setShowMonthlyCalendar] = useState(false);
  const [barsData, setBarsData] = useState<{ [key: string]: { value: number; label: string; date: moment.Moment }[] }>({});

  const getBarsForWeek = (weekStartDate: moment.Moment) => {
    const bars = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = weekStartDate.clone().add(i, 'days');
      bars.push({
        value: Math.floor(Math.random() * 120), // Random data for illustration
        label: dayDate.format('ddd'),
        date: dayDate,
      });
    }
    return bars;
  };
  const navigation = useNavigation();
  type RouteParams = {
    params: {
      selectedDay: string;
    };
  };
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { selectedDay } = route.params;


  useEffect(() => {
    const startOfWeek = selectedDate.clone().startOf('isoWeek');
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, 'days'));
    }
    setWeekDates(days);

    const weekKey = startOfWeek.format('YYYY-MM-DD');
    if (!barsData[weekKey]) {
      const newBarsData = getBarsForWeek(startOfWeek);
      setBarsData((prevData) => ({
        ...prevData,
        [weekKey]: newBarsData,
      }));
    }
  }, [selectedDate]);

  const bars = barsData[selectedDate.clone().startOf('isoWeek').format('YYYY-MM-DD')] || [];

  const selectedBar = bars.find((bar) => bar.date.isSame(selectedDate, 'day'));
  const totalKm = selectedBar ? selectedBar.value : 0;
  const avgSpeed = selectedBar ? Math.floor(40 + (totalKm % 30)) : 0;
  const timeInHours = avgSpeed > 0 ? totalKm / avgSpeed : 0;
  const hrs = Math.floor(timeInHours);
  const mins = Math.round((timeInHours - hrs) * 60);

  const BackArrow = () => (
    <View
      style={{
        width: 12,
        height: 12,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: '#333',
        transform: [{ rotate: '45deg' }],
      }}
    />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F0F8FF', padding: 20 }}>
      {/* Header */}
      <View style={{ position: 'relative', marginBottom: 20 }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
          onPress={() => router.back()}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#D9F0F7',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BackArrow />
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Car Log</Text>
        </View>
      </View>

      {/* Week Row */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Daily log</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between'}}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDate(date)}
            disabled={date.isAfter(today, 'day')}
            style={{
              alignItems: 'center',
              padding: 8,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: selectedDate.isSame(date, 'day') ? 'lightblue' : 'white',
              backgroundColor: selectedDate.isSame(date, 'day') ? '#0077B6' : 'transparent',
              marginHorizontal: 3,
              opacity: date.isAfter(today, 'day') ? 0.3 : 1,
            }}
          >
            <Text style={{ fontSize: 12, color: '#555' }}>{date.format('ddd')}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: selectedDate.isSame(date, 'day') ? 'white' : 'black',
              }}
            >
              {date.format('D')}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={{ marginLeft: -30, marginTop: -100 }} onPress={() => setShowMonthlyCalendar(!showMonthlyCalendar)}>
          <Ionicons name="calendar" size={24} color="#0077B6" />
        </TouchableOpacity>
      </View>

      {/* Monthly Calendar */}
      {showMonthlyCalendar && (
        <Calendar
          current={selectedDate.format('YYYY-MM-DD')}
          maxDate={moment().format('YYYY-MM-DD')}
          onDayPress={(day: { dateString: string; day: number; month: number; year: number }) => {
            setSelectedDate(moment(day.dateString));
            setShowMonthlyCalendar(false);
          }}
          markedDates={{
            [selectedDate.format('YYYY-MM-DD')]: {
              selected: true,
              marked: true,
              selectedColor: '#0077B6',
            },
          }}
          style={{ marginTop: 10, borderRadius: 10 }}
          theme={{
            backgroundColor: '#F0F8FF',
            calendarBackground: '#E6F7FF',
            selectedDayBackgroundColor: '#0077B6',
            selectedDayTextColor: '#fff',
            todayTextColor: '#0077B6',
            dayTextColor: '#333',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#0077B6',
            monthTextColor: '#0077B6',
            textMonthFontWeight: 'bold',
          }}
        />
      )}

      {/* Bar Chart */}
      <View style={{ backgroundColor: '#E6F7FF', padding: 10, borderRadius: 10, marginTop: 20 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold', fontSize:16 }}>car driven</Text>
        <View style={{ height: 200, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {bars.map((bar, index) => {
            const isFutureDate = bar.date.isAfter(today, 'day');
            const isSelectedDay = bar.date.isSame(selectedDate, 'day');
            return (
              <TouchableOpacity
                key={index}
                disabled={isFutureDate || !isSelectedDay}
                onPress={() => {
                  if (!isFutureDate && isSelectedDay) {
                    router.push('../../log/dailymeter');
                  }
                }}
                style={{ alignItems: 'center', flex: 1 }}
              >
                <View
                  style={{
                    height: isFutureDate ? 0 : bar.value * 1.5,
                    width: 35,
                    backgroundColor: isSelectedDay && !isFutureDate ? 'white' : '#0077B6',
                    marginBottom: 5,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30
                  }}
                />
                <Text style={{ fontSize: 12 }}>{bar.label}</Text>
                <Text style={{ fontSize: 12 }}>{isFutureDate ? 'N/A' : `${bar.value}km`}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ✅ Dynamic Stats */}
      <View style={{ backgroundColor: '#E6F7FF', borderRadius: 10, padding: 20, marginTop: 20,height: 100 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <Text style={{ fontWeight: 'bold' }}>total time driven</Text>
          <Text>{totalKm > 0 ? `${hrs} hr ${mins} min` : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>average speed</Text>
          <Text>{totalKm > 0 ? `${avgSpeed} kmph` : 'N/A'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
