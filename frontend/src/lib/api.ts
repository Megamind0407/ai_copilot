import axios from 'axios';
import type { AnalyzeRequest, AnalyzeResponse } from '../types';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export async function analyzeError(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const { data } = await apiClient.post<AnalyzeResponse>('/analyze', request);
  return data;
}
