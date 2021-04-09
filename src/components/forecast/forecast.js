import React, {Component} from 'react';
import './forecast.css';
import Loading from './../loading/loading'
import Error from './../errors/error'
import Viewinfo from './viewinfo/Viewinfo'
import './forecast.css'
import Weatherapi from './../../api/api'


export default class Header extends Component { 

    WeatherApi = new Weatherapi();


    state = {
        weather: {
            temperature: null,
            city: 'brest',
            country: null
        },
        loading: true,
        error: false,
        forecast: null,
        default: true
    }



    render(){
        const { forecast, error, loading, weather } = this.props;
        const load = loading ? <Loading /> : null;
        const content = !(loading || error) ? <Viewinfo weather ={weather } forecastday = {forecast}  /> : null;
        const err = error ? <Error /> : null;
        return (
            //типо красивая обертка 
            <div className={'content'}>
                {err}
                {load}
                {content}
            </div>
        )
    }
}