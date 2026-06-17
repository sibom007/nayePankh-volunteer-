"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Role } from "@/generated/prisma/enums";

import { RolesError } from "@/feature/dashboard/roles/components/roles-error";
import { RolesLoading } from "@/feature/dashboard/roles/components/roles-loading";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RolesList = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    trpc.admin.getUsers.queryOptions(),
  );

  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});

  const updateRole = useMutation(
    trpc.admin.updateUserRole.mutationOptions({
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: trpc.admin.getUsers.queryOptions().queryKey,
        });
      },
    }),
  );

  const handleRoleChange = (userId: string, role: Role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: role,
    }));
  };

  const handleSave = async (userId: string) => {
    const role = selectedRoles[userId];

    if (!role) return;

    await updateRole.mutateAsync({
      userId,
      role,
    });

    setSelectedRoles((prev) => {
      const next = { ...prev };
      delete next[userId];
      return next;
    });
  };

  const users = data || [];
  if (isLoading) return <RolesLoading />;
  if (error) return <RolesError />;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>

        <p className="text-muted-foreground">
          Manage user permissions and roles.
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Assign Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => {
              const currentRole = selectedRoles[user.id] ?? user.role;

              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>

                  <TableCell>
                    <Select
                      value={currentRole}
                      onValueChange={(value) =>
                        handleRoleChange(user.id, value as Role)
                      }>
                      <SelectTrigger className="w-44">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={Role.ADMIN}>ADMIN</SelectItem>

                        <SelectItem value={Role.VOLUNTEER}>
                          VOLUNTEER
                        </SelectItem>

                        <SelectItem value={Role.USER}>USER</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      disabled={
                        updateRole.isPending || currentRole === user.role
                      }
                      onClick={() => handleSave(user.id)}
                      isLoading={updateRole.isPending}>
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
