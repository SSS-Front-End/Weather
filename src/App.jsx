import SidebarSection from "./Components/SidebarSection"
import WeatherViewSection from "./Components/WeatherViewSection"
import { useSelector } from "react-redux";

function App() {
  const weather = useSelector((state) => state.weather.current);

  const getBackground = () => {
    if (!weather) return "linear-gradient(to top, #add8e6, #197dd4)"; // дефолт

    switch (weather.icon.slice(0, 2)) {
      case "01": 
        return "linear-gradient(to top, #87ceeb, #197dd4)";
      case "02": 
        return "linear-gradient(to top, #6fbbe0, #145a9c)";
      case "03": 
      case "04":
        return "linear-gradient(to top, #5a9bb5, #0d3a63)";
      case "09": 
      case "10":
        return "linear-gradient(to top, #4a7a99, #0b2e4c)";
      case "11": 
        return "linear-gradient(to top, #2f4a66, #081b2c)";
      case "13": 
        return "linear-gradient(to top, #cfe8f7, #6ca6d8)";
      case "50":
        return "linear-gradient(to top, #b0c4de, #5a7d9a)";
      default:
        return "linear-gradient(to top, #add8e6, #197dd4)";
    }
  };

  return (
    <main className="main">
      <div className="main__container" style={{ background: getBackground() }}>
        <WeatherViewSection />
        <SidebarSection />
      </div>
    </main>
  )
}

export default App
