import React from 'react';
import './forecast.css';
import Loading from './../loading/loading'
import Error from './../errors/error'
import Viewinfo from './viewinfo/Viewinfo'
import './forecast.css'


const Forecast = (props) => { 
        const { forecast, error, loading, weather } = props;
        const load = loading ? <Loading /> : null;
        const content = !(loading || error) ? <Viewinfo weather ={weather } forecastday = {forecast}  /> : null;
        const err = error ? <Error /> : null;
        return (
            //типо красивая обертка 
            <div className={'content'}>
                {err}
                {load}
                {content}
            </div>
        )
    
}

export default Forecast