import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./form";

const generateForm = () => {
  console.log("hello");
  const Form = `
  <form>
    <input placeholder="...Enter your name" type="text" />
    <input placeholder="Enter Phone Number" type="number" />
    <select>
      <option value="Cash">Cash</option>
      <option value="Card">Card</option>
    </select>
  </form>`;
  return <div>{Form}</div>;
};

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

  const addToCart = ({ id }) => {
    const payload = res.filter((item) => item.id === id);
    console.log(id);

    const config = {
      url: "db2.json",
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

  const filterCarsByPrice = (price) => {
    return setRes(res.filter((items, i) => res[i].price <= price));
  };

  const filterByType = (type) => {
    return setRes(res.filter((items, i) => res[i].type === type));
  };

  const filterByYear = (year) => {
    return setRes(res.filter((items, i) => res[i].year <= year));
  };

  const handleSubmit = (e) => {
    return e.preventDefault();
  };

  return (
    <div className="App" style={{ width: "70%", margin: "auto" }}>
      <h2>Welcome to Jaswant Car Show-Room</h2>
      <div>
        Filter By Price :{" "}
        <button onClick={() => filterCarsByPrice(1400000)}>
          Cars Below RS 1.4 crore
        </button>{" "}
        <button onClick={() => filterCarsByPrice(2100000)}>
          Cras below RS 2.1 crore
        </button>
      </div>
      <div>
        Filter By Type :{" "}
        <button onClick={() => filterByType("SUV")}>SUV</button>{" "}
        <button onClick={() => filterByType("MPV")}>MPV</button>
        <button onClick={() => filterByType("SEDAN")}>SEDAN</button>
      </div>
      <div>
        Filter By Year :{" "}
        <button onClick={() => filterByYear(2010)}> Before 2010 </button>
        <button onClick={() => filterByYear(2015)}> Before 2015 </button>
        <button onClick={() => filterByYear(2021)}> Before 2021 </button>
      </div>
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
              key={cars.id}
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
                >
                  Order Now
                </button>
              </div>
            </div>
          );
        })
      )}
      <h3>Use Details</h3>
      <Form id="form" onSubmit={handleSubmit} />
      <button>SUBMIT</button>
    </div>
  );
}
