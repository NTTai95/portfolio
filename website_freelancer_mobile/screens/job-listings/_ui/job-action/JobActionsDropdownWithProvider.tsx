// JobActionsDropdownWithProvider.tsx
import React from 'react';
import { ModalProvider } from './ModalProvider';
import { JobActionsDropdown } from './JobActionsDropdown';
import { JobListing } from '../types';

interface JobActionsDropdownWithProviderProps {
    job: JobListing;
    onRefresh: () => void;
}

export const JobActionsDropdownWithProvider = (props: JobActionsDropdownWithProviderProps) => (
    <ModalProvider>
        <JobActionsDropdown {...props} />
    </ModalProvider>
);