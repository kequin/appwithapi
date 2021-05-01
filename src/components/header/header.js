import React from 'react';
import './header.module.scss';
import Cloudy from './../../images/cloudy.png';
import map from './../../images/map.png';


const Header = (props) => {
    const Searchcity = (e) => {
        const city = e.target.parentNode.childNodes[0].value;
        props.Searchcity(city);
    }
    return(
        <header>
            <div>
                <div translate='no'>
                    <p>Weather<span>Info</span></p>
                    <img src = {Cloudy} alt='img'/>
                </div>
                <div>
                    <img src = {map} alt='map' onClick={() => props.MapSearchCity()}/>
                    <form type='text' onSubmit={(e) => e.preventDefault()}>
                        <input placeholder='Название города' />
                        <button onClick={Searchcity}>
                            search
                        </button>
                    </form>
                </div>
            </div>
        </header>
)
}
export default Header;