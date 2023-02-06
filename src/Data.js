export const data = [
  {
    id: 1,
    type: "article",
    title: "How to set your homepage",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.",
  },
  {
    id: 2,
    type: "article",
    title: "How to create pages",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci ac auctor augue mauris augue neque gravida in fermentum. Magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tincidunt ornare massa eget egestas. Odio ut sem nulla pharetra diam. Quis imperdiet massa tincidunt nunc pulvinar sapien. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet commodo nulla facilisi nullam vehicula ipsum. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Orci eu lobortis elementum nibh. Pulvinar mattis nunc sed blandit libero volutpat sed. Elementum facilisis leo vel fringilla est.",
  },
  {
    id: 3,
    type: "video",
    title: "How to create a user in WordPress",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
export const getArticleById = (id) => data.find((x) => x.id == id);
