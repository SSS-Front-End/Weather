import { useSelector } from "react-redux";
import "../Styles/Styles.css";
import iconMap from "../weather_icons/iconMap";

export default function WeatherViewSection() {
  const city = useSelector((s) => s.weather.current?.city);
  const icon = useSelector((s) => s.weather.current?.icon);
  const temp = useSelector((s) => s.weather.current?.temp);
  const { current } = useSelector(s => s.weather);

  const { dt, condition } = current;
  const date = new Date(dt).toLocaleString("en-US", {
    weekday: "long", day: "2-digit", month: "short"
  });

  const localIcon = iconMap[icon] || "/weather-icons/default.png";

  return (
    <section className="weatherViev">
      <h3 className="weatherViev__title">{city ? city : "Город не выбран"}</h3>
      <div className="weatherViev__flex_img">
        <img className="weatherViev__flex_img_img" src={localIcon} alt="weather icon" />
      </div>

      <div className="weatherViev__info">
        <h3 className="weatherViev__info_title">{`${temp} °`}</h3>
        <div className="weatherViev__info__response">
          <h1 className="weatherViev__info_response_country">{city ? city : "Город не выбран"}</h1>
          <p className="weatherViev__info_response_date">{date}</p>
        </div>
        <div className="weatherViev__info__response">
          <img
            className="weatherViev__info__response_img"
            src={localIcon}
            alt="Иконка погоды"
          />
          <p className="weatherViev__info__response_desc">{capitalize(condition)}</p>
        </div>
      </div>
    </section>
  )
}

function capitalize(s){ return s ? s[0].toUpperCase()+s.slice(1) : s; }
