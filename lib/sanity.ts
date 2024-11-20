// import { createClient } from 'next-sanity';
// import imageUrlBuilder from '@sanity/image-url';

// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
//   useCdn: process.env.NODE_ENV === 'production',
// });

// const builder = imageUrlBuilder(client);

// export function urlFor(source: any) {
//   return builder.image(source);
// }

// import { createClient } from 'next-sanity';
// import imageUrlBuilder from '@sanity/image-url';

// if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
//   throw new Error('Sanity configuration is missing. Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set.');
// }

// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01',
//   useCdn: process.env.NODE_ENV === 'production',
// });

// const builder = imageUrlBuilder(client);

// export function urlFor(source: any) {
//   return builder.image(source);
// }
