

export default class Weatherapi {
    // _apibase = 'http://api.weatherapi.com/v1/current.json?key=16017d812d6f459e945185519213003&';
    _apibase = 'http://api.weatherapi.com/v1/forecast.json?key=16017d812d6f459e945185519213003&';

    _apibase2 = 'http://api.openweathermap.org/data/2.5/weather?'
    async fetchonderver(url) {
      const res = await fetch(`${this._apibase}${url}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status} `)
      }
      
      return await res.json();
    }
    async fetchonweatherinfo(city) {
      const res = await fetch(`${this._apibase2}${city}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${city}, received ${res.status}`)
      }

      return await res.json();
    }

    async getCyti(city){
      const info =  await this.fetchonderver(`lang=ru&q=${city}&days=7`); //`q=${city}&aqi=no`
      return info;
    }

    async getopenweather(city) {
      const info = await this.fetchonweatherinfo(`q=${city}&lang=ru&appid=cb1b368321809eca6a8674ff0437d55d`)
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
