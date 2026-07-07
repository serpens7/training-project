import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/shared/types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
