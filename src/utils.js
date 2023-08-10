import {
  HiiveAnalytics,
  HiiveEvent,
} from "@newfold-labs/js-utility-ui-analytics";
import apiFetch from "@wordpress/api-fetch";

const base = "nfd-help-center/v1";
const onboardingBase = "newfold-onboarding/v1";

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

export const OnboardingAPIs = {
  getFlowData: () => apiFetch({
    path: onboardingBase + "/flow",
    method: "GET",
  })
}

export const CapabilityAPI = {
  getHelpCenterCapability: () =>
    apiFetch({
      path: base + "/capability",
      method: "GET",
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
  sendEvent: (action, data) => {
    const hiiveEvent = new HiiveEvent("wonder_help", action, data);
    HiiveAnalytics.send(hiiveEvent);
  },
};
