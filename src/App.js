import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [cor, setCor] = useState(0);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      await request();
    };
    fetchDog();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCor(prev => (prev === 360 ? 0 : prev + 30));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  async function request() {
    let newUrl;
    setLoading(true);
    do {
      const res = await axios.get("https://random.dog/woof.json");
      newUrl = res.data.url;
    } while (!newUrl.match(/\.(jpg|jpeg|png|gif)$/i));

    setLink(newUrl);
    setLoading(false);
  }

  return (
    <div className="App" style={{ backgroundColor: `hsl(${cor}, 50%, 50%)` }}>
      <div className="container">
        {link && <img src={link} alt="random dog" onError={() => request()} />}
        <div onClick={request} className="button-container">
          {loading ? <div className="loader" /> : <button  className="btn">OUTRO!!</button>}
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
