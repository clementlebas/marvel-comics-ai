'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getScenario } from '../app/APIcalls';
import { loading } from '@/app/redux/appSlice';

export default function SecondPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));
    getScenario('Spider-man', 'Iron-man').then((response) => {
      console.log('response', response);
      dispatch(loading(false));
    });
  }, []);

  return <div>Test</div>;
}
