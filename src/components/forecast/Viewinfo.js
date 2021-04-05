import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


export default class Viewinfo extends Component{
    hour_temp_and_other = (object) => {
        let finalobject = [];

        for(let i = 0; i<object[0].hour.length;i++){
            finalobject.push(
                {
                    name: `${i}:00`,
                    temperature: `${object[0].hour[i].temp_c}`,
                    pv: 2400
                }
            )
        }
        console.log(finalobject)
        return finalobject
    }
    render(){    
        const { weather, forecast } = this.props;
        const { temperature, city, country } = weather;
        const { forecastday, current, location } = forecast;
        console.log(forecastday)
        
        
        const data = this.hour_temp_and_other(forecastday);
        
        function CustomTooltip({ payload, label, active }) {
            if (active) {
              return (
                <div className="custom-tooltip">
                  <p className="label">{`Температура в ${label}`}</p>
                  <p className="intro">{`${payload[0].value}градусов`}</p>
                </div>
              );
            }
          
            return null;
          }
        const RenderLineChart = () => {
            return(
                <LineChart width={document.documentElement.clientWidth} height={400} data={data}>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />}/>
            </LineChart>
            )
        }
        return(
            <React.Fragment>
                <div>
                    Сейчас в { country }, а точнее в { city }, { temperature } градусов
                </div>
                <ul>
                    <RenderLineChart />
                </ul>
            </React.Fragment>
        )}
}
