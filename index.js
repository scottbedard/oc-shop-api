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
            updateQuantity(context, { inventoryId, quantity }) {
                return new Promise(resolve => {
                    ShopRepository.updateQuantity(inventoryId, quantity).then(response => {
                        context.commit('updateInventory', response.data);
                        resolve(response.data);
                    });
                });
            },
        },

        //
        // getters
        //
        getters: {
            cartIsEmpty(state, getters) {
                return getters.itemCount <= 0;
            },
            cartTotal(state, getters) {
                if (typeof state.cart !== 'object' || ! Array.isArray(state.cart.items)) {
                    return 0;
                }

                return state.cart.items.reduce((a, b) => {
                    if (
                        typeof b !== 'object' ||
                        typeof b.quantity !== 'number' ||
                        typeof b.product !== 'object' ||
                        typeof b.product.base_price !== 'number'
                    ) {
                        return 0;
                    }

                    return a + (b.quantity * b.product.base_price);
                }, 0);
            },
            itemCount(state, getters) {
                if (typeof state.cart !== 'object' || ! Array.isArray(state.cart.items)) {
                    return 0;
                }

                return state.cart.items.reduce((a, b) => {
                    if (typeof b !== 'object' || typeof b.quantity !== 'number') {
                        return 0;
                    }

                    return a + b.quantity;
                }, 0);
            }
        },

        //
        // mutations
        //
        mutations: {
            updateInventory(state, item) {
                let existingItem = state.cart.items.find(cartItem => cartItem.id == item.id);

                if (existingItem) {
                    state.cart.items[state.cart.items.indexOf(existingItem)] = Object.assign(existingItem, item);
                } else {
                    state.cart.items.push(item);
                }
            },
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
