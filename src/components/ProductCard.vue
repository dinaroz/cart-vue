<template>
  <md-card class="main-card-wrapper">
    <md-card-media>
      <md-ripple class="img-wrapper">
        <slot name="imgsrc"></slot>
      </md-ripple>
    </md-card-media>
    <md-card-header>
      <div class="md-title">
        <slot name="header"></slot>
        <div class="md-subhead">
          <slot name="subhead"></slot>
        </div>
      </div>
    </md-card-header>
    <md-card-actions class="md-layout">
      <div class="footer-price md-layout-item">
        <svg style="width: 10px; height: 10px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22,16A5,5 0 0,1 17,21H8V9H10V19H17A3,3 0 0,0 20,16V3H22V16M16,8V15H14V8A3,3 0 0,0 11,5H4V21H2V3H11A5,5 0 0,1 16,8Z"
          />
        </svg>
        <slot name="price"></slot>
      </div>
      <div class="md-layout-item">
        <md-card-expand-trigger v-if="showAllDescription">
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </div>
      <div class="md-layout-item wrapper-icon-cart">
        <md-button
          class="md-icon-button"
          @click="addToCart(productDetails)"
        >
          <md-icon
            ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11,9H13V6H16V4H13V1H11V4H8V6H11M7,18A2,2 0 0,0 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20A2,2 0 0,0 7,18M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.17,14.75L7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L21.16,4.96L19.42,4H19.41L18.31,6L15.55,11H8.53L8.4,10.73L6.16,6L5.21,4L4.27,2H1V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42C7.29,15 7.17,14.89 7.17,14.75Z"
              />
            </svg>
          </md-icon>
        </md-button>
      </div>
    </md-card-actions>

    <md-card-expand-content>
      <md-card-content>
        <slot name="allDescription"></slot>
      </md-card-content>
    </md-card-expand-content>
  </md-card>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "product-card",
  props: {
    showAllDescription: false,
    productDetails: null,
  },
  methods: {
    ...mapActions("cart", ["updateCart"]),
    addToCart(product) {
     this.updateCart(product)
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.md-card-example {
  .md-subhead {
    .md-icon {
      $size: 16px;

      width: $size;
      min-width: $size;
      height: $size;
      font-size: $size !important;
    }

    span {
      vertical-align: middle;
    }
  }

  .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .md-icon {
      margin: 8px;
    }
  }

  .md-button-group {
    display: flex;

    .md-button {
      min-width: 60px;
      border-radius: 2px;
    }
  }
}
.img-wrapper {
  height: 160px;
  overflow-y: auto;
}
.main-card-wrapper {
  width: 220px;
  //   height: 300px;
}
.footer-price {
  //   width: -webkit-fill-available;
  text-align: start;
}
.wrapper-icon-cart {
  text-align: end;
}
</style>