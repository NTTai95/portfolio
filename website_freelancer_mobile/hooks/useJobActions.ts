'use client';

import { useCallback } from 'react';
import { apiSelectFreelancer, apiRejectApply } from '@/api/detail';
import { ResponseDetail } from '@/types/respones/detail';

export interface UseJobActionsReturn {
  selectFreelancer: (jobId: number, applyId: number) => Promise<ResponseDetail.SelectFreelancerResponse>;
  rejectApplication: (jobId: number, applyId: number) => Promise<void>;
}

export function useJobActions(): UseJobActionsReturn {
  const selectFreelancer = useCallback(async (jobId: number, applyId: number): Promise<ResponseDetail.SelectFreelancerResponse> => {
    try {
      console.log('Selecting freelancer:', { jobId, applyId });
      const response = await apiSelectFreelancer(jobId, applyId);
      console.log('Select freelancer response:', response);
      return response;
    } catch (error) {
      console.error('Error selecting freelancer:', error);
      throw error instanceof Error ? error : new Error('Failed to select freelancer');
    }
  }, []);

  const rejectApplication = useCallback(async (jobId: number, applyId: number): Promise<void> => {
    try {
      console.log('Rejecting application:', { jobId, applyId });
      await apiRejectApply(jobId, applyId);
      console.log('Application rejected successfully');
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error instanceof Error ? error : new Error('Failed to reject application');
    }
  }, []);

  return {
    selectFreelancer,
    rejectApplication,
  };
} 