<template>
  <TextInput
    :id="id"
    :label="label"
    :placeholder="placeholder"
    type="number"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script>
import TextInput from "./TextInput.vue";

export default {
  components: { TextInput },
  props: {
    id: String,
    label: String,
    placeholder: String,
    modelValue: Number,
  },
};
</script>
