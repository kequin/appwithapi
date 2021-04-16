import React from 'react';
import Tiles from './tiles/tiles';
import style from './style.module.scss';

const Render = (props) => {
    
    const { id, forecastday, weather} = props;
    console.log(forecastday)
    const all_tiles = id.map((item)=> {
        const { id } = item;
        return (
            <Tiles key={id} id={id} weather={weather} forecastday={forecastday}  />
        )
    })

    return (
        <div className={style.div}>
            {all_tiles}
        </div>
    )
}

export default Render