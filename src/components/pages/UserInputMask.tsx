import { useState, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function UserInputMask() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

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

  const handleCopyClick = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
