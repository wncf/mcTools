<template>
  <Popover title="Title" :open="visible" :getPopupContainer="getPopupContainer">
    <template #content>
      <p>Content</p>
      <p>Content</p>
    </template>
    <slot name="default"> </slot>
  </Popover>
</template>
<script>
import { Popover } from "ant-design-vue";
export default {
  name: "myPopover",
  components: { Popover },
  props: {
    reference: [Object, HTMLElement],
  },
  data() {
    return {
      visible: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getPopupContainer() {
      console.log(this.reference, "this.reference");
      return this.reference;
    },
  },
};
</script>
