// export default class Api_fetch
 export default class Api_fetch {
    constructor(baseUrl, endPoint) {
        this.baseUrl = baseUrl;
        this.endPoint = endPoint;
    }
    
    async fetchAll() {
        const response = await fetch(this.baseUrl + this.endPoint);
        return await response.json();
    }

    async fetch(id) {
        const response = await fetch(this.baseUrl + this.endPoint + '/' + id );
        return await response.json();
    }
}

