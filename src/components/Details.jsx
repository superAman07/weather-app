import axios from "axios";
import { useEffect, useState } from "react"; 
import Footer from "./Footer";

function Details() {
    const [city, setCity] = useState("");
    const [tempCity, setTempCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [aqi, setAqi] = useState(null);

    function SettingInput() {
        if (tempCity.trim()) {
            setCity(tempCity);
        }
    }

    const getWeatherData = async (city) => {
        try {
            const geoResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b7ed94d4f255b7f80a9afa9bc0642849&units=metric`);
            const { lat, lon } = geoResponse.data.coord;
            setWeatherData(geoResponse.data); 

            const aqiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=b7ed94d4f255b7f80a9afa9bc0642849`);
            setAqi(aqiResponse.data.list[0].main.aqi);
        } catch (error) {
            console.log("Error fetching weather or AQI data: ", error);
        }
    };

    useEffect(() => {
        if (city) {
            getWeatherData(city);
        }
    }, [city]);

    return (
        <div className="flex flex-col min-h-screen bg-[#252525] text-gray-300">
            <header className="flex justify-center text-center text-4xl font-bold text-amber-400 pt-5 px-4">
                Get Real-Time Weather and AQI Information by City/Country Name
            </header>
            <div className="flex justify-center pt-16 px-4">
                <div className="w-full max-w-lg shadow-md">
                    <input 
                        value={tempCity} 
                        onChange={e => setTempCity(e.target.value)} 
                        className="w-full pl-3 pr-3 h-12 rounded-md text-gray-700 text-lg" 
                        placeholder="Enter city name here..."
                    />
                </div>
                <button onClick={SettingInput} className="rounded-lg h-12 w-24 bg-amber-400 hover:bg-amber-300 text-slate-800 ml-2 font-semibold text-lg">
                    Search
                </button>
            </div> 
            <main className="flex flex-col lg:flex-row justify-center items-start lg:items-center pt-8 lg:pt-16 gap-6 lg:gap-24 px-4 lg:px-0 flex-grow">
                <section className="bg-[#333] p-6 rounded-md shadow-md w-full max-w-md text-sm lg:w-[25%]">
                    <h1 className="font-bold text-lg text-amber-400 pb-2">AQI Level Guide</h1>
                    <ul className="space-y-1">
                        <li><strong>1:</strong> Excellent</li>
                        <li><strong>2:</strong> Good</li>
                        <li><strong>3:</strong> Moderate</li>
                        <li><strong>4:</strong> Poor</li>
                        <li><strong>5:</strong> Very Poor</li>
                        <li><strong>6+:</strong> Avoid outdoor activities</li>
                    </ul>
                </section> 
                {weatherData && (
                    <section className="bg-[#333] p-8 rounded-md shadow-md text-lg w-full max-w-2xl lg:w-[50%]">
                        <h1 className="text-4xl font-bold text-amber-400 mb-4">
                            Weather Information for {weatherData.name}
                        </h1>
                        <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
                        <p>🌡️ Feels Like: {weatherData.main.feels_like}°C</p>
                        <p>💧 Humidity: {weatherData.main.humidity}%</p>
                        <p>🌪️ Pressure: {weatherData.main.pressure} hPa</p>
                        <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>🌥️ Weather: {weatherData.weather[0].description}</p>
                        <p className="text-4xl font-semibold mt-4">AQI Level: {aqi}</p>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Details;
