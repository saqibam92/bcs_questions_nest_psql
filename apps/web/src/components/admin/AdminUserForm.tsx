// components/admin/AdminUserForm.tsx

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";

import { Admin, Role } from "@/types";
import { ROLE_HIERARCHY } from "@/lib/roleHierarchy";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Admin>) => void;
  currentUserRole: Role;
  admin?: Admin;
}

const roles: Role[] = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "EDITOR", "VIEWER"];

export const AdminUserForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  currentUserRole,
  admin,
}) => {
  const [name, setName] = useState(admin?.name ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [role, setRole] = useState<Role>(admin?.role ?? "VIEWER");

  const availableRoles = roles.filter(
    (r) => ROLE_HIERARCHY[currentUserRole] > ROLE_HIERARCHY[r],
  );

  const handleSubmit = () => {
    onSubmit({
      name,
      email,
      role,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {admin ? "Update Admin Role" : "Create New Admin"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            disabled={!!admin}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            disabled={!!admin}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            {availableRoles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSubmit}>
              {admin ? "Update Role" : "Create Admin"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};