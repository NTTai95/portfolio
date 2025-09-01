// screens/create-job/index.tsx
import React from 'react';
import { StepProvider } from './_ui/ContextStep';
import StepJob from './_ui/Step';

export default function PostAJobPage() {
    return (
        <StepProvider>
            <StepJob />
        </StepProvider>
    )
}