import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './components/header/header';
import Forecast from './components/forecast/forecast';
import Header from './components/header/header';
import Weatherapi from './api/api'
import position from './api/position'



export default class App extends Component {
    
    WeatherApi = new Weatherapi();

    Position = new position();


    state = {
        weather: {
            city: null,
            temp_c: null,
            country: null
        },
        loading: true,
        error: false,
        forecast: null,
        city:null
    }


    constructor(){
        super();
        this.SearchCity();
        this.startcity();
    }

    startcity = () => {
        const array = ['Moskow', 'Brest', 'Poland', 'Itali', 'USA', 'Mexico', 'London', 'France', 'Berlin'];
        const random = array[Math.floor(Math.random() * array.length)];
        this.updateInfo(random);
    }

    updateInfo = (city) => {
        this.WeatherApi.getCyti(city)
        .then((info) => {
            this.setState({
                error: false})
            this.setState(() => {
                return  {weather:{temp_c: info.current.temp_c, city: info.location.name, country: info.location.country}}
            }) 

            this.setState(() => {
                return { forecast:info.forecast.forecastday }
            })

            this.setState(() => {
                return {loading:false}
            })
        })
        .catch(this.onError)

    }
    SearchCity = () => {

        this.Position.getCity()
        .then((info) => {
            this.setState({city:info.city});
        })
        .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true
        })
        this.setState({
            loading: false
        })
    }


    Search = (city) => {
        this.updateInfo(city)
    }

    MapSearch =  () => {
        
        this.updateInfo(this.state.city);
    }

    render() {
        
        const {weather,  forecast, loading, error} = this.state;
        // const load = loading ? <Loading /> : null;
        // const content = !(loading || error) ? <Viewinfo forecast = {forecast} weather = {weather} /> : null;
        // const err = error ? <Error /> : null;

        return(
            <div>
                <Header MapSearchCity = {this.MapSearch} Searchcity = {this.Search}/>
                <Forecast weather = {weather} loading = {loading} error = {error} forecast = {forecast} />
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('root'));

reportWebVitals();