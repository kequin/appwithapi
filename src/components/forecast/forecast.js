import React, {Component} from 'react';
import './forecast.css';
import Weatherapi from './../../api/api'
import position from './../../api/position'
import Loading from './../loading/loading'
import Error from './../errors/error'
import Viewinfo from './Viewinfo'

export default class Header extends Component { 

    WeatherApi = new Weatherapi();

    Position = new position();


    state = {
        weather: {
            temperature: null,
            city: null,
            country: null
        },
        loading: true,
        error: false,
        forecast: null
    }

    

    onError = (err) => {
        this.setState({
            error: true
        })
        this.setState({
            loading: false
        })
    }

    async updateInfo() {
        await this.Position.getCity()
        .then((info) => {
            this.setState(() => {
                return {weather:{city:info.state}}
            })
        })
        await this.WeatherApi.getCyti(this.state.weather.city)
        .then((info) => {
            this.setState(() => {
                return  {weather:{temperature: info.current.temp_c, city: info.location.name, country: info.location.country}}
            }) 
            this.setState(() => {
                return {forecast:info.forecast}
            })

            this.setState(() => {
                return {loading:false}
            })
        })
        .catch(this.onError)

    }

    constructor(){
        super();
        this.updateInfo()
    }

    render(){

        const { weather , loading, error, forecast } = this.state;
        const load = loading ? <Loading /> : null;
        const content = !(loading || error) ? <Viewinfo forecast = {forecast} weather = {weather} /> : null;
        const err = error ? <Error /> : null;
        return (
            //типо красивая обертка 
            <div>
                {err}
                {load}
                {content}
            </div>
        )
    }
}