import { createStore } from "redux"

const initialState ={
   comp: "home",
   favorites: [  {
    "LocalObservationDateTime": "2022-03-25T16:13:00+03:00",
    "EpochTime": 1648213980,
    "WeatherText": "Clear",
    "WeatherIcon": 1,
    "Temperature": {
      "Metric": {
        "Value": 20,
        "Unit": "C",
        "UnitType": 17
      },
      "Imperial": {
        "Value": 61,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "LocalizedName": "Tel Aviv"}]
}
function reducer(state = initialState, action)
{
    switch(action.type)
    {
        case "FAVORITE":
            return {...state, comp : "favorite" }
        case "HOME":
            return {...state, comp : "home" }

        case "APPEND":

            let currentList = state.favorites;
            if (!currentList.includes(action.payload)) {
                currentList.push(action.payload);
                return {...state, favorites : currentList 
                }
              }
            else return state;
        case "DELETE": 
            return {  // returning a copy of orignal state
                ...state, //copying the original state
                favorites: state.favorites.filter(fav => fav.id !== action.payload) 
                                        // returns a new filtered todos array
            }
        default:
            return state;
    }
}

export const store = createStore(reducer);