import axios from 'axios';
import { useState, useEffect, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Edit from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialogContent from '@mui/material/DialogContent';
import AlertDialogActions from '@mui/material/DialogActions';

import { useUrl } from '../../hooks/useUrl';
import { generateId } from '../../utils/generateId';

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

interface DialogState {
  open: boolean;
  url: UrlResponse | null;
}

interface DeleteDialogState {
  open: boolean;
  urlId: string | null;
}

interface AddDialogState {
  open: boolean;
  newId: string;
  newUrl: string;
}

const LoadingSkeleton = () => (
  <>
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
        <TableCell>
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default function AdminOverview() {
  const { setEditedUrl } = useUrl();
  const [urls, setUrls] = useState<UrlResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialog, setEditDialog] = useState<DialogState>({
    open: false,
    url: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    urlId: null,
  });
  const [addDialog, setAddDialog] = useState<AddDialogState>({
    open: false,
    newId: '',
    newUrl: '',
  });
  const [editUrl, setEditUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/urls`, {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/json',
          },
        });
        setUrls(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch URLs');
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  const handleAddClick = () => {
    setAddDialog({
      open: true,
      newId: generateId(),
      newUrl: '',
    });
  };

  const handleAddSave = async () => {
    setIsAdding(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/urls/${addDialog.newId}`,
        {
          url: addDialog.newUrl,
        },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUrls([...urls, response.data]);
      setAddDialog({ open: false, newId: '', newUrl: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add URL');
    } finally {
      setIsAdding(false);
    }
  };

  const handleCloseAddDialog = (
    _event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (isAdding) return;

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setAddDialog({ open: false, newId: '', newUrl: '' });
    }
  };

  const handleCancelAdd = () => {
    if (isAdding) return;
    setAddDialog({ open: false, newId: '', newUrl: '' });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteDialog({ open: true, urlId: id });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.urlId) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/urls/${deleteDialog.urlId}`, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      });
      setUrls(urls.filter((url) => url.id !== deleteDialog.urlId));
      setDeleteDialog({ open: false, urlId: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete URL');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteDialog = (
    _event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (isDeleting) return;

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setDeleteDialog({ open: false, urlId: null });
    }
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setDeleteDialog({ open: false, urlId: null });
  };

  const handleEdit = (url: UrlResponse) => {
    setEditDialog({ open: true, url });
    setEditUrl(url.url);
  };

  const handleSave = async () => {
    if (!editDialog.url) return;

    setIsSaving(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/urls/${editDialog.url.id}`,
        {
          url: editUrl,
          ttlInSeconds: editDialog.url.ttlInSeconds,
        },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUrls(
        urls.map((url) => (url.id === editDialog.url?.id ? response.data : url))
      );
      setEditedUrl(editUrl);
      setEditDialog({ open: false, url: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update URL');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseEditDialog = (
    _event: SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (isSaving) return;

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setEditDialog({ open: false, url: null });
      setEditUrl('');
    }
  };

  const handleCancelEdit = () => {
    if (isSaving) return;
    setEditDialog({ open: false, url: null });
    setEditUrl('');
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        URL MANAGEMENT DASHBOARD
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={handleAddClick}
                >
                  Add New
                </Button>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>TTL (seconds)</TableCell>
              <TableCell>Creation-DateTime</TableCell>
              <TableCell>Last-Changed-DateTime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(url)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(url.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{url.id}</TableCell>
                  <TableCell>{url.url}</TableCell>
                  <TableCell>{url.ttlInSeconds ?? 'No expiration'}</TableCell>
                  <TableCell>
                    {new Date(url.createdDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(url.modifiedDate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog
        open={addDialog.open}
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New URL</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            value={addDialog.newId}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              mt: 2,
              '& .MuiInputBase-input': {
                fontSize: '1.1rem',
                padding: '14px 14px',
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="text"
            fullWidth
            value={addDialog.newUrl}
            onChange={(e) =>
              setAddDialog((prev) => ({ ...prev, newUrl: e.target.value }))
            }
            sx={{
              mt: 2,
              '& .MuiInputBase-input': {
                fontSize: '1.1rem',
                padding: '14px 14px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd} disabled={isAdding}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSave}
            variant="contained"
            disabled={isAdding || !addDialog.newUrl}
            startIcon={
              isAdding ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isAdding ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="text"
            fullWidth
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            sx={{
              mt: 2,
              '& .MuiInputBase-input': {
                fontSize: '1.1rem',
                padding: '14px 14px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isSaving}
            startIcon={
              isSaving ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialog.open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <AlertDialogContent>
          Are you sure you want to delete this URL? This action cannot be
          undone.
        </AlertDialogContent>
        <AlertDialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={
              isDeleting ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogActions>
      </AlertDialog>
    </>
  );
}
