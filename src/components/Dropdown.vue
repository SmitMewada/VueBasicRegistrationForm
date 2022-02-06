<template>
  <div class="control">
    <label for="">{{ label }}</label>
    <select name="" id="" @input="$emit('update:modelValue', $event.target.value)" :value="value">
      <option :value="option" v-for="(option, index) in options" :key="index" >{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    label: String,
    options: Array,
    value: String
  },
};
</script>

<style scoped>
select {
  padding: 0.7rem 1rem;
  margin: 0.5rem 0;
  outline: none;
  border-radius: 00.5rem;
  border: 1px solid #000000;
}
</style>