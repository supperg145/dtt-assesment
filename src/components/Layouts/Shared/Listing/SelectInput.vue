<template>
  <div class="form-group">
    <label :for="id">{{ label }}*</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>Select an option</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    modelValue: Boolean,
  },
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 16px;
}

select {
  padding: 12px;
  font-size: 14px;
  width: 100%;
  border: none;
  height: 60px;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-size: 16px;
  background-position: right 12px center;
  background-repeat: no-repeat;
}
</style>
