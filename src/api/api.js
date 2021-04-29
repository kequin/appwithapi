

export default class Weatherapi {
    // _apibase = 'http://api.weatherapi.com/v1/current.json?key=16017d812d6f459e945185519213003&';
    _apibase = 'http://api.weatherapi.com/v1/forecast.json?key=16017d812d6f459e945185519213003&';
    async fetchonderver(url) {
      const res = await fetch(`${this._apibase}${url}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status} `)
      }
      
      return await res.json();
    }

    async getCyti(city){
      const info =  await this.fetchonderver(`lang=ru&q=${city}&days=7`); //`q=${city}&aqi=no`
      return info;
    }
    // _transformWeather(info){
    //   return {
    //     temperature: info.current.temp_c,
    //     city: info.location.name, 
    //     country: info.location.country
    //   }
    // }
  }
