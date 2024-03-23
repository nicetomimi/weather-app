import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div className="weather-button">
      <Button variant="warning">현재위치</Button>{" "}
      <Button variant="warning">강릉</Button>{" "}
      <Button variant="warning">치앙마이</Button>{" "}
      <Button variant="warning">영국</Button>{" "}
      <Button variant="warning">프랑스</Button>{" "}
    </div>
  );
};

export default WeatherButton;
