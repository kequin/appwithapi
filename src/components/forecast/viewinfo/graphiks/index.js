import React, {Component} from 'react';
import style from './styles.module.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default class Graphic extends Component {



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

    max_and_min_temp = (object) => {
        object[0].hour.sort(function compareNumbers(a, b) {
            return a.temp_c - b.temp_c;
          })
        return [Math.floor(object[0].hour[0].temp_c -2), Math.floor(object[0].hour[object[0].hour.length-1].temp_c + 2)]
    }

    render(){

        const { forecastday } = this.props;
        
        const data = this.hour_temp_and_other(forecastday);
        const min_max_temp = this.max_and_min_temp(forecastday);


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
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <LineChart data={data}>
                        <Line stroke="#1f47a7" type="monotone" dataKey="temperature" />
                        <CartesianGrid stroke="#E2EAFC" />
                        <YAxis StringFormat='str' stroke="#0232a1" dataKey="temperature" domain={min_max_temp} />
                        <XAxis stroke="#0232a1" dataKey="name" tick={{ fontSize: 16 }} />
                        <Tooltip content={<CustomTooltip />}/>
                    </LineChart>
                </ResponsiveContainer>
            )
        }


        // const { temperature, city, country } = weather;

        // const { forecastday, current, location } = forecast;

        
        // stroke="blue" делает полосу в синий цвет, axisLine={{ stroke: '#EAF0F4' }} линию в какой то цвет
        // str 50  dx={20} это отступы вправо если с минусов то в лево, dy={10} тоже самое только вверх и низ
        return(
            <div className={style.chart}>
                
                <RenderLineChart/>
            </div>
        )
    }
}
