import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState([]);

  const getData = () => {
    const config = {
      url: "db.json",
      method: "get"
    };
    return axios(config);
  };

  const addToCart = (id) => {
    const payload = {};

    const config = {
      url: "https://json-server-mocker-masai.herokuapp.com/tasks",
      method: "post",
      data: payload
    };
    return axios(config);
  };

  useEffect(() => {
    getData().then((data) => {
      data = data.data.cars;
      console.log(data);
      setRes(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="App" style={{ width: "70%", margin: "auto" }}>
      <h2>Welcome to Jaswant Car Show-Room</h2>
      {isLoading ? (
        <h3>...Loading</h3>
      ) : (
        res.map((cars) => {
          return (
            <div
              style={{
                display: "flex",
                border: "2px solid white",
                margin: "20px",
                borderRadius: "10px"
                // paddingLeft: "30px"
              }}
            >
              <img src={cars.image} width="300" alt="img" />
              <div style={{ textAlign: "left", paddingLeft: "30px" }}>
                <h3>{cars.name}</h3>
                <h4>Rs. {cars.price}</h4>
                <p>Type : {cars.type}</p>
                <p>MFD Year : {cars.year}</p>
                <button
                  style={{
                    background: "black",
                    color: "white",
                    borderRadius: "10px",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100px",
                    border: "1px solid white"
                  }}
                  id={cars.id}
                  onClick={addToCart}
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
