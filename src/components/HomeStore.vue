<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-xlarge-size-20 md-medium-size-25 md-small-size-33 md-xsmall-size-100"
      v-for="row in rowsState"
      :key="row.id"
    >
      <product-card class="card" 
      :product-details = row
      :show-all-description="initShowAllDescription(row.description)">
        <template v-slot:header>
          {{ row.title }}
        </template>
        <template v-slot:subhead>
          {{ row.description | shortDescription }}
        </template>
        <template v-slot:allDescription>
          {{ row.description | allDescription }}
        </template>
        <template v-slot:imgsrc>
          <img :src="row.image" />
        </template>
        <template v-slot:price>
          {{ row.price }}
        </template>
      </product-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  components: { ProductCard },
  name: "home-store",
  computed: {
    ...mapState("product", {
      rowsState: (state) => state.rows,
    }),
  },
  methods: {
    initShowAllDescription(value) {
      if (value && value.length > 20) {
        return true;
      }
      return false;
    },
    ...mapActions("product", ["getAllProducts"]),
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 20) {
        return value.substring(0, 20)+"..." ;
      } else {
        return value;
      }
    },
    allDescription(value) {
      if (value && value.length > 20) {
        return value.substring(20, value.length);
      }
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
<style scoped>
div {
  color: black;
}
.card {
  margin-top: 15px;
}
</style>
