// hooks/useSearchFreelancers.ts
import { apiSearchFreelancers } from '@/api/detail';
import { ResponseDetail } from '@/types/respones/detail';
import { useEffect, useState } from 'react';

interface SearchFilters {
    keyword?: string;
    skillIds?: number[];
    languageIds?: number[];
    minReputation?: number;
    maxReputation?: number;
    isMale?: boolean;
    status?: string;
    page: number;
    size: number;
    sortBy: string;
    sortDir: string;
}

export function useSearchFreelancers(filters: SearchFilters) {
    const [data, setData] = useState<ResponseDetail.FreelancerSearchResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchFreelancers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await apiSearchFreelancers(filters);
            console.log(result.freelancers.map((f) => f.id));

            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchFreelancers();
    }, [filters]);

    const refetch = () => {
        searchFreelancers();
    };

    return {
        data,
        isLoading,
        error,
        refetch
    };
} 