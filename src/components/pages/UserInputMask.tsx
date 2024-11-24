import { useState, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function UserInputMask() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: '',
  });

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleGoClick = () => {
    if (originalUrl) {
      setShortenedUrl('https://google.com');
    }
  };

  const handleTestClick = () => {
    if (shortenedUrl) {
      window.open(shortenedUrl, '_blank');
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 10000);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const handleCopyClick = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        showAlert(
          'success',
          `URL "${shortenedUrl}" has been copied to clipboard!`
        );
      } catch (err) {
        console.error('Failed to copy text: ', err);

        showAlert(
          'error',
          'Failed to copy URL to clipboard. Please try again.'
        );
      }
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {alert.show && (
        <Stack sx={{ width: '150%', mb: 3 }}>
          <Alert severity={alert.type} onClose={handleCloseAlert}>
            <AlertTitle>
              {alert.type === 'success' ? 'SUCCESS' : 'ERROR'}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Stack>
      )}

      <Typography variant="h4" sx={{ mb: 6, textAlign: 'center' }}>
        USER INPUT MASK
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '150%',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="original-url"
          label="Original URL"
          variant="outlined"
          value={originalUrl}
          onChange={handleUrlChange}
          sx={{ width: '100%' }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ ml: 3 }}
          onClick={handleGoClick}
          disabled={!originalUrl}
        >
          Go
        </Button>
      </Box>

      <Divider sx={{ width: '200%', my: 6 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '150%',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="shortened-url"
          label="Shortened URL"
          variant="outlined"
          value={shortenedUrl}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ width: '100%' }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ ml: 3 }}
          onClick={handleTestClick}
          disabled={!shortenedUrl}
        >
          Test
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ ml: 3 }}
          onClick={handleCopyClick}
          disabled={!shortenedUrl}
        >
          Copy
        </Button>
      </Box>
    </Box>
  );
}
