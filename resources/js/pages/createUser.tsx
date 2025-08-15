import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import UserForm from '@/components/users/user-form';
import UserTable from '@/components/users/user-table';
import GuestLayout from '@/layouts/guest-layout';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const handleSuccess = () => {
        router.visit('/');
    }

    return (
        <>
            <GuestLayout>
                <UserForm onSuccess={handleSuccess} />
            </GuestLayout>
        </>
    );
}
