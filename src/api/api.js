

export default class Weatherapi {
    _apibase = 'http://api.weatherapi.com/v1/current.json?key=16017d812d6f459e945185519213003&';
    async fetchonderver(url) {
      const res = await fetch(`${this._apibase}${url}`);
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status} `)
      }
      return await res.json();
    }
    async getCyti(city){
      return await this.fetchonderver(`q=${city}&aqi=no`)
    }
  }
