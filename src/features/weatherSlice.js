import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchByQuery } from "../WeatherApi/weatherApi";

export const loadByQuery = createAsyncThunk("weather/loadByQuery", async (q) => {
    const data = await fetchByQuery(q, "en");
    return normalize(data);
})

const initialState = {
    status: "idle",
    error: null,
    current: null,
    lastQuery: "Tashkent", 
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setLastQuery(state, action) {
            state.lastQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadByQuery.pending, (s) => { s.status = "loading"; s.error = null; }) 
            .addCase(loadByQuery.fulfilled, (s, a) => { s.status = "succeeded"; s.current = a.payload; })
            .addCase(loadByQuery.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; });
    },
})

export const { setLastQuery } = weatherSlice.actions;
export default weatherSlice.reducer;

function normalize(d) {
    return {
        city: d.name,
        country: d.sys?.country,
        temp: Math.round(d.main.temp),
        feels: Math.round(d.main.feels_like),
        humidity: d.main.humidity,
        clouds: d.clouds?.all ?? 0,
        wind: Math.round(d.wind?.speed ?? 0),
        condition: d.weather?.[0]?.description || "",
        icon: d.weather?.[0]?.icon || "01d",
        dt: d.dt * 1000,
        rain: (d.rain && (d.rain["1h"] ?? d.rain["3h"])) || 0,
    };
};