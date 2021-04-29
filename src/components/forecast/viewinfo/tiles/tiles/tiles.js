import React, {Component } from 'react';
import './index.css';
import humiditi from './../../../../../images/pngegg.png';
import arrowup from './../../../../../images/arrowup.png';
import arrowdown from './../../../../../images/arrowdown.png';

export default class Tiles extends Component {

    state = {
        blocks: [
            false,
            false,
            false
        ],
    }

    fullinfo1 = (e) => {
        // console.log(e.target.parentNode.parentNode.className)
        if(e.target.value && e.target.parentNode.className === 'allinfo'){
            const value = e.target.value
            if(!this.state.blocks[value]){
                let blocks = [false,false, false];
                
                blocks[value] = true;
                this.setState(() => {
                    return { blocks:blocks }
                })
            }
        }
    }


    size_control = (openornot) => {
        let styles = '';
        if(openornot){
            styles = 'info active'
        } else {
            styles = 'info default'
        }

        return styles;
    }

    krest = (openornot) => {
        let style;
        
        if(openornot){
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


    visibleelement = (id, openornot) => {
        // const arr = this.state.blocks;
        let clas;
        switch(true){
            case openornot === true:
                clas = 'nothidden';
                console.log(openornot)
                break;
            case openornot === false:
                clas = 'hide';
                break;
            default:
                clas = 'hide';
        }
        return clas;
    }

    render(){

        const {weather, forecastday, closeAll, open, id, setOpen} = this.props;

        const forecast = forecastday[id].day;
        console.log(forecast);

        
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
                    <div style={{transition: '.4s'}} onClick={this.fullinfo1} className={this.size_control(open)}>
                        <div style={this.krest(open)} onClick={closeAll} className='krestic'></div>
                        <div className='allinfo'>
                            <h3 >{date} в { weather.city }, {weather.country}</h3> 
                            <p className='p'>{ forecast.avgtemp_c } градусов</p>
                            <div>
                                <span className='first'>
                                    <h4>{forecast.condition.text}</h4>
                                    <img src={`https://${forecast.condition.icon}`} alt="weather"></img>
                                </span>
                                <span className={this.visibleelement(id, open)}>
                                    <span>Влажность {forecast.avghumidity}%<img src={humiditi} alt="img"></img></span>
                                </span>
                                
                            </div>
                            <div>    
                                <span className={this.visibleelement(id, open)}>
                                    <span>Макс температура {forecast.maxtemp_c}С<img src={arrowup} alt="img"></img></span>
                                </span>
                                <span className={this.visibleelement(id, open)}>
                                    <span>Мин температура {forecast.mintemp_c}C<img src={arrowdown} alt="img"></img></span>
                                </span>
                            </div>
                            <button onClick={this.fullinfo1, setOpen} value={id}>Полная информация</button>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}