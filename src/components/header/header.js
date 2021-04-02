import React, { Component } from 'react';
import './header.css';
import Cloudy from './source/cloudy.png'
import map from './source/map.png'


export default class Header extends Component {



    render() {


        return(
            <header>
                <div>
                    <div>
                        <p>Weather
                            <span>Info</span>
                        </p>
                        <img src = {Cloudy} alt='img'/>
                    </div>
                    <div>
                        <img src = {map} alt='map' />
                        <form>
                            <input placeholder='Введите название страны или города' />
                            <button>
                                search
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}