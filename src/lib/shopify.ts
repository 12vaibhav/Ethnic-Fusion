const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(/['"]+/g, '').trim();
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.replace(/['"]+/g, '').trim();

async function shopifyFetch({ query, variables = {} }: { query: string, variables?: any }) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('Shopify credentials missing. Skipping fetch.');
    return null;
  }
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
  
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
            description
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
    description: node.description,
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
        description
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
    description: product.description,
    images: product.images.edges.map(({ node }: any) => node.url),
    price: parseFloat(product.variants.edges[0].node.price.amount),
    variants: product.variants.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price.amount),
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
