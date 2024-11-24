import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function UserInputMask() {
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
          sx={{ width: '100%' }}
        />
        <Button variant="contained" size="large" sx={{ ml: 3 }}>
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
          sx={{ width: '100%' }}
        />
        <Button variant="contained" size="large" sx={{ ml: 3 }}>
          Test
        </Button>
        <Button variant="contained" size="large" sx={{ ml: 3 }}>
          Copy
        </Button>
      </Box>
    </Box>
  );
}
