import React, { Component } from 'react';
import './header.css';
import Cloudy from './source/cloudy.png'
import map from './source/map.png'


export default class Header extends Component {

    SubmitSearch = (e) => {
        e.preventDefault();
    }

    SearchButton = (e) => {
        
    }

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
                        <form type='text' onSubmit={this.SubmitSearch}>
                            <input placeholder='Введите название страны или города' />
                            <button onClick={this.SearchButton}>
                                search
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}