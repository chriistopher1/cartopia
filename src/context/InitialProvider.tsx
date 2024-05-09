import React, { createContext, useContext, useEffect, useState } from 'react';
import { CategoryArray, InitialContextType } from '../types';
import { getInitialAsset } from '../lib/firebase/firestorage';

const InitialContext = createContext<InitialContextType | undefined>(undefined);

export const InitialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialValue, setInitialValue] = useState<InitialContextType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialCategory: CategoryArray = await getInitialAsset();
        setInitialValue({ category: initialCategory });
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Handle error state or fallback data here if needed
      }
    };

    fetchData();

  }, []); 

  return (
    <InitialContext.Provider value={initialValue}>{children}</InitialContext.Provider>
  );
};

export const useInitialContext = () => useContext(InitialContext);