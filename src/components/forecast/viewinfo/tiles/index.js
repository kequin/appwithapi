import React, {useState} from 'react';
import Tiles from './tiles/tiles';
import style from './style.module.scss';

const Render = (props) => {
    const [openornot, setOpenornot] = useState([{id:0, open:true},{id:1, open:false},{id:2, open:false}]);

    const setOpenor = (e) => {
        let newarr = [];
        for (let i = 0; i < openornot.length; i++) {
            newarr.push({id:i, open:false})
        }
        newarr[e.target.value] = { id:Number(e.target.value), open:true }
        setOpenornot(newarr)//[{id:0, open:true},{id:1, open:false},{id:2, open:false}]
    }

    const closeAll = () => {
        let newarr = [];
        for (let i = 0; i < openornot.length; i++) {
            newarr.push({id:i, open:false})
        }
        setOpenornot(newarr)
    }

    const {forecastday, weather} = props;

    const all_tiles = openornot.map((item)=> {
        const { id, open } = item;
        return (
            <Tiles closeAll={closeAll} setOpen={setOpenor} open={open} key={id} id={id} weather={weather} forecastday={forecastday}  />
        )
    })

    return (<div className={style.div}> {all_tiles} </div>)
}

export default Render