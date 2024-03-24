import React from "react";
import Button from 'react-bootstrap/Button';

const WeatherButton = ({ cities, setCity, city}) => {
  return (
    <div>
       <div className="weather-button">
      <Button variant={city === "" ?"dark":"warning"} onClick={() => setCity('')}>
        현재위치
      </Button>
      {/* 자바스크립트 바로 쓸때는 {} 쓰면된다. map함수 써서 배열을 가져온다. */}
      {cities.map((item) => (
        <Button variant={city === item ?"dark":"warning"} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>

    </div>
  );
};

export default WeatherButton;
