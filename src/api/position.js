export default class Position {
    _apibase = 'https://geolocation-db.com/json/afa4d000-8eb9-11eb-a6ff-2538b793e762';
    async fetchonderver() {
      const res = await fetch(`${this._apibase}`);
      if(!res.ok) {
        throw new Error(`Could not fetch, received ${res.status} `)
      }
      return await res.json();
    }
    async getSity(){
      return await this.fetchonderver()
    }
}