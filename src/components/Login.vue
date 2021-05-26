<template>
  <div style="color: black">
    
    <message-card v-if="user && !showForm">
      <template v-slot:header> Welcome back , {{ user.name }} </template>
      <template v-slot:content> What would you like to do today ? </template>
    </message-card>
    <form v-if="showForm"
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
    >
      <message-card>
        <template v-slot:header> Login </template>

        <template v-slot:content style="color: #949494">
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Invalid email</span
            >
          </md-field>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">Password</label>
              <md-input
                type="password"
                id="password"
                name="password"
                autocomplete="password"
                v-model="form.password"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.password.required"
                >The password is required</span
              >
            </md-field>
          </div>
        </template>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <template v-slot:actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Login</md-button
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
  name: "Login",
  mixins: [validationMixin],
  computed: {
    ...mapState("login", {
      user: (state) => state.user,
    }),
  },

  data: () => ({
    showForm: true,
    form: {
      password: null,
      email: null,
    },
    userSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      password: {
        required,
      },
      email: {
        required,
        email,
      },
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
    async login() {
     let res = await this.$store.dispatch("login/loginUser", { login: this.form });
     if (res){
       this.clearForm();
       this.showForm = false;
     }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
      }
    },
  },
  mounted(){
   this.$root.$on('displayForm', () => { 
         this.showForm = true;

    })
  }
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
</style>