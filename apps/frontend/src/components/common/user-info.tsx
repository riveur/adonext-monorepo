"use client";

import useAuth from "@/hooks/use-auth";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";

export default function UserInfo() {
  const user = useAuth();
  const formatter = new Intl.DateTimeFormat("default");

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pb-0">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableCell>{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Created at</TableHead>
              <TableCell>{formatter.format(new Date(user.created_at))}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Updated at</TableHead>
              <TableCell>{formatter.format(new Date(user.updated_at))}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}