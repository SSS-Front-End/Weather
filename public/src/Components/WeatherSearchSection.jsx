import { useDispatch, useSelector } from "react-redux";
import { setLastQuery } from "../features/weatherSlice";
import { useState } from "react";
import searchIcon from "../images/search-removebg-preview.png"

export default function WeatherSearchSection({ onSearch }) {
  const dispatch = useDispatch();
  const last = useSelector((s) => s.weather.lastQuery);
  const [q, setQ] = useState(last || "");

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    dispatch(setLastQuery(q.trim()));
    onSearch(q.trim()); // сообщаем наверх
  };

  return (
    <section className="weatherSearch">
      <form onSubmit={submit} className="search line" role="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search for country"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onSearch(e.target.value); // фильтруем при вводе
          }}
          aria-label="search"
        />
        <button className="search__btn"><img src={searchIcon} alt="search" className="search__btn_img" /></button>
      </form>
    </section>
  );
}
