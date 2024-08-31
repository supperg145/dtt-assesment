<template>
  <div class="form-group">
    <label :for="id">{{ label }}*</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    modelValue: [String, Number],
  },
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 16px;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  padding: 12px;
  font-size: 14px;
  width: 100%;
  border: none;
  height: 60px;
  border-radius: 8px;
}
</style>
