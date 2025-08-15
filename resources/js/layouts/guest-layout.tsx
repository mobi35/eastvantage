import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';



export default function GuestLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    );
}
