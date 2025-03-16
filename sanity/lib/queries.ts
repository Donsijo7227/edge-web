// sanity/lib/queries.ts

import { client } from '../lib/client';

/**
 * Fetch all bursary page data in a single query
 */
export async function getBursaryPageData() {
  const query = `{
    "pageData": *[_type == "bursaryPage"][0]{
      title,
      introduction
    },
    "bursaries": *[_type == "bursary"] | order(order asc) {
      _id,
      title,
      description,
      website,
      contactPerson,
      contactEmail,
      order
    },
    "applicationSteps": *[_type == "applicationSteps"] | order(order asc) {
      _id,
      title,
      "bursaryId": bursary->_id,
      "bursaryTitle": bursary->title,
      steps[] {
        stepTitle,
        "stepImage": stepImage.asset->url,
        stepDescription
      },
      order
    },
    "importantDates": *[_type == "importantDate"] | order(order asc) {
      _id,
      title,
      month,
      day,
      description,
      order
    }
  }`;

  return await client.fetch(query);
}