import React, {Component } from 'react';
import './index.css';

export default class Tiles extends Component {

    state = {
        blocks: [
            false,
            false,
            false
        ]
    }

    fullinfo1 = (e) => {
        this.setState(() => {
            return { blocks:[false,false,false] }
        })
        // console.log(e.target.parentNode.parentNode.className)
        if(e.target.value){
            const value = e.target.value
            console.log(value)
            if(!this.state.blocks[value]){
                let blocks = [false,false, false]
                blocks[value] = true;
                console.log(blocks)
                this.setState(() => {
                    return { blocks:blocks }
                })
            }
        }
        else {
            if(e.target.className === 'krestic'){
                this.setState(() => {
                    return { blocks:[false,false,false] }
                })
            }
        }
    }


    size_control = (number_in_array) => {
        let styles = '';
        if(this.state.blocks[number_in_array]){
            styles = 'info active'
        } else {
            styles = 'info default'
        }

        return styles;
    }

    krest = (number_in_array) => {
        let style;
        
        if(this.state.blocks[number_in_array]){
            style = {
                display:''
            }

        } else {
            style = {
                display:'none'
            }
        }
        return style;
    }


    // сдесь сделай функцию которая проверяет state и ставит margin-left: тут значение%;
    // margin-left: -50%; для 

    render(){

        const {weather, forecastday, id} = this.props;
        // console.log(forecastday)
        console.log()
        let date;
        switch(true){
            case id === 0:
                date = 'Сегодня'
                break
            case id === 1:
                date = 'Завтра'
                break
            case id === 2:
                date = 'Послезавтра'
                break
            default:
                date = ''
        }
        return(

            <React.Fragment>
                    <div style={{transition: '.4s'}} onClick={this.fullinfo1} className={this.size_control(id)}>
                        <div>
                            <div style={this.krest(id)} className='krestic'></div>
                            <h3 className='h3'>{date} в { weather.city }, {weather.country}</h3> 
                            <p className='p'>{ forecastday[id].day.avgtemp_c } градусов</p>
                            <div className='hide'>
                                <span className='sky'>
                                    <h4>{forecastday[id].day.condition.text}</h4>
                                    <img src={`https://${forecastday[id].day.condition.icon}`} alt="weather"></img>
                                </span>
                            </div>
                            <button onClick={this.fullinfo1} value={id}>Полная информация</button>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}