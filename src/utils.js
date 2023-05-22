import apiFetch from "@wordpress/api-fetch";

const base = "nfd-help/v1";

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
  getResultInfo: () => {
    return {
      content: localStorage.getItem("helpResultContent"),
      postId: localStorage.getItem("helpPostId")
    };
  },
  getSearchInput: () => {
    return localStorage.getItem("searchInput");
  }
}
