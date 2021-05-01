import React from 'react';
import './index.css';
import humiditi from './../../../../../images/pngegg.png';
import arrowup from './../../../../../images/arrowup.png';
import arrowdown from './../../../../../images/arrowdown.png';

const Tiles = (props) => {
    const size_control = (openornot) => {
        let styles = '';
        if(openornot) styles = 'info active'
        else styles = 'info default'
        return styles;
    }
    const krest = (openornot) => {
        let style;
        if(openornot) style = { display:'' }
        else style = { display:'none' }
        return style;
    }
    const visibleelement = (openornot) => {
        let clas;
        if(openornot) clas = 'nothidden';
        else clas = 'hide';
        return clas;
    }
    const night_and_day_temp = (forecast, id) => {
        let day_temp = 0, night_temp = 0, day_count = 0;
        for (let i = 0; i < forecast[id].hour.length; i++) {
            if(forecast[id].hour[i].is_day === 0){
                night_temp += forecast[id].hour[i].temp_c;
            } else {
                day_temp += forecast[id].hour[i].temp_c;
                day_count++;
            }
        }
        return `Днем ${Math.floor(day_temp/day_count)} C°, Ночью ${Math.floor(night_temp/(24-day_count))} C°`
    }
    const {weather, forecastday, closeAll, open, id, setOpen} = props;
    const forecast = forecastday[id].day;

    let date;
    if(id === 0) date = "Сегодня"
    else if(id === 1) date = "Завтра"
    else if(id === 2) date = "Послезавтра"
    return(
    <React.Fragment>
            <div style={{transition: '.4s'}} className={size_control(open)}>
                <div style={krest(open)} onClick={closeAll} className='krestic'></div>
                <div className='allinfo'>
                    <h3 >{date} в { weather.city }, {weather.country}</h3> 
                    <p className='p'>{night_and_day_temp(forecastday, id)}</p>
                    <div>
                        <span className='first'>
                                <h4>{forecast.condition.text}</h4>
                            <img src={`https://${forecast.condition.icon}`} alt="weather"></img>
                        </span>
                        <span className={visibleelement(open)}>
                            <span>Влажность {forecast.avghumidity}%<img src={humiditi} alt="img"></img></span>
                        </span>
                        
                    </div>
                    <div>    
                        <span className={visibleelement(open)}>
                            <span>Макс температура {forecast.maxtemp_c}С<img src={arrowup} alt="img"></img></span>
                        </span>
                        <span className={visibleelement(open)}>
                            <span>Мин температура {forecast.mintemp_c}C<img src={arrowdown} alt="img"></img></span>
                        </span>
                    </div>
                    <button onClick={setOpen} value={id}>Полная информация</button>
                </div>
            </div>
    </React.Fragment>
    );
}

export default Tiles;