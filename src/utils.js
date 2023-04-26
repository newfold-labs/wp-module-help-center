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
