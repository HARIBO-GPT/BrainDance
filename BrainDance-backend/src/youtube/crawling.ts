import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

interface SearchType {
    q: string;
    type: string;
    part: string;
    maxResults: number;
}

const apiKey = process.env.YOUTUBE_API_KEY;

export async function getYoutubeVideos(query: string[], maxResults: number = 5): Promise<string> {
  const youtube = google.youtube({ version: 'v3', auth: apiKey });
  const searchQuery: string = query.join(' ');
  const response = await youtube.search.list({
    q: searchQuery,
    part: 'id,snippet',
    type: 'video',
    maxResults: maxResults
  } as any);
  
  const videoUrls: string[] = response.data.items?.map((item) => {
    const videoId = item.id?.videoId;
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
  }) || [];
  
  if (videoUrls.length === 0) {
    const response2 = await youtube.search.list({
      q: [query[0]],
      part: 'id,snippet',
      type: 'video',
      maxResults: maxResults
    } as any);

    const videoUrls2: string[] = response2.data.items?.map((item) => {
      const videoId = item.id?.videoId;
      return videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
    }) || [];

    return videoUrls2.join(', ');
  }
  else {
    return videoUrls.join(', ');
  }
}