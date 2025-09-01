/**
 * @file useJobMilestones.ts
 * @description Custom hook để fetch danh sách milestones của job
 * Tương tự useJobDetail nhưng cho milestones endpoint
 */
import { useState, useEffect } from 'react';
import { apiJobMilestones } from '@/api/detail';
import { ResponseDetail } from '@/types/respones/detail';

interface UseJobMilestonesResult {
  data: ResponseDetail.MilestoneListResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobMilestones(jobId: number): UseJobMilestonesResult {
  const [data, setData] = useState<ResponseDetail.MilestoneListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiJobMilestones(jobId);
      setData(response);
    } catch (err: unknown) {
      let errorMessage = 'Có lỗi xảy ra khi tải dữ liệu';
      
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
      console.error('Error fetching job milestones:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  const refetch = () => {
    if (jobId) {
      fetchData();
    }
  };

  return {
    data,
    isLoading,
    error,
    refetch
  };
} 