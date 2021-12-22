<template>
  <div class="flex align-items-center justify-content-center">
    <div class="surface-card p-4 shadow-2 border-round">
      <p class="text-center text-primary mt-0 mb-4 text-600 line-height-3">Register Form</p>
      <div>
        <label for="email" class="block text-500 font-medium mb-2">UserID</label>
        <InputText id="email" type="text" class="w-full mb-3 p-inputtext-sm" v-model="userID" />
        <label for="password" class="block text-500 font-medium mb-2">Password</label>
        <InputText id="password" type="password" class="w-full mb-3 p-inputtext-sm" v-model="userPass" />
        <Button label="Register" icon="pi pi-user" class="w-full text-center" @click="registerClick"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../router/router_index";
import LoginService from "../services/LoginService";

export default {
  name: "RegisterForm",
  setup() {
    const userID = ref();
    const userPass = ref();
    const deviceID = ref();
    const loginService = new LoginService();

    const registerClick = () => {
      let user = {
        id: userID.value,
        pass: userPass.value,
      };

      const resData = loginService.userRegister(user);
      resData.then(function (result) {
        console.log("Register page ...:", result);
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

    return {
      userID,
      userPass,
      deviceID,
      registerClick,
    };
  },
};
</script>
<style scoped></style>
