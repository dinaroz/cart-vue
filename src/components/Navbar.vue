<template>
  <div class="page-container">
    <md-dialog :md-active.sync="showDialog">
      <component :is="dialogComponent" />
      <md-dialog-actions>
        <md-button class="close-button" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <md-app>
      <md-app-toolbar>
        <div class="md-toolbar-row md-layout">
          <md-tabs
            class="md-layout-item md-medium-size-25 md-small-size-33 md-xsmall-size-100"
          >
            <md-tab to="/home" id="tab-home" md-label="Home"></md-tab>
            <md-tab to="/admin" id="tab-pages" md-label="Admin"></md-tab>
          </md-tabs>
          <div class="md-toolbar-section-end">
            <md-button
              id="cart-button"
              class="md-primary"
              @click="showCartDialog"
            >
              <svg style="width: 10px; height: 10px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22,16A5,5 0 0,1 17,21H8V9H10V19H17A3,3 0 0,0 20,16V3H22V16M16,8V15H14V8A3,3 0 0,0 11,5H4V21H2V3H11A5,5 0 0,1 16,8Z"
                />
              </svg>
              {{ amountToPay
              }}<md-icon
                ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z"
                  /></svg></md-icon
            ></md-button>
            <md-button @click="loginRoute" id="login-button" class="md-primary"
              >Login</md-button
            >
            <md-button
              @click="registerRoute"
              id="register-button"
              class="md-primary"
              >Register</md-button
            >
            <md-menu
              v-if="user"
              md-size="auto"
              :md-offset-x="127"
              :md-offset-y="-5"
            >
              <div class="user-icon" md-menu-trigger>
                {{ user.name.charAt(0).toUpperCase() }}
              </div>

              <md-menu-content class="menu">
                <md-menu-item
                  ><div><md-icon>person</md-icon>: {{ user.name }}</div>
                </md-menu-item>
                <md-menu-item
                  ><div><md-icon>email</md-icon>: {{ user.email }}</div>
                </md-menu-item>
                <md-button class="md-raised" @click="logUserOut"
                  >Logout</md-button
                >
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>
    </md-app>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Cart from "./Cart";
export default {
  name: "Navbar",
  components: { Cart },
  data() {
    return {
      active: false,
      showDialog: false,
      dialogComponent: null,
    };
  },
  computed: {
    ...mapState("cart", {
      amountToPay: (state) => state.amountToPay,
    }),
    ...mapState("login", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions("login", ["logUserOut"]),
    loginRoute() {
      this.$router.push("/login").catch(() => {});
      this.$root.$emit("displayForm");
    },
    registerRoute() {
      this.$router.push("/register").catch(() => {});
      this.$root.$emit("displayForm");
    },
    showCartDialog() {
      this.dialogComponent = "cart";
      this.showDialog = true;
    },
  },
};
</script>
<style
lang="scss" scoped>
.md-app {
  max-height: 50vh;
  border: 1px solid rgba(rgb(0, 0, 0), 0.12);
  background: linear-gradient(-90deg, #6a79cf, #1627c0);
  color: #ffff;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
#register-button {
  background-color: rgb(49, 172, 141);
  color: white;
}
#login-button {
  background-color: rgb(28, 43, 253);
  color: white;
}
.user-icon {
  background-color: black;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  text-align: center;
  padding: 7px 3px 0 5px;
}
.menu {
  background-color: #f1f3f4;
  padding: 5px;
}
.md-dialog /deep/.md-dialog-container {
  width: -webkit-fill-available;
  background-color: white;
  padding: 15px;
  overflow: auto;
}
</style>
