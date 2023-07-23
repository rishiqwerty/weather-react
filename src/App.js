import './App.css';
// import '../public/icons8-partly-cloudy-day.gif'
import { useState } from 'react';
import clouds from './imgs/clouds.gif';
import humid from './imgs/humidity.gif';
import temp from './imgs/temperature.gif';
import feelslike from './imgs/pcr.gif';
import windspeed from './imgs/wind-turbine.gif';
import notfound from './imgs/error-404.png';


function DataDiv(props){
  const newData = props.data
  if (newData === undefined || newData === ''){
    return(<></>)
  }
  if (typeof(newData) === "string"){
    return(    
      <div className='d-flex flex-column align-items-center'>
        <p className='text-center' color='red'>Not Found</p>
        <img src={notfound} width={200} alt='not found' />

      </div>
    )
  }
  if (Object.keys(newData).length !== 0){
    console.log('kdsigsdjgfis',newData)
    return(
      <div className='container'>
      <h2 className='text-center my-4'>{newData.city.country}</h2>
      <h3 className='text-center mb-4'>{newData.city.name}</h3>
      <div className='row'>
        {newData.list.map((item, index) => (
          <div key={index} className='col-md-3'>
            <div className='card mb-3'>
              <div className='card-body'>
                <h5 className='card-title'>{item.dt_txt}</h5>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={temp} width={50} alt='temp' />
                    <p>{Number((item.main.temp - 273.15).toFixed(2))}°C</p>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={feelslike} width={50} alt='feels_like' />
                    <p>{(Number(item.main.feels_like - 273.15).toFixed(2))}°C</p>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={humid} width={50} alt='feels_like' />
                    <p>{item.main.humidity}%</p>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={windspeed} width={50} alt='feels_like' />
                    <p>{(Number(item.wind.speed * 18/5).toFixed(2))}</p>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={clouds} width={50} alt='feels_like' />
                    <p>{item.clouds.all}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
}

function App() {
  const [city, setInputValue] = useState('');
  const [data, setDataValue] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      if (!city){
        alert("Please enter any city name.")
        setDataValue()
        return
      }
      setLoading(true);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
      const res_json = await res.json()
      console.log(res_json)
      if (res_json.cod === '200'){
        setDataValue(res_json);
        setLoading(false); 
      }
      else{
        setDataValue('Not Found');
        setLoading(false); 
      }
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
    <div className="m-2">
      <header className="d-flex flex-column align-items-center mt-5">
        <img src='./icons8-partly-cloudy-day.gif' alt='logo' />
        <h1 className='my-4'>What's the Weather?</h1>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter City...'
            onChange={handleInputChange}
          />
          <button
            className='btn btn-primary'
            onClick={fetchData}
          >
            Click me
          </button>
        </div>
      </header>
      {loading ? (<div className='d-flex flex-column align-items-center'>Loading... </div>) : (<DataDiv data={data} />)}
    </div>
  );
}

export default App;
