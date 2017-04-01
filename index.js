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
};
