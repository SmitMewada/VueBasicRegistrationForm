<template>
  <div class="control">
    <label for="">{{ label }}</label>

    <div class="radios">
      <div v-for="(item, index) in data" :key="index">
        <label for="">{{ item.label }}</label>
        <input
          type="radio"
          :value="item.value"
          :name="item.label"
          v-model="radioValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :checked='value === item.value'
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BinaryRadios",
  props: {
    label: String,
    value: Boolean,
    data: Array,
  },
  data() {
    return {
      radioValue: undefined,
    };
  }
};
</script>

<style scoped>
.radios {
  margin: 0.5rem 0;
  width: 10rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}



.radios label {
    margin-right: 00.5rem;
}

</style>