// components/admin/AdminUserTable.tsx

"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Paper,
  TableContainer,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Admin, Role } from "@/types";
import { canManageRole } from "@/lib/roleHierarchy";

interface Props {
  admins: Admin[];
  currentUserRole: Role;
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
}

export const AdminUserTable: React.FC<Props> = ({
  admins,
  currentUserRole,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {admins.map((admin) => {
            const canManage = canManageRole(currentUserRole, admin.role);

            return (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>

                <TableCell>
                  <Chip label={admin.role} size="small" />
                </TableCell>

                <TableCell>
                  {new Date(admin.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  {canManage && (
                    <>
                      <IconButton onClick={() => onEdit(admin)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => onDelete(admin)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};