<template>
  <div class="form-group">
    <label :for="id">{{ label }}*</label>
    <textarea
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      rows="5"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    placeholder: String,
    modelValue: String,
  },
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 16px;
}

textarea {
  padding: 12px;
  font-size: 14px;
  width: 100%;
  border: none;
  border-radius: 8px;
  resize: none;
  height: 200px;
}
</style>
