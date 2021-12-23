<template>
  <div class="flex align-items-center justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round">
      <div class="text-center mb-5">
        <div class="text-center text-2xl text-primary font-bold mb-2">Smart Lock IOT Service</div>
        <div>
          <img src="../assets/images/nokey.jpg" alt="Image" height="50" class="mb-3 border-round" />
        </div>

        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="SignInClick">
          <span class="text-600 font-medium line-height-3">Don't have an account? </span>Create today!</a
        >
      </div>

      <div>
        <label for="email" class="block text-500 font-medium mb-2">UserID</label>
        <InputText id="email" type="text" class="w-full mb-3 p-inputtext-sm" v-model="user_id" />

        <label for="password" class="block text-500 font-medium mb-2">Password</label>
        <InputText id="password" type="password" class="w-full mb-3 p-inputtext-sm" v-model="user_pass" />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox v-model="checked" id="rememberme" :binary="true" class="mr-2"></Checkbox>
            <label for="rememberme">Remember me</label>
          </div>
          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
        </div>

        <Button label="Sign In" icon="pi pi-user" class="w-full" @click="loginClick"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import router from "../router/router_index";
import LoginService from "../services/LoginService";

export default {
  name: "SignIn",
  // props: {
  //   msg: String,
  //}
  setup() {
    const socket = inject("socket");

    const user_id = ref();
    const user_pass = ref();
    const loginService = new LoginService();

    const tryReconnect = () => {
      if (!socket.connected) {
        //socket.connect();
        console.log("tryReconnect:");
      } else {
        console.log("socket connect:");
      }
    };

    const SignInClick = () => {
      console.log("Register page ...");
      //router.push({ path: '/Home', replace: true })
      router.push({ path: "/Register", replace: true });
    };

    const loginClick = () => {
      let user = {
        id: user_id.value,
        pass: user_pass.value,
      };

      console.log("login  ...", user);

      const resData = loginService.userLogin(user);
      resData.then(function (result) {
        console.log("Login...:", result);

        router.push({
          name: "Home",
          params: {
            user_id: result.userId,
            device_id: result.deviceId,
            token: result.token,
          },
        });
      });
    };

    tryReconnect();

    return {
      SignInClick,
      loginClick,
      user_id,
      user_pass,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
