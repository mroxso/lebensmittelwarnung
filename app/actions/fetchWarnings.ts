'use server'

import { WarningResponse, Warning } from '../types/warnings'

export async function fetchWarnings(start: number = 0): Promise<Warning[]> {
  const response = await fetch('https://megov.bayern.de/verbraucherschutz/baystmuv-verbraucherinfo/rest/api/warnings/merged', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'baystmuv-vi-1.0 os=ios, key=9d9e8972-ff15-4943-8fea-117b5a973c61'
    },
    body: JSON.stringify({
      food: {
        rows: 10,
        sort: "publishedDate desc, title asc",
        start: start,
        fq: ["publishedDate > 1630067654000"]
      },
      products: {
        rows: 10,
        sort: "publishedDate desc, title asc",
        start: start,
        fq: ["publishedDate > 1630067654000"]
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch warnings');
  }

  const data: WarningResponse = await response.json();
  
  if (!data.response || !data.response.docs) {
    throw new Error('Unexpected API response structure');
  }

  return data.response.docs.map(warning => ({
    ...warning,
    type: warning.type || 'UNKNOWN'
  }));
}

