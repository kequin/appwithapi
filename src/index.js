import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './components/header/header';
import Forecast from './components/forecast/forecast';
import Header from './components/header/header';


export default class App extends Component {
    
    state = {
        city: null
    }

    Search = (city) => {
        this.setState(() => { return {city:city} })
        console.log(city)
    }

    render() {
  
        return(
            <div>
                <Header Searchcity = {this.Search}/>
                <Forecast city = {this.state.city} />
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('root'));

reportWebVitals();