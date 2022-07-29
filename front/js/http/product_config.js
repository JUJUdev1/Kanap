// import Api_fetch
import Api_fetch from "./Api_fetch.js";
import {config} from "./config.js";

class ProductApi extends Api_fetch {
  constructor(props) {
    super(props, "/api/products");
  }
}

export const productApi = new ProductApi(config.baseUrl);
