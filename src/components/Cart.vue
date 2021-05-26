<template>
  <div>
    <md-card v-if="cart.length <= 0">
      <md-card-header>
        <div class="md-title">your cart is empty</div>
      </md-card-header>

      <md-card-content> </md-card-content>
    </md-card>
    <div class="md-layut" v-for="product in cart" :key="product.id">
      <md-list class="md-triple-line md-layout-item md-xsmall-size-100">
        <md-list-item>
          <md-avatar class="md-avatar-icon md-large">
            <img :src="product.image" />
          </md-avatar>

          <div class="md-list-item-text">
            <span><b> Title: </b>{{ product.title }}</span>
            <span><b> Price: </b> {{ product.price }}</span>
            <p>
              {{ product.description }}
            </p>
          </div>
          <div class="md-list-item-text" style="width: 50%">
            <span>quantity</span>
            <span>
              <md-field style="width: 20%;padding-top:0px;min-height:0px">
                <md-input
                  style="border: 1px solid gray"
                  v-model="product.quantity"
                  @input="updateQuantityAndSubTotal(product)"
                  type="number"
                ></md-input>
              </md-field>
            </span>
          </div>

          <div class="md-list-item-text">
            <span>subtotal</span>
            <span style="padding:7px;font-size:16px">{{ subtotal(product) }}</span>
          </div>
          <md-button
            class="md-icon-button md-list-action"
            @click="removeFromCart(product)"
          >
            <md-icon class="md-primary"
              ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="red"
                  d="M14.12,8.53L12,6.41L9.88,8.54L8.46,7.12L10.59,5L8.47,2.88L9.88,1.47L12,3.59L14.12,1.46L15.54,2.88L13.41,5L15.53,7.12L14.12,8.53M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22A2,2 0 0,1 15,20A2,2 0 0,1 17,18M7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7A2,2 0 0,1 5,15C5,14.65 5.09,14.32 5.25,14.04L6.6,11.59L3,4H1V2H4.27L5.21,4L6.16,6L8.4,10.73L8.53,11H15.55L18.31,6L19.41,4H19.42L21.16,4.96L17.3,11.97C16.96,12.59 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75Z"
                /></svg
            ></md-icon>
          </md-button>
        </md-list-item>
        <md-divider class="md-inset"> </md-divider>
      </md-list>
    </div>
    <div class="md-layout-item" style="float: right" v-if="cart.length > 0">
      <div style="display: inline-block; margin-top: 15px; margin-right: 165px">
        <b
          >Total:
          <svg style="width: 10px; height: 10px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22,16A5,5 0 0,1 17,21H8V9H10V19H17A3,3 0 0,0 20,16V3H22V16M16,8V15H14V8A3,3 0 0,0 11,5H4V21H2V3H11A5,5 0 0,1 16,8Z"
            />
          </svg>
          {{ amountToPay }}</b
        >
      </div>
      <span class="md-layout-item">
        <md-button style="background-color: #28a645" @click="checkout"
          >checkout</md-button
        >
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "cart",
  data() {
    return {
      quantity: null,
      sub: null,
    };
  },
  computed: {
    ...mapState("cart", {
      cart: (state) => state.cart,
      amountToPay: (state) => state.amountToPay,
    }),
  },
  methods: {
    ...mapActions("cart", ["removeFromCart", "updateQuantity", "resetCart"]),
    updateQuantityAndSubTotal(product) {
      this.updateQuantity(product);
      this.subtotal(product);
    },
    subtotal(product) {
      return product.quantity * product.price;
    },
    checkout() {
      this.resetCart();
      swal("Success", "Your order has been successfully processed!", "success");
    },
  },
};
</script>

<style lang="scss" scoped>
.md-list {
  width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
</style>