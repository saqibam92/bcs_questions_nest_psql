// apps/web/src/app/admin/users/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

import { Add } from "@mui/icons-material";
import toast from "react-hot-toast";

import { useAuth } from "@/contexts/AuthContext";

import { AdminUser } from "@/types/admin";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "@/services/adminUsers";

import AdminUserTable from "@/components/admin/AdminUserTable";
import AdminUserForm from "@/components/admin/AdminUserForm";

export default function AdminUsersPage() {
  const { user } = useAuth();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<AdminUser | null>(null);

  const fetchAdmins = async () => {
    try {
      const res = await getAdmins();
      setAdmins(res.data);
    } catch {
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSave = async (data: any) => {
    const apiCall = selected
      ? updateAdmin(selected.id, data)
      : createAdmin(data);

    await toast.promise(apiCall, {
      loading: "Saving...",
      success: () => {
        fetchAdmins();
        setOpen(false);
        return "Saved successfully";
      },
      error: "Operation failed",
    });
  };

  const handleDelete = async (id: string) => {
    await toast.promise(deleteAdmin(id), {
      loading: "Deleting...",
      success: () => {
        fetchAdmins();
        return "Deleted";
      },
      error: "Delete failed",
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography variant="h4">Admin Management</Typography>

        {user?.role === "SUPER_ADMIN" && (
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => {
              setSelected(null);
              setOpen(true);
            }}
          >
            Create Admin
          </Button>
        )}
      </Box>

      <AdminUserTable
        admins={admins}
        onEdit={(u) => {
          setSelected(u);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <AdminUserForm
        open={open}
        user={selected}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
}