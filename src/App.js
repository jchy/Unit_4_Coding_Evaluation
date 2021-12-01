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

  useEffect(() => {
    getData().then((data) => {
      data = data.data.cars;
      console.log(data);
      setRes(data);
    });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <h3>...Loading</h3>
      ) : (
        res.map((cars) => {
          return (
            <div>
              <h3>{cars.name}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}
