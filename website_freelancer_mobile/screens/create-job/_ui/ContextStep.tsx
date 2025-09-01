// screens/create-job/_ui/ContextStep.tsx
import { apiGet, apiPut } from '@/api/baseApi';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface StepContextType {
    step: number;
    updateStep: (next?: boolean) => Promise<void>;
    prev: () => Promise<void>;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(0);
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const id = Number(route.params?.id);

    const updateStep = async (next?: boolean) => {
        if (!id) return;

        apiGet(`/jobs/step/${id}`).then((res) => {
            setStep(Math.min(3, ((res.data as any) - (next ? 0 : 1))));
        });
    };

    const prev = async () => {
        console.log('prev', step);
        if (!id) return;

        apiPut(`/step/job/${id}`, step).then(() => {
            updateStep(false);
        });
    }

    useEffect(() => {
        if (id) {
            updateStep();
        }
    }, [id]);

    return (
        <StepContext.Provider value={{ step, updateStep, prev }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStep = () => {
    const context = useContext(StepContext);
    if (!context) throw new Error('useStep must be used inside StepProvider');
    return context;
};