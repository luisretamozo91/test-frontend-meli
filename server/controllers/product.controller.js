const axios = require('axios');
const numeral = require('numeral');
const apiUrl = process.env.API_URL;
const apiRegion = process.env.API_REGION;

const limitProduct = 4;

/**
 * list of formatted products.
 * @param searchValue
 * @param res
 */
exports.getProducts = (searchValue, res) => {
  axios.get(
    `${apiUrl}${apiRegion}search?q=${searchValue}&limit=${limitProduct}`)
    .then((response) => {
      res.json(formatProducts(response.data));
    })
    .catch((err) => {
      res.send(err);
    });
};

/**
 *
 * @param productId
 * @param res
 */
exports.getProductDetails = (productId, res) => {
  const detailResponse = {};
  axios.all([
    axios.get(`${apiUrl}items/${productId}`),
    axios.get(`${apiUrl}items/${productId}/description`)])
    .then(axios.spread((product, description) => {
      detailResponse.author = getAuthor();
      detailResponse.item = setItemValues(product.data, description.data);
      axios.get(`${apiUrl}categories/${product.data.category_id}`)
        .then((response) => {
          detailResponse.categories = response.data.path_from_root.map(
            (category) => {
              return category.name;
            });
          res.json(detailResponse);
        });
    }));
};

/**
 * Format Products
 * @param response
 * @returns {{}}
 */
function formatProducts(response) {
  const productsFormat = {};
  productsFormat.author = getAuthor();
  productsFormat.categories = getCategories(response.filters);
  productsFormat.items = getItems(response.results);
  return productsFormat;
}

/**
 * service signature
 * @returns {{name: string, lastname: string}}
 */
const getAuthor = () => ({ name: 'Luis', lastname: 'Retamozo' });

/**
 * Set Categories
 * assuming that category is always the first filter
 * @param firstFilter
 * @returns {Array}
 */
const getCategories = ([firstFilter]) => {
  let categories = [];
  if (!!firstFilter.id && firstFilter.id == 'category') {
    categories = firstFilter.values[0].path_from_root.map((category) => {
      return category.name;
    });
  }
  return categories;
}

/**
 * Set Items
 * @param items
 * @returns {Array}
 */
const getItems = (items) => {
  return items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: formatPrice(item.price),

        //  TODO Check for decimals on the api response
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name
    };
  });
}

/**
 * format Price
 * @param price
 * @returns {string}
 */
const formatPrice = (price) => numeral(price).format('$ 0.[00]');

/**
 * Set Item values
 * @param product
 * @param description
 * @returns {{}}
 */
const setItemValues = (product, description) => {
  const formatProduct = {};

  formatProduct.id = product.id;
  formatProduct.title = product.title;
  formatProduct.price = {
    amount: formatPrice(product.price),
    currency: product.currency_id
  };

  if (product.pictures.length) {
    formatProduct.picture = product.pictures[0].secure_url;
  }

  formatProduct.condition = product.condition === 'new' ? 'Nuevo' : 'Usado';
  formatProduct.free_shipping = product.shipping.free_shipping;
  formatProduct.sold_quantity = product.sold_quantity;
  formatProduct.description = description.plain_text;
  formatProduct.permalink = product.permalink;

  return formatProduct;
}