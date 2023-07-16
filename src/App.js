//260abbb6bf864d41577d4e0db08376eb
import './App.css';
import { useState } from 'react';

function DataDiv(props){
  const newData = props.data
  if (Object.keys(newData).length === 0){
    return(    
      <div>
        <p>Loading...</p>
        
      </div>
    )
  }
  else if (Object.keys(newData).length !== 0){
    console.log('kdsigsdjgfis',newData)
    return(
      <div>
        <p>Hello</p>
        <p>country: {newData.city.country}</p>
        city: {newData.city.name}
        <div>
          {newData.list.map((item)=>(
            <p>Time of day: {item.dt_txt} Clouds: {item.clouds.all} WindSpeed: {item.wind.speed} temp: {item.main.temp} humidity: {item.main.humidity} temp_feels_like: {item.main.feels_like}</p>

          ))}
        </div>
      </div>
    )
  }
}

function App() {
  const [city, setInputValue] = useState('');
  const [data, setDataValue] = useState({});
  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=260abbb6bf864d41577d4e0db08376eb`)
      const res_json = await res.json()
      setDataValue(res_json);
    }
    catch (error){
      console.log(`Errror fetching data: ${error}`)

    }
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // console.log(`katarafsdin`,typeof(data))
  return (
    <div className="App">
      <header className="App-header">
        <h1>{'C:\Users\rishi\Documents\js\todo-react\weather\weather\public\icons8-partly-cloudy-day.gif'}What's the Weather?</h1>
        <input placeholder='Enter City....' onChange={handleInputChange}/>
        <button onClick={fetchData}>click me</button>
      </header>
      <DataDiv data={data} />
    </div>
  );
}

export default App;
