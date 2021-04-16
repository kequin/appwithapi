import React from 'react';
import style from './error.module.scss';
import error from  './../../images/errorpng.png';

const Error = () => {


    return(
        <div className={style.error}>
           <div>
               <h2>
                   Ошибка!!
               </h2> 
               <p>
                   Это означает что мы не можем найти страницу которую ты ищешь  
               </p>
           </div>
           <img src={error} alt='error'></img>
        </div>
    )
}
export default Error;