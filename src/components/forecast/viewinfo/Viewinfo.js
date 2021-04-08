import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Viewinfo.css';

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
        // console.log(finalobject)
        return finalobject
    }
    render(){    
        const { weather, forecast } = this.props;
        const { temperature, city} = weather;
        const { forecastday} = forecast;
        // const { temperature, city, country } = weather;

        // const { forecastday, current, location } = forecast;

        // console.log(forecastday)
        
        
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
                <ResponsiveContainer width={'100%'} height={300}>
                    <LineChart data={data}>
                        <Line stroke="#E63946" type="monotone" dataKey="temperature" />
                        <CartesianGrid stroke="#ccc" />
                        <YAxis stroke="blue" dataKey="temperature" domain={[-5, 16]} />
                        <XAxis stroke="blue" dataKey="name" tick={{ fontSize: 16 }} />
                        <Tooltip content={<CustomTooltip />}/>
                    </LineChart>
                </ResponsiveContainer>
            )
        }
        // stroke="blue" делает полосу в синий цвет, axisLine={{ stroke: '#EAF0F4' }} линию в какой то цвет
        // str 50  dx={20} это отступы вправо если с минусов то в лево, dy={10} тоже самое только вверх и низ
        return(
            <React.Fragment>
                <div className={'info'}>
                    <h3>Сейчас в { city }</h3> <p>{ temperature } градусов</p>
                </div>
                <div className='chart'>
                    <RenderLineChart/>
                </div>
            </React.Fragment>
        )}
}
