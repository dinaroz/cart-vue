import { router } from '../router';
import Vue from '../main'
import swal from 'sweetalert';

const state = {
    products: null,
    rows: null,
};
const getters = {
    getProducts: state => () => state.products,
};

const actions = {

    async getAllProducts({ commit }) {
        try {
            let response =
                await Vue.$http.get("/product");
            if (response.status) {
                commit('setProducts', response.data.data);
                return true;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    async deleteProduct({ commit, dispatch }, { id }) {
        console.log(id)
        try {
            let response = await Vue.$http.delete("/product/" + id);
            if (response.status) {
                dispatch('getAllProducts')
                return true;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async addProduct({ commit, dispatch }, { product }) {
        console.log(product)
        try {
            let response = await Vue.$http.post("/product", product);
            if (response.status) {
                dispatch('getAllProducts')
                swal("Success", "Added Successful", "success");
                return true;
            }
        } catch (err) {
            console.log(err);
            swal("Error", "Something Went Wrong", "error");
            return false;
        }
    },

    async editProduct({ commit, dispatch }, { product }) {
        console.log(product)
        try {
            let objForUpdate = {};
            if (product.title) objForUpdate.title = product.title;
            if (product.price) objForUpdate.price = product.price;
            if (product.description) objForUpdate.description = product.description;
            if (product.image) objForUpdate.image = product.image;
            if (Object.keys(objForUpdate).length === 0 && objForUpdate.constructor === Object
            ) {
                return true;
            } else {
                let response = await Vue.$http.post("/product/updateProduct", product);
                if (response.status) {
                    dispatch('getAllProducts')
                    swal("Success", "Editted Successful", "success");
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
            swal("Error", "Something Went Wrong", "error");
            return false;
        }
    },

};

const mutations = {
    setProducts(state, pro) {
        state.rows = pro
    }

};
export const product = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};