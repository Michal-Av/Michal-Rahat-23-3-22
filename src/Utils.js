import axios from 'axios'

const API_KEY = '0r6bDyXeQJqMu2lkr3TraNZxdGcWrAbz'; 
const URL_AUTO = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete/";
const URL_CURRENT = "http://dataservice.accuweather.com/currentconditions/v1/215854";
const URL_5days = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854";

let getAutocomplete = async (str) =>
{
    let resp =  await axios.get(URL_AUTO, { params: { apikey : API_KEY, q: str } });

    return resp.data;
}

let getCurrentCity = async (id_location) =>
{
    let resp =  await axios.get(URL_CURRENT, { params: { apikey : API_KEY } });
    let city = resp.data[0];
    
    return city;
}

let get5Days = async (id_location) =>
{
    let resp =  await axios.get(URL_5days, { params: { apikey : API_KEY } });
    let city = JSON.parse(resp.data);
    
    return city;
}

export default {getAutocomplete, getCurrentCity, get5Days}