import {
  HiiveAnalytics,
  HiiveEvent,
} from "@newfold-labs/js-utility-ui-analytics";
import apiFetch from "@wordpress/api-fetch";

const base = "nfd-help-center/v1";

export const InteractionAPIs = {
  postFeedback: (postId, status) =>
    apiFetch({
      path: base + "/feedback",
      method: "POST",
      data: {
        post_id: postId,
        status: status,
      },
    }),
};

// A wrapper to get and set things more easily
export const LocalStorageUtils = {
  updateHelpVisible: (visible) => {
    localStorage.setItem("helpVisible", visible ? "true" : "false");
  },
  getHelpVisible: () => {
    return localStorage.getItem("helpVisible") === "true";
  },
  persistResult: (resultContent, postId) => {
    localStorage.setItem("helpResultContent", resultContent);
    localStorage.setItem("helpPostId", postId);
  },
  persistSearchInput: (searchInput) => {
    localStorage.setItem("searchInput", searchInput);
  },
  clear: () => {
    localStorage.removeItem("helpResultContent");
    localStorage.removeItem("helpPostId");
    localStorage.removeItem("searchInput");
  },
  getResultInfo: () => {
    return {
      content: localStorage.getItem("helpResultContent"),
      postId: localStorage.getItem("helpPostId"),
    };
  },
  getSearchInput: () => {
    return localStorage.getItem("searchInput");
  },
};

export const Analytics = {
  sendEvent: (event, data) => {
    const hiiveEvent = new HiiveEvent("nfd-help-center", event, {
      value: data,
      time: new Date(),
    });
    HiiveAnalytics.send(hiiveEvent);
  },
};