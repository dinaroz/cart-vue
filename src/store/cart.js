

const state = {
    cart: [],
    amountToPay: 0,
};
const getters = {
    getAmountToPay: state => () => state.amountToPay,
    getCart: state => () => state.cart,
    cartValue: state => {
        let res = 0;
        state.cart.map(item => {
            res += item.price * item.quantity;
        });
        return res;
    }
};

const actions = {

    updateCart({ commit, state, dispatch }, product) {
        try {
            let origCart = state.cart;
            let record = state.cart.find(({ _id }) => _id == product._id);
            if (record) {
                const i = state.cart.findIndex(element => element._id === product._id);
                record.quantity = Number(record.quantity) + 1;
                origCart[i] = record;

            } else {
                product.quantity = 1;
                origCart.push(product);
            }
            commit('setCart', origCart);
            dispatch("updateAmountToPay");
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    updateQuantity({ commit, state, dispatch }, product) {
        try {
            let origCart = state.cart;
            let record = state.cart.find(({ _id }) => _id == product._id);
            if (record) {
                if (product.quantity == 0) {
                    const i = state.cart.findIndex(element => element._id === product._id);
                    state.cart.splice(state.cart.indexOf(record), 1);

                } else {
                    const i = state.cart.findIndex(element => element._id === product._id);
                    record.quantity = Number(product.quantity);
                    origCart[i] = record;
                }
                commit('setCart', origCart);
                dispatch("updateAmountToPay");
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    updateAmountToPay({ commit, state }) {
        let res = 0;
        state.cart.map(item => {
            res += item.price * item.quantity;
        });
        commit('setAmountToPay', res);;
    },

    removeFromCart({ commit, state, dispatch }, prod) {
        try {
            const record = state.cart.find(element => element._id == prod._id);
            state.cart.splice(state.cart.indexOf(record), 1);
            dispatch("updateAmountToPay");
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    resetCart({ commit }){
        commit('resetCart');
    }
};

const mutations = {
    setCart(state, newCart) {
        state.cart = newCart
    },
    setAmountToPay(state, newAmountToPay) {
        state.amountToPay = newAmountToPay
    },
    resetCart(state){
        state.cart = [];
        state.amountToPay =0
    }



};
export const cart = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};