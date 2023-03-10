export const data = [
  {
    id: 1,
    type: "article",
    title: "How to set your homepage",
    rawContent: `# Product Types Explained
## Overview

One of the key features of WooCommerce is its ability to create different types of products to suit your needs. In this article, we will discuss the different product types available in WooCommerce and their uses.

- **Simple Product**: A simple product is the most basic product type in WooCommerce. It represents a single item that can be purchased, such as a t-shirt or a book. Simple products can have variations, such as different colors or sizes, but they do not have any additional options.

- **Grouped Product**: A grouped product is a collection of related simple products. It allows customers to purchase multiple products at once and also you can show them as a set. For example, you could group together a set of pens with different colors and allow customers to purchase the entire set or individual pens.

- **Virtual Product**: A virtual product is a product that doesn't have any physical characteristics. For example, a PDF file, a software or a service. These products do not require shipping, and the customer can download them directly from the website after purchasing.

- **Downloadable Product**: A downloadable product is a digital product that can be downloaded by the customer after purchase. This product type is used for products like music, videos, e-books, and software. The customer can download the product from the "My Account" page, and you can also add a limit for number of downloads

- **Variable Product**: A variable product is a product that has multiple variations, such as different sizes or colors. This product type allows customers to select the variation they want before purchasing. For example, you could create a variable product for a t-shirt with different sizes and colors as options.

- **External/Affiliate Product**: An external or affiliate product is a product that is not managed by you, but by an external website. This product type allows you to add products from external websites, such as Amazon or another e-commerce platform, and sell them on your own website. Customers are redirected to the external website to complete their purchase, and you will receive a commission for each sale.

<p>In summary, WooCommerce provides a wide range of product types to suit different needs.</p>
Simple products are the most basic product type, while grouped, virtual, and downloadable products offer additional functionality. Variable products allow customers to select variations of the product, and external/affiliate products allow you to sell products from external websites. By understanding these different product types, you can choose the best option for your online store and start selling your products or services.
`,
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
