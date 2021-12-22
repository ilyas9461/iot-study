<template>
  <div class="grid grid-nogutter text-700">
    <div class="col-12 md:col-5 pl-8 md:text-left flex align-items-center">
      <RegisterForm />
    </div>
    <div class="col-12 md:col-7 overflow-hidden surface-card p-4 shadow-2 border-round">
      <div class="text-center text-4xl text-primary font-bold mb-2">Smart Lock IOT Service Register</div>

      <p class="text-center mt-0 mb-4 text-600 line-height-3 ">
        Access the doors and device you want to control and their status from anywhere.
      </p>
      <div class="p-d-flex">
        <div class="p-mr-2"><img
            src="..\assets\images\wifi_lock.jpeg"
            alt="Image"
            style="clip-path: circle(50%)"
          /></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Register",
  components: {
    RegisterForm,
  },
  setup() {},
};
</script>
