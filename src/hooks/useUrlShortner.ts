import axios from 'axios';
import { useState } from 'react';

interface UrlResponse {
  id: string;
  url: string;
  ttlInSeconds: number | null;
  createdDate: string;
  modifiedDate: string;
}

interface EnhancedUrlResponse extends UrlResponse {
  shortenedUrl: string;
}

interface ApiError {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_AUTH_USERNAME;
const PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;

const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);

export const useUrlShortener = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const shortenUrl = async (
    originalUrl: string
  ): Promise<EnhancedUrlResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<UrlResponse>(
        `${API_BASE_URL}/urls`,
        { url: originalUrl },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        ...response.data,
        shortenedUrl: `${API_BASE_URL}/${response.data.id}`,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred while shortening the URL';
      setError({ message: errorMessage });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    shortenUrl,
    loading,
    error,
  };
};
