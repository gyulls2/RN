import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // 권한 요청은 앱을 실행할 때 한 번만 요청하면 된다.
    const { granted } = await Location.requestForegroundPermissionsAsync();

    // 권한이 허용되지 않았을 때
    if (!granted) {
      setOk(flase);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);
    const { list } = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
      )
    ).json();
    const filteredList = list.filter(({ dt_txt }) =>
      dt_txt.endsWith("03:00:00")
    );
    setDays(filteredList);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View style={styles.day} key={index}>
              <Text style={styles.temp}>
                {parseFloat(day.main.temp).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}

        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    //contentContainerStyle는 flex를 사용하지 않는다.
    // flex: 3,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  description: { fontSize: 60, marginTop: -30 },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  tinyText: {
    fontSize: 30,
  },
});
