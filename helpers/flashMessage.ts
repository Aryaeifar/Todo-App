import type {
  FlashMessageParams,
  FlashMessageOptions,
} from "../types/flashMessage";
import { FlashMessagePlugin } from "@smartweb/vue-flash-message";

const getFlashMessageParams = (
  options: FlashMessageOptions,
  params: FlashMessageParams,
  type?: "error" | "warning" | "info" | "success"
) => {
  //@ts-ignore
  params["contentClass"] = params["contentClass"]
    ? (
        params["contentClass"].rtrim() +
        " d-flex flex-column justify-center pa-3"
      ).trim()
    : "d-flex flex-column justify-center pa-3";

  if (type) {
    params.type = type;
  }
  if (params.rtl || (!("rtl" in params) && options.rtl)) {
    //@ts-ignore
    params["blockClass"] = params["blockClass"]
      ? (params["blockClass"].rtrim() + " rtl").trim()
      : "rtl";
  }
  if (options.time && !params?.time) {
    params.time = options.time;
  }
  if (options.position && !params?.position) {
    params.position = options.position;
  }

  return params;
};

const flashMessage = (
  flashMessage: FlashMessagePlugin,
  options: FlashMessageOptions
) => {
  return {
    show: (params: FlashMessageParams) => {
      flashMessage.show(getFlashMessageParams(options, params));
    },
    error: (params: FlashMessageParams) => {
      flashMessage.show(getFlashMessageParams(options, params, "error"));
    },
    warning: (params: FlashMessageParams) => {
      flashMessage.show(getFlashMessageParams(options, params, "warning"));
    },
    info: (params: FlashMessageParams) => {
      flashMessage.show(getFlashMessageParams(options, params, "info"));
    },
    success: (params: FlashMessageParams) => {
      flashMessage.show(getFlashMessageParams(options, params, "success"));
    },
  };
};

export default flashMessage;
