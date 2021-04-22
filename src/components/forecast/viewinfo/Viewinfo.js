import React from 'react';
import Graphic from './graphiks';
import Tiles from './tiles/index';
import './styles.module.scss';

const Viewinfo = (props) => { 
    
        const {  forecastday, weather } = props;
        // console.log(forecastday)
        // const { temperature, city, country } = weather;

        // const { forecastday, current, location } = forecast;

        
        // stroke="blue" делает полосу в синий цвет, axisLine={{ stroke: '#EAF0F4' }} линию в какой то цвет
        // str 50  dx={20} это отступы вправо если с минусов то в лево, dy={10} тоже самое только вверх и низ
        return(
            <React.Fragment>
                <Tiles weather={weather} forecastday={forecastday}/>
                <Graphic forecastday={forecastday} />
                
            </React.Fragment>
        )
}

export default Viewinfo