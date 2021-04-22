import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Forecast from './components/forecast/forecast';
import Header from './components/header/header';
import Weatherapi from './api/api';
import Position from './api/position'

export default class App extends Component {
    
    WeatherApi = new Weatherapi();
    Position = new Position();
    


    state = {
        weather: {
            city: null,
            temp_c: null,
            country: null
        },
        loading: true,
        error: false,
        forecast: null,
        city:null,

    }


    constructor(){
        super();
        this.SearchCity();
        this.startcity();
    }

    startcity = async() => {
        let city;
        await this.Position.getCity()
            .then((info) => {
                city = info.city;
            })
            .catch(this.onError);   
        await this.updateInfo(city);
    }
    
    updateInfo = (city) => {
        this.WeatherApi.getCyti(city)
        .then((info) => {
            
            this.setState({error: false})
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
        this.setState(() => {
                return { loading: false }
        })
        this.setState(() => {
             return { error: true }
        })
    }
        


    Search = (city) => {
        this.updateInfo(city)
    }

    MapSearch =  () => {
        this.updateInfo(this.state.city);
    }

    render() {
        
        const {error, weather,  forecast, loading} = this.state;

        // const load = loading ? <Loading /> : null;
        // const content = !(loading || error) ? <Viewinfo forecast = {forecast} weather = {weather} /> : null;
        // const err = error ? <Error /> : null;

        return(
            <div style={{width: '95%', margin: '0 auto'}}>
                <Header MapSearchCity = {this.MapSearch} Searchcity = {this.Search}/>
                <Forecast error = {error} weather = {weather} loading = {loading} forecast = {forecast} />
            </div>
        )
    }
}




ReactDOM.render(<App/>, document.getElementById('root'));

reportWebVitals();