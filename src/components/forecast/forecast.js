import React, {Component} from 'react';
import './forecast.css';
import Weatherapi from './../../api/api'
import position from './../../api/position'
import Loading from './../loading/loading'
import Error from './../errors/error'

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
        error: false
    }

    onError = (err) => {
        this.setState({
            error: true
        })
    }

    async updateInfo() {
        let city = null;
        await this.Position.getSity()
        .then((info) => {
            city = info.state;
        })
        await this.WeatherApi.getCyti(city)
        .then((citys) => {
            this.setState(() => {
                console.log(citys)
                return  { weather:{ temperature: citys.temperature, city: citys.city, country: citys.country }, loading: false}
            })
        })
        .catch(this.onError)
    }

    constructor(){
        super();
        this.updateInfo()
    }

    render(){

        const { weather , loading, error } = this.state;
        const load = loading ? <Loading /> : null;
        const content = !(loading || error) ? <Viewinfo weather = {weather} /> : null;
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

const Viewinfo = ({weather}) => {
    const { temperature, city, country } = weather;
    return(
        <React.Fragment>
            <div>
                Сейчас в { country }, а точнее в { city }, { temperature } градусов
            </div>
        </React.Fragment>
    );
}