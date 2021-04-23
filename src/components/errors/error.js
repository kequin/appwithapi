import React from 'react';
import style from './error.module.scss';
import error from  './../../images/error.png';

const Error = () => {


    return(
        <div className={style.error}>
           <div>
               <h2>
                   Упссс...
               </h2> 
               <p>
                   Что то пошло не так, но наш программист над этим усердно работает 
               </p>
           </div>
           <img src={error} alt='error'></img>
        </div>
    )
}
export default Error;