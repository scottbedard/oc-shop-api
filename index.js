'use strict';

var ShopRepository = require('./repository');

exports.sync = function(store, options) {
    var moduleName = (options || {}).moduleName || 'shop';

    store.registerModule(moduleName, {

        //
        // actions
        //
        actions: {
            addToCart: function(context, inventoryId, quantity) {
                return ShopRepository.addToCart(inventoryId, quantity).then(response => {
                    context.commit('setCartItem', response.data);
                });
            },
        },

        //
        // mutations
        //
        mutations: {
            setCartItem: function(context, data) {
                var item = context.cart.items.find(function(item) {
                    return item.id == data.id;
                });

                if (! item || data.updated_at > item.updated_at) {
                    context.cart.items.push(data);
                }
            },
        },

        //
        // namespaced
        //
        namespaced: true,

        //
        // state
        //
        state: {
            cart: {
                items: [],
            },
        },
    });
};
