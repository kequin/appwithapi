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
        let city; // ,countrycode
        await this.Position.getCity()
            .then((info) => {
                console.log(info)
                city = info.city;
                // countrycode = info.country_code;
                if(city === 'Null' || city === 'null' || city === null){
                    city = info.country_name;
                    alert('что то не так с нашей api, выберится столица страны в которой этот город');
                }
            })
            .catch(this.onError);
        await this.updateInfo(city);
    }
    
    updateInfo = (city) => {

        // .then(function (data) {
        //     console.log(data);
        //     console.log(Math.round(data.main.temp - 273));
        //     console.log(data.weather[0]['description']);


        this.WeatherApi.getCyti(city)
        .then((info) => {
            let forecast = info.forecast.forecastday;
            this.setState({error: false})
            this.setState(() => {
                return  {weather:{temp_c: info.current.temp_c, city: info.location.name, country: info.location.country}}
            })

            this.setState(() => {
                return { forecast:forecast }
            })

            this.setState(() => {
                return {loading:false}
            })
        })
        .catch(this.onError)

    }
    SearchCity = () => {
        let city;
        this.Position.getCity()
        .then((info) => {
            city = info.city;
                if(city === 'Null' || city === 'null' || city === null){
                    city = info.country_name;
                    alert('что то не так с нашей api, выберется столица страны в которой этот город');
                }
            this.setState({city:city});
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