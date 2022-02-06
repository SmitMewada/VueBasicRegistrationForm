<template>
  <button :class="[btnClass, 'btn']">{{ text }}</button>

</template>

<script>

export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "text",
    },
    btnClass: {
      type: String,
      default: "",
    },
  }
};
</script>

<style scoped>

</style>