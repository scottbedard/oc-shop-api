var axios = require('axios');

var convertToCsv = function(value) {
    if (Array.isArray(value)) {
        value = value.map(string => string.trim()).join(',');
    }

    return value;
};

module.exports = {

    /**
     * API Host
     *
     * @type {String}
     */
    host: '',

    /**
     * Add an inventory to the cart.
     *
     * @param  {Number}     inventoryId
     * @param  {Number}     quantity
     * @return {Promise}
     */
    addToCart: function(inventoryId, quantity = 1) {
        return axios.post(this.host + '/api/bedard/shop/cart/item', { inventoryId, quantity });
    },

    /**
     * Find a category by slug.
     *
     * @param  {string}     slug
     * @param  {object}     params
     * @return {Promise}
     */
    findCategory: function(slug, params = {}) {
        if (typeof params.with !== 'undefined') {
            params.with = convertToCsv(params.with);
        }

        return axios.get(this.host + '/api/bedard/shop/categories/' + slug, { params });
    },

    /**
     * Find a product.
     *
     * @param  {string}     slug
     * @param  {Object}     params
     * @return {Promise}
     */
    findProduct: function(slug, params = {}) {
        if (typeof params.with !== 'undefined') {
            params.with = convertToCsv(params.with);
        }

        return axios.get(this.host + '/api/bedard/shop/products/' + slug, { params });
    },

    /**
     * Get categories.
     *
     * @param  {Object}     params
     * @return {Promise}
     */
    getCategories: function(params = {}) {
        if (typeof params.with !== 'undefined') {
            params.with = convertToCsv(params.with);
        }

        return axios.get(this.host + '/api/bedard/shop/categories', { params });
    },

    /**
     * Get products.
     *
     * @param  {Object}     params
     * @return {Promise}
     */
    getProducts: function(params = {}) {
        return axios.get(this.host + '/api/bedard/shop/products', { params });
    },
};