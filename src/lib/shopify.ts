const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  ?.replace(/['"]+/g, '') // Remove quotes
  ?.replace(/^https?:\/\//, '') // Remove http:// or https://
  ?.replace(/\/+$/, '') // Remove trailing slashes
  ?.trim();

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.replace(/['"]+/g, '').trim();

async function shopifyFetch({ query, variables = {} }: { query: string, variables?: any }) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('Shopify credentials missing. Skipping fetch.');
    return null;
  }
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
  console.log('Attempting to fetch from:', endpoint);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Shopify GraphQL Errors:', result.errors);
      return null;
    }

    if (!response.ok) {
      console.error('Shopify HTTP Error:', response.status, response.statusText);
      return null;
    }

    console.log('Shopify Data Received:', result.data);
    return result.data;
  } catch (error) {
    console.error('Network Error fetching from Shopify:', error);
    return null;
  }
}

export const getProducts = async () => {
  const query = `
    query getProducts {
      products(first: 20, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            tags
            productType
            collections(first: 5) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  if (!data) return [];

  return data.products.edges.map(({ node }: any) => ({
    id: node.id,
    name: node.title,
    handle: node.handle,
    price: parseFloat(node.variants.edges[0].node.price.amount),
    originalPrice: node.variants.edges[0].node.compareAtPrice ? parseFloat(node.variants.edges[0].node.compareAtPrice.amount) : undefined,
    image: node.images.edges[0]?.node.url || '',
    category: node.productType,
    collections: node.collections.edges.map(({ node: col }: any) => col.title),
    collectionHandles: node.collections.edges.map(({ node: col }: any) => col.handle),
    description: node.descriptionHtml,
    variantId: node.variants.edges[0].node.id,
    tags: node.tags || [],
  }));
};

export const getProductByHandle = async (handle: string) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query, variables: { handle } });
  if (!data || !data.product) return null;

  const product = data.product;
  return {
    id: product.id,
    name: product.title,
    handle: product.handle,
    description: product.descriptionHtml,
    images: product.images.edges.map(({ node }: any) => node.url),
    image: product.images.edges[0]?.node.url || '',
    price: parseFloat(product.variants.edges[0].node.price.amount),
    originalPrice: product.variants.edges[0].node.compareAtPrice ? parseFloat(product.variants.edges[0].node.compareAtPrice.amount) : undefined,
    variants: product.variants.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price.amount),
      selectedOptions: node.selectedOptions,
    })),
  };
};

export const createCheckout = async (lineItems: { variantId: string, quantity: number }[]) => {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems,
    },
  };

  const data = await shopifyFetch({ query, variables });
  return data?.checkoutCreate?.checkout?.webUrl;
};

export const getCollections = async () => {
  const query = `
    query getCollections {
      collections(first: 4) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  if (!data?.collections) return [];

  return data.collections.edges.map(({ node }: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.image?.url || '',
  }));
};
