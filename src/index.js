import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './components/header/header'
import Forecast from './components/forecast/forecast';
import Header from './components/header/header'


export default class App extends Component {
    


    
    render() {
  
        return(
            <div>
                <Header />
                <Forecast />
            </div>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('root'));

reportWebVitals();