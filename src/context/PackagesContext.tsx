import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_PACKAGES } from '../constants';
import { PackageTier } from '../types';

interface PackagesContextType {
    packages: PackageTier[];
    addPackage: (pkg: Omit<PackageTier, 'id'>) => void;
    updatePackage: (pkg: PackageTier) => void;
    deletePackage: (id: string) => void;
}

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

export const usePackages = () => {
    const context = useContext(PackagesContext);
    if (!context) {
        throw new Error('usePackages must be used within a PackagesProvider');
    }
    return context;
};

export const PackagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from sessionStorage or fallback to constants
    const [packages, setPackages] = useState<PackageTier[]>(() => {
        const savedPackages = sessionStorage.getItem('service_packages');
        if (savedPackages) {
            try {
                return JSON.parse(savedPackages);
            } catch (e) {
                console.error('Failed to parse packages from sessionStorage', e);
                return INITIAL_PACKAGES;
            }
        }
        return INITIAL_PACKAGES;
    });

    // Sync to sessionStorage whenever packages change
    useEffect(() => {
        sessionStorage.setItem('service_packages', JSON.stringify(packages));
    }, [packages]);

    const addPackage = (pkgData: Omit<PackageTier, 'id'>) => {
        const newPackage: PackageTier = {
            id: Date.now().toString(),
            ...pkgData
        };
        setPackages(prev => [...prev, newPackage]);
    };

    const updatePackage = (updatedPackage: PackageTier) => {
        setPackages(prev => prev.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg));
    };

    const deletePackage = (id: string) => {
        setPackages(prev => prev.filter(pkg => pkg.id !== id));
    };

    return (
        <PackagesContext.Provider value={{ packages, addPackage, updatePackage, deletePackage }}>
            {children}
        </PackagesContext.Provider>
    );
};
