'use client'; // This is required for client-side interactions in Next.js

import { useEffect, useState } from 'react';

export default function Home() {
  const [news, setNews] = useState([]);

  // This is where your loadNews logic lives
  async function loadNews() {
    const response = await fetch('/api/fetch-news');
    const data = await response.json();
    
    // After the API updates the DB, you would typically fetch the items 
    // from your database via another API route or server action.
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <main>
      <h1>Child Nutrition Updates</h1>
      {/* Map through your news array here */}
    </main>
  );
}
