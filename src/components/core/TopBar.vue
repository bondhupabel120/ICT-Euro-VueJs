<template>
  <div>
    <v-container>

      <div class="p-15 topbar">
        <div class="topbar-logo">
          <div class="d-flex-wrapper">
            <div class="d-sm-logo">
              <a @click="toHome()">
                <img
                  height="50"
                  :src="require('@/assets/img/logo.png')"
                />
              </a>
            </div>

          </div>
        </div>

        <div class="user-tools d-none d-md-block">
          <nav>
            <ul class="user-tab">
              <li class="user-item">
                <!-- <a @click="toSignIn()">Sign In</a> -->
                <a @click="toSignIn()">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
// Utilities
import { mapMutations, mapState, mapActions } from "vuex";
// Components

export default {
  name: "CoreTopBar",
  computed: {},
  computed: {
    ...mapState("homepage", ["user"]),
  },
  methods: {
    ...mapActions("homepage", ["getUser"]),

    toHome() {
      this.$router.push("/");
    },

    toSignIn() {
      this.$router.push("/login");
    },

    logout: function() {
      this.Account = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_data");
      this.getUser();
      this.getCarts();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>

</style>
