import { useDispatch, useSelector } from "react-redux";
import { loadByQuery } from "../features/weatherSlice";
import WeatherSearchSection from "./WeatherSearchSection";
import { useState } from "react";
import { COUNTRYS } from "../constants/countries";

export default function SidebarSection() {
  const dispatch = useDispatch();
  const { current } = useSelector((s) => s.weather);

  const [filter, setFilter] = useState(""); // строка поиска

  const filteredCountries = COUNTRYS.filter((c) =>
    c.toLowerCase().startsWith(filter.toLowerCase())
  );

  const { humidity, wind, clouds, rain } = current;

  return (
    <div className="glass">
      <aside className="sidebar">
        <div className="search__wrap">
          <WeatherSearchSection onSearch={setFilter} />
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {filteredCountries.map((c) => (
              <li key={c} className="sidebar__menu__li">
                <button
                  className="sidebar__menu__li_btn"
                  onClick={() => dispatch(loadByQuery(c))}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__divider" />

        <div className="sidebar__details">
          <div className="sidebar__section_title">Weather Details</div>
          <ul className="sidebar__stats">
            <li>
              <span className="sidebar__stats_span">Cloudy</span>
              <b className="sidebar__stats_b">{clouds}%</b>
            </li>
            <li>
              <span className="sidebar__stats_span">Humidity</span>
              <b className="sidebar__stats_b">{humidity}%</b>
            </li>
            <li>
              <span className="sidebar__stats_span">Wind</span>
              <b className="sidebar__stats_b">{wind} м/с</b>
            </li>
            <li>
              <span className="sidebar__stats_span">Rain</span>
              <b className="sidebar__stats_b">{rain || 0} мм</b>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
