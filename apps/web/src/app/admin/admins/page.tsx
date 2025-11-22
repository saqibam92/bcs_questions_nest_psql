// apps/web/src/app/admin/admins/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Box, Button, Container, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Typography, Dialog, 
  DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Chip 
} from '@mui/material';
import { Add, Delete, Security } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function ManageAdminsPage() {
  const { admin } = useAdminAuth(); // Get current logged-in admin
  const [admins, setAdmins] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VIEWER'
  });

  // Allowed roles based on hierarchy
  const getAllowedRoles = () => {
    if (admin?.role === 'SUPER_ADMIN') {
      return ['ADMIN', 'MODERATOR', 'EDITOR', 'VIEWER'];
    }
    if (admin?.role === 'ADMIN') {
      return ['MODERATOR', 'EDITOR', 'VIEWER'];
    }
    return [];
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data } = await api.get('/admins');
      setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post('/admins', formData);
      toast.success("Admin created successfully");
      setOpen(false);
      fetchAdmins();
      setFormData({ name: '', email: '', password: '', role: 'VIEWER' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create");
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this admin?")) return;
    try {
      await api.delete(`/admins/${id}`);
      toast.success("Deleted");
      fetchAdmins();
    } catch (error: any) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Manage Team</Typography>
        {['SUPER_ADMIN', 'ADMIN'].includes(admin?.role || '') && (
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Create New Admin
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              {admin?.role === 'SUPER_ADMIN' && <TableCell align="right">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.role} 
                    size="small" 
                    color={row.role === 'SUPER_ADMIN' ? 'primary' : row.role === 'ADMIN' ? 'secondary' : 'default'}
                    icon={<Security fontSize="small"/>}
                  />
                </TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                {admin?.role === 'SUPER_ADMIN' && (
                  <TableCell align="right">
                    {row.role !== 'SUPER_ADMIN' && (
                      <Button color="error" onClick={() => handleDelete(row.id)}><Delete /></Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField 
              label="Name" 
              fullWidth 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <TextField 
              label="Email" 
              fullWidth 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <TextField
              select
              label="Role"
              fullWidth
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              {getAllowedRoles().map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}