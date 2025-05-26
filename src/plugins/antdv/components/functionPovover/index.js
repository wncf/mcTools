import MyPopover from "./popover.vue";
import { createApp, h } from "vue";

const createIntance = ($el, options) => {
  return createApp(
    h(
      MyPopover,
      {
        reference: $el,
        ...options,
      },
      {
        default: () => h("div"),
      }
    )
  );
};

export default (app) => {
  app.config.globalProperties.$showPopover = (options) => {
    const mountNode = document.createElement("div");
    const { $el, ...props } = options;
    const instance = createIntance($el, props);
    document.body.appendChild(mountNode);
    instance.mount(mountNode);

    // 如果需要手动控制 Popover 的显示和隐藏，可以通过 ref 或其他方式
    // 例如：instance.component.proxy.visible = true;
  };
};
