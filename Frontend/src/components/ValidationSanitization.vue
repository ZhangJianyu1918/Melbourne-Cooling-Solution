<template>
    <div>
      <input
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
      />
      <p v-if="!isValid" class="text-red-500">Invalid input!</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      placeholder: String,
      rules: {
        type: Function,
        default: val => /^[a-zA-Z0-9\s]*$/.test(val), // default: alphanumeric + spaces
      },
    },
    computed: {
      isValid() {
        return this.rules(this.modelValue);
      },
    },
    methods: {
      onInput(event) {
        let value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // sanitize
        this.$emit('update:modelValue', value);
      },
    },
  };
  </script>