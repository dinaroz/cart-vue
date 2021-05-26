<template>
  <div style="color: black">
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
      v-if="showForm"
    >
      <message-card>
        <template v-slot:header> Edit product </template>

        <template v-slot:content style="color: #949494">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('title')">
              <label for="title">title</label>
              <md-input
                type="text"
                id="title"
                name="title"
                autocomplete="title"
                v-model="form.title"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.title.required"
                >The title is required</span
              >
            </md-field>
          </div>

          <md-field :class="getValidationClass('price')">
            <label for="price">price</label>
            <md-input
              type="number"
              name="price"
              id="price"
              autocomplete="price"
              v-model="form.price"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.price.required"
              >The price is required</span
            >
          </md-field>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('description')">
              <label for="description">description</label>
              <md-input
                type="text"
                id="description"
                name="description"
                autocomplete="description"
                v-model="form.description"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.description.required"
                >The description is required</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('image')">
              <label for="image">image</label>
              <md-input
                type="url"
                id="image"
                name="image"
                autocomplete="image"
                v-model="form.image"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.image.required"
                >The image is required</span
              >
            </md-field>
          </div>
        </template>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <template v-slot:actions>
          <md-button type="submit" class="add-button" :disabled="sending"
            >Edit</md-button
          >
        </template>
      </message-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapGetters, mapState, mapActions } from "vuex";
import MessageCard from "./MessageCard.vue";

export default {
  components: { MessageCard },
  name: "EditProductForm",
  mixins: [validationMixin],
  computed: {
    ...mapState("login", {
      user: (state) => state.user,
    }),
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    showForm: true,
    form: {
      title: null,
      price: null,
      description: null,
      image: null,
      id: null,
    },
    userSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      title: {},
      price: {},
      description: {},
      image: {},
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
      this.form.email = null;
    },
    async editProd() {
      this.form.id = this.id;
      let res = await this.$store.dispatch("product/editProduct", {
        product: this.form,
      });
      if (res) {
        this.clearForm();
        this.$root.$emit("closeDialog");
      }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.editProd();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-error {
  color: red !important;
}
.md-field .md-input,
.md-field .md-textarea {
  border-bottom: 2px solid #949494;
  color: #949494;
}
.login-card {
  margin: 0 auto;
  margin-top: 25px;
}
.add-button {
  background-color: #4caf50;
  color: white;
}
</style>