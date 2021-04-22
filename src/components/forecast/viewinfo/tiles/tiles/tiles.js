import React, {Component } from 'react';
import './index.css';

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


    visibleelement = (id) => {
        const arr = this.state.blocks;
        let clas;
        switch(true){
            case arr[id] === true:
                clas = 'nothidden';
                break;
            case arr[id] === false:
                clas = 'hide';
                break;
            default:
                clas = 'hide';
        }
        return clas;
    }

    render(){

        const {weather, forecastday, id} = this.props;
        // console.log(forecastday)
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
                        <div style={this.krest(id)} className='krestic'></div>
                        <div className='allinfo'>
                            <h3 >{date} в { weather.city }, {weather.country}</h3> 
                            <p className='p'>{ forecastday[id].day.avgtemp_c } градусов</p>
                            <div className={this.visibleelement(id)}>
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