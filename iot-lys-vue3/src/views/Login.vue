<template>
  <div class="grid grid-nogutter text-700">
    <div class="col-12 md:col-6 lg:pl-8 sm:pl-1md:text-left flex align-items-center">
      <SingIn />
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <p class="text-center mt-0 mb-4 text-600 line-height-3">
        Access the doors you want to open and their status from anywhere.
        <br>
        Record logins for your security.
        <img src="..\assets\images\login.svg" alt="Image" style="clip-path: circle(40%)" />
      </p>
    </div>
  </div>
</template>

<script>
import SingIn from "@/components/SingIn.vue";
// @ is an alias to /src

export default {
  name: "Login",
  components: {
    SingIn,
  },
};
</script>
