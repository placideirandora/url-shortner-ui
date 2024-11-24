import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_AUTH_USERNAME;
const PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;

const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);

interface UrlResponse {
  id: string;
  url: string;
  ttlInSeconds: number | null;
  createdDate: string;
  modifiedDate: string;
}

const LoadingSkeleton = () => (
  <TableBody>
    {[...Array(9)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default function AdminOverview() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get<UrlResponse[]>(
          `${API_BASE_URL}/urls`,
          {
            headers: {
              Authorization: `Basic ${basicAuth}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUrls(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch URLs');
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        URL MANAGEMENT DASHBOARD
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="URLs table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>TTL (seconds)</TableCell>
              <TableCell>Creation-DateTime</TableCell>
              <TableCell>Last-Changed-DateTime</TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <TableBody>
              {urls.map((url) => (
                <TableRow
                  key={url.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {url.id}
                  </TableCell>
                  <TableCell>{url.url}</TableCell>
                  <TableCell>{url.ttlInSeconds ?? 'No expiration'}</TableCell>
                  <TableCell>
                    {new Date(url.createdDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(url.modifiedDate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
