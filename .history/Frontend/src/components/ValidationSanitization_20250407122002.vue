<template>
    <div>
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :class="{'border-red-500': !isValid}"
      />
      <p v-if="!isValid" class="text-sm text-red-500">Invalid input</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      placeholder: String,
      type: {
        type: String,
        default: "text"
      },
      rules: {
        type: Function,
        default: val => /^[a-zA-Z0-9\s]*$/.test(val) // Alphanumeric + space by default
      },
      sanitize: {
        type: Function,
        default: val => val.replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
      }
    },
    computed: {
      isValid() {
        return this.rules(this.modelValue);
      }
    },
    methods: {
      handleInput(event) {
        const raw = event.target.value;
        const clean = this.sanitize(raw);
        this.$emit("update:modelValue", clean);
      }
    }
  };
  </script>
  </script>