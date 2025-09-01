'use client';

import { useState, useEffect } from 'react';
import { ResponseDetail } from '@/types/respones/detail';
import { apiMeFreelancerProfile } from '@/api/auth';
import { apiGet } from '@/api/baseApi';

export function useFreelancerProfile({ id }: { id: number }) {
  const [data, setData] = useState<ResponseDetail.Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiGet(`/freelancer/${id}`);
        setData(response.data as any);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải thông tin profile';
        setError(errorMessage);
        console.error('Error fetching freelancer profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiMeFreelancerProfile();
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải thông tin profile';
      setError(errorMessage);
      console.error('Error refetching freelancer profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
} 