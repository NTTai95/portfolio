// src/app/accept-milestones/[id]/_ui/ContextMilestone.tsx
import { apiGet } from "@/api/baseApi";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface MilestoneContextType {
    data: any;
    fetchData: () => Promise<void>;
    loading: boolean;
}

const MilestoneContext = createContext<MilestoneContextType | undefined>(undefined);

interface MilestoneProviderProps {
    children: ReactNode;
}

export const MilestoneProvider: React.FC<MilestoneProviderProps> = ({ children }) => {
    const route: RouteProp<RootStackParamList, 'milestone'> = useRoute();
    const jobId = route.params.id

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await apiGet(`/jobs/${jobId}/milestones`);
            setData(res.data);
        } catch (err) {
            console.error(err);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [jobId]);

    return (
        <MilestoneContext.Provider value={{ data, fetchData, loading }}>
            {children}
        </MilestoneContext.Provider>
    );
};

export const useMilestones = (): MilestoneContextType => {
    const context = useContext(MilestoneContext);
    if (!context) {
        throw new Error("useMilestones must be used within a MilestoneProvider");
    }
    return context;
};