<template>
  <div class="control">
    <label for="">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="name"
      :value="value"
    />

    <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
  </div>
</template>


<script>
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    label: String,
    errors: Array,
    name: String,
    value: String
  }
};
</script>

<style scoped>
input {
  padding: 0.7rem 1rem;
  border-radius: 00.5rem;
  border: 1px solid black;
}

label {
  margin: 0.5rem 0;
}
p {
  color: red;
}
</style>