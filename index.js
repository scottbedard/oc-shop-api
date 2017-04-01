var axios = require('axios');

module.exports = {

    /**
     * API Host
     *
     * @type {String}
     */
    host: '',

    /**
     * Find a category by slug.
     *
     * @param  {string}     slug
     * @return {Promise}
     */
    findCategory: function(slug) {
        return axios.get(this.host + '/api/bedard/shop/categories/' + slug)
    },

    /**
     * Get categories.
     *
     * @param  {Object}     params
     * @return {Promise}
     */
    getCategories: function(params) {
        return axios.get(this.host + '/api/bedard/shop/categories', { params });
    },
};
