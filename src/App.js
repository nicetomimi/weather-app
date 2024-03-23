import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

//1. "앱이 실행되자마자" (첫화면) 현재위치 기반의 날씨정보박스 (도시, 섭씨, 화씨, 상세정보)
//2. 위치 버튼 (현재위치, 다른도시들) 5개
//3. 버튼을 누를때마다 도시별 날씨가 나온다.
//4. 현재위치 버튼을 누르면 현재위치 기반의 날씨가 나온다. (첫화면)
//5. 로딩스피너

function App() {
  //5. 가져온 데이터를 넣어주는 작업. useState 만들어주기.
  const [weather, setWeather] = useState(null);
  //setWeather 는 API에서 data가져오는 부분에 data를 매개변수로 하는 함수로 넣어주고
  //weather는 props로 WeatherBox에 넣어준다.

  //2. getCurrentLocation 함수 만들어 주자. 현재위치 가져와주는 함수 검색해서 적용하기.
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  //3. API 호출. 위치기반으로 날씨 가져와주는 함수 만들어주기.
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=caef519f0e914db582c15f032b9ec408&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  //1."앱이 실행되자마자" lifecycle의 "useEffect"(react hook), 콜백함수와 어레이를 받는 함수, 여기서 현재위치 가져오는 getCurrentLocation 함수 만들어주고 2번으로
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      {/* 4.날씨박스랑 버튼 컴포넌트 만들어주기 */}
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
