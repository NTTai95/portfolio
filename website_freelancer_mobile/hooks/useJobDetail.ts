'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiJobApplies } from '@/api/detail';
import { ResponseDetail } from '@/types/respones/detail';

interface UseJobDetailState {
  data: ResponseDetail.JobApplies | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseJobDetailReturn extends UseJobDetailState {
  refetch: () => Promise<void>;
}

export function useJobDetail(jobId: number): UseJobDetailReturn {
  const [state, setState] = useState<UseJobDetailState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchJobDetail = useCallback(async () => {
    if (!jobId) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Fetching job applies for jobId:', jobId);
      const response = await apiJobApplies(jobId);
      console.log('Job applies response:', response);
      
      // Validate response data
      if (!response || !response.job) {
        throw new Error('Invalid response data: missing job information');
      }
      
      if (!response.applies) {
        console.warn('No applies array in response, setting empty array');
        response.applies = [];
      }
      
      setState({
        data: response,
        isLoading: false,
        error: null,
      });
      
    } catch (error) {
      console.error('Error fetching job applies:', error);
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Failed to fetch job detail'),
      });
    }
  }, [jobId]);

  const refetch = useCallback(() => {
    return fetchJobDetail();
  }, [fetchJobDetail]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail]);

  return {
    ...state,
    refetch,
  };
} 