<template>
  <div class="login">login</div>
</template>

<script>
import { getData } from "api/api.js";

export default {
  async created() {
    const res = await getData();
    console.log(res);
  },
};
</script>

<style>
</style>