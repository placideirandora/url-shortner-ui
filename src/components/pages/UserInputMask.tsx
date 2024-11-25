import { useTranslation } from 'react-i18next';
import { useState, useEffect, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useUrl } from '../../hooks/useUrl';
import { useUrlShortener } from '../../hooks/useUrlShortner';

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function UserInputMask() {
  const { t } = useTranslation();
  const { editedUrl } = useUrl();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: '',
  });

  const { shortenUrl, loading, error } = useUrlShortener();

  useEffect(() => {
    if (editedUrl) {
      setOriginalUrl(editedUrl);
    }
  }, [editedUrl]);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleGoClick = async () => {
    if (originalUrl) {
      const response = await shortenUrl(originalUrl);

      if (response) {
        setShortenedUrl(`${response.shortenedUrl}`);
      } else if (error) {
        showAlert('error', error.message);
      }
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
    }, 5000);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const handleCopyClick = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        showAlert('success', t('alerts.copySuccess', { url: shortenedUrl }));
      } catch (err) {
        console.error('Failed to copy text: ', err);
        showAlert('error', t('alerts.copyError'));
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
              {alert.type === 'success' ? t('alerts.success') : t('alerts.error')}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Stack>
      )}

      <Typography variant="h4" sx={{ mb: 6, textAlign: 'center' }}>
        {t('user.title')}
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
          label={`${t('user.originalUrl')}`}
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
          disabled={!originalUrl || loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('user.go')
          )}
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
          label={`${t('user.shortenedUrl')}`}
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
          {t('user.test')}
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ ml: 3 }}
          onClick={handleCopyClick}
          disabled={!shortenedUrl}
        >
          {t('user.copy')}
        </Button>
      </Box>
    </Box>
  );
}
