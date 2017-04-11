var ShopRepository = require('./repository');

exports.sync = function(store, options = {}) {
    let moduleName = options.moduleName || 'shop';

    store.registerModule(moduleName, {

        //
        // actions
        //
        actions: {
            addToCart(context, { inventoryId, quantity }) {
                return new Promise(resolve => {
                    ShopRepository.addToCart(inventoryId, quantity).then(response => {
                        context.dispatch('refreshCart').then(resolve);
                    });
                });
            },
            refreshCart(context) {
                return ShopRepository.getCart().then(response => {
                    context.commit('updateCart', response.data);
                });
            },
            removeFromCart(context, itemId) {
                return new Promise(resolve => {
                    ShopRepository.removeFromCart(itemId).then(response => {
                        context.dispatch('refreshCart').then(resolve);
                    });
                });
            },
        },

        //
        // getters
        //
        getters: {
            cartIsEmpty(state, getters) {
                return getters.itemsInCart <= 0;
            },
            itemsInCart(state, getters) {
                if (typeof state.cart !== 'object' || ! Array.isArray(state.cart.items)) {
                    return 0;
                }

                return state.cart.items.reduce((a, b) => a + b.quantity, 0);
            }
        },

        //
        // mutations
        //
        mutations: {
            updateCart(state, cart) {
                if (
                    typeof state.cart !== 'object' ||
                    typeof state.cart.update_count !== 'number' ||
                    state.cart.update_count < cart.update_count
                ) {
                    state.cart = cart;
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
            cart: options.cart || {
                items: [],
            },
        },
    });
};
