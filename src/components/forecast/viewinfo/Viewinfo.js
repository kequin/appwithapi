import React, { Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Viewinfo.css';

export default class Viewinfo extends Component{
    
    state = {
        blocks: [
            false,
            false,
            false
        ]
    }
    
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
        // let object = obj[0].hour;
        // for(let i = 1; i<object.length; i++){
        //     if(object[i]<object[i-1]){
        //         let peremobj = object[i];
        //         object[i] = object[i-1];
        //         object[i-1] = peremobj;
        //     } else {
        //         let peremobj = object[i-1];
        //         object[i-1] = object[i];
        //         object[i] = peremobj;
        //     }
        // }
        object[0].hour.sort(function compareNumbers(a, b) {
            return a.temp_c - b.temp_c;
          })
        return [Math.floor(object[0].hour[0].temp_c -2), Math.floor(object[0].hour[object[0].hour.length-1].temp_c + 2)]
    }

    fullinfo1 = (e) => {
        if(e.target.className === 'info'){
            if(!this.state.blocks[0]){
                this.setState(() => {
                    return { blocks:[true,false,false] }
                })
            }
        }
        else {
            if(this.state.blocks[0] && e.target.className === 'krestic'){
                this.setState(() => {
                    return { blocks:[false,false,false] }
                })
            }
        }
    }


    size_control = (number_in_array, first = false) => {
        let styles;
        if(first){
            if(this.state.blocks[number_in_array]){
                styles = {
                    position: 'relative',
                    left:'50%',
                    width: '50%',
                    marginLeft: '-25%',
                    height: '340px',
                    marginTop: '20px',
                    marginBottom: '20px'
                }

            } else {
                styles = {
                    position:'relative',
                    left: 0,
                    marginLeft: '1%',
                    width: '28%',
                    height: '280px'
                }
            }

        } else {
            if(this.state.blocks[number_in_array]) {
                styles = {
                    position: 'relative',
                    left:'50%',
                    width: '50%',
                    marginLeft: '-25%',
                    height: '340px',
                    marginTop: '20px',
                    marginBottom: '20px'
                }
            } else {
                styles = {
                    position:'relative',
                    left: 0,
                    marginLeft: '1%',
                    width: '28%',
                    height: '280px'
                }
            }
        }
        return styles;
    }

    krest = (number_in_array) => {
        let style;
        if(this.state.blocks[number_in_array]){
            style = {
                display:''
            }

        } else {
            style = {
                display:'none'
            }
        }
        return style;
    }

    closeallinfo = () => {
         this.setState(() => {
            return {blocks:[!this.state.blocks[0], false, false]} 
        })
    }
    render(){    
        const {  forecastday, weather } = this.props;
        // const { temperature, city, country } = weather;

        // const { forecastday, current, location } = forecast;

        
        
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
                <ResponsiveContainer width={'100%'} height={300}>
                    <LineChart data={data}>
                        <Line stroke="#E63946" type="monotone" dataKey="temperature" />
                        <CartesianGrid stroke="#ccc" />
                        <YAxis StringFormat='str' stroke="blue" dataKey="temperature" domain={min_max_temp} />
                        <XAxis stroke="blue" dataKey="name" tick={{ fontSize: 16 }} />
                        <Tooltip content={<CustomTooltip />}/>
                    </LineChart>
                </ResponsiveContainer>
            )
        }


        // let secondel = this.size_control(1);
        // let thirdel = this.size_control(2);


        
        // stroke="blue" делает полосу в синий цвет, axisLine={{ stroke: '#EAF0F4' }} линию в какой то цвет
        // str 50  dx={20} это отступы вправо если с минусов то в лево, dy={10} тоже самое только вверх и низ
        return(
            <React.Fragment>
                <div style = {this.size_control(0, true)} onClick={this.fullinfo1} className='info'>
                    <div value = 'krest' style={this.krest(0)} onClick={this.fullinfo1} className='krestic'></div>
                    <h3>Сейчас в { weather.city }</h3> 
                    <p>{ weather.temp_c } градусов</p>
                </div>
                <div className='chart'>
                    <RenderLineChart/>
                </div>
            </React.Fragment>
        )}
}
