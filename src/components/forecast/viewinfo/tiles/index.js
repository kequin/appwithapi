import React from 'react';
import Tiles from './tiles/tiles';
import style from './style.module.scss';

const Render = (props) => {
    



    const {forecastday, weather} = props;


    const id = [
        {id:0},{id:1},{id:2}
    ];


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