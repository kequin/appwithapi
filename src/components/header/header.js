import React, {Component} from 'react';
import './header.css';
import Weatherapi from './../../api/api'
import position from './../../api/position'

export default class Header extends Component { 

    WeatherApi = new Weatherapi();

    Position = new position();


    state = {
        temperature: null,
        city: null,
        country: null,
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
                return  { temperature: citys.current.temp_c, city: citys.location.name, country: citys.location.country}
            })
        })
    }

    constructor(){
        super();
        this.updateInfo()
    }

    render(){

        const { temperature, city, country } = this.state;


        return(
            <div>
                Сейчас в { country }, а точнее в { city }, { temperature } градусов
            </div>
        )
    }
}