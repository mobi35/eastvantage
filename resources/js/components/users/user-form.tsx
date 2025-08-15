import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {toast} from 'sonner'
import { userService } from '@/services/apiClient';

interface UserFormProps {
    onSuccess: () => void;
}


const ROLES = ['Author', 'Editor', 'Subscriber', 'Administrator'];

const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        roles: [] as string[],
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (role: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            roles: checked
                ? [...prev.roles, role]
                : prev.roles.filter(r => r !== role),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {

            const response = await userService.createUser(formData);
            console.log(response)

            if (response.success) {
                alert('User created successfully');
                setFormData({ first_name: '', last_name: '', email: '', roles: [] });
                onSuccess();
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {

                console.log(error)
                alert('Failed to create user. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create User</CardTitle>
                    <CardDescription>
                        Add User
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='grid  grid-cols-1 lg:grid-cols-2 gap-2'>
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name *</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                required
                            />
                            {errors.first_name && (
                                <p className="text-sm text-destructive">{errors.first_name[0]}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name *</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                                required
                            />
                            {errors.last_name && (
                                <p className="text-sm text-destructive">{errors.last_name[0]}</p>
                            )}
                        </div>
</div>


                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email[0]}</p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label>Roles * (Select at least one)</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {ROLES.map(role => (
                                    <div key={role} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`role-${role}`}
                                            checked={formData.roles.includes(role)}
                                            onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
                                        />
                                        <Label
                                            htmlFor={`role-${role}`}
                                            className="text-sm font-normal cursor-pointer"
                                        >
                                            {role}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {errors.roles && (
                                <p className="text-sm text-destructive">{errors.roles[0]}</p>
                            )}
                        </div>

                        {formData.roles.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">Selected Roles:</Label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.roles.map(role => (
                                        <Badge key={role} variant="secondary">
                                            {role}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || formData.roles.length === 0}
                            className="w-full"
                        >
                            {loading ? 'Creating...' : 'Create User'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserForm;
