import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types';
import { userService } from '@/services/apiClient';
import TextLink from '../text-link';
import { Link } from '@inertiajs/react';

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userService.getUsers();
            if (response.success && response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            alert('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadges = (roles: User['roles']) => {
        return roles.map(role => (
            <span
                key={role.id}
                className="inline-flex items-center px-2 py-1 mr-1 mb-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
            >
                {role.name}
            </span>
        ));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className=" mx-auto mt-8 p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Users Management</h2>

                <Link href={'/create-user'}>Add User</Link>
            </div>

            {users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No users found.
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead className="text-right">Created Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">#{user.id}</TableCell>
                                <TableCell className="font-semibold">{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap">
                                        {getRoleBadges(user.roles)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right text-sm text-gray-600">
                                    {new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total Users</TableCell>
                            <TableCell className="text-right font-semibold">
                                {users.length} {users.length === 1 ? 'user' : 'users'}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </div>
    );
};

export default UserTable;
