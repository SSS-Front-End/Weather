const API_KEY = import.meta.env.VITE_OWM_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchByQuery(q, lang = "ru") {
    const url = `${BASE}/weather?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric&lang=${lang}`;
    const response = await fetch(url)
    if (!response.ok) throw new Error("Страна не найдена");
    return response.json();
}