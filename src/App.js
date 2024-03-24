import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1. "앱이 실행되자마자" (첫화면) 현재위치 기반의 날씨정보박스 (도시, 섭씨, 화씨, 상세정보)
//2. 위치 버튼 (현재위치, 다른도시들) 5개
//3. 버튼을 누를때마다 도시별 날씨가 나온다.
//4. 현재위치 버튼을 누르면 현재위치 기반의 날씨가 나온다. (첫화면)
//5. 로딩스피너

function App() {
  //에러
  const [apiError, setAPIError] = useState("");

  //로딩스피너
  let [loading, setLoading] = useState(false);

  //5. 가져온 데이터를 넣어주는 작업. useState 만들어주기.
  const [weather, setWeather] = useState(null);
  //setWeather 는 API에서 data가져오는 부분에 data를 매개변수로 하는 함수로 넣어주고
  //weather는 props로 WeatherBox에 넣어준다.

  //6. 버튼 작업. Array 만들기.
  const cities = ["Seoul", "London", "Paris", "Tokyo", "Bangkok"];
  //cities를 WeatherButton에 넣어준다.

  //7. 버튼 클릭할 때마다 정보 가져와주는 작업. WeatherButton.js 컴포넌트에 만들지 않고 부모인 App에 만들어서 자식에게 적용시켜주기.
  const [city, setCity] = useState("");
  //setCity는 WeatherButton에 넣어준다.

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=kr&appid=caef519f0e914db582c15f032b9ec408&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getWeatherByCity()
  // }, [city]);
  // 이것땜에 에러발생! useEffect는 하나로 만들어줘야한다. useEffect에 합쳐주기.

  //1."앱이 실행되자마자" lifecycle의 "useEffect"(react hook), 콜백함수와 어레이를 받는 함수, 여기서 현재위치 가져오는 getCurrentLocation 함수 만들어주고 2번으로
  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);
  //합쳐주면서 if로 상황 설정해주기.

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
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=caef519f0e914db582c15f032b9ec408&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 4.날씨박스랑 버튼 컴포넌트 만들어주기 */}
      {loading ? (
        <div className="container">
          <ClipLoader color="#000000" loading={loading} size={150} />{" "}
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} city={city} />
        </div>
      )}
    </div>
  );
}

export default App;
