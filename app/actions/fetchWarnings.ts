'use server'

import { WarningResponse, Warning } from '../types/warnings'

export async function fetchWarnings(start: number = 0, fromDate?: string): Promise<Warning[]> {
  const defaultFromDate = new Date();
  defaultFromDate.setMonth(defaultFromDate.getMonth() - 3); // Default to 3 months ago

  const fromDateTimestamp = fromDate 
    ? new Date(fromDate).getTime() 
    : defaultFromDate.getTime();

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
        fq: [`publishedDate > ${fromDateTimestamp}`]
      },
      products: {
        rows: 10,
        sort: "publishedDate desc, title asc",
        start: start,
        fq: [`publishedDate > ${fromDateTimestamp}`]
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

  return data.response.docs;
}

