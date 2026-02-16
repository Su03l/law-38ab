import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { INITIAL_PACKAGES } from '../constants';
import { PackageTier } from '../types';

interface PackagesContextType {
    packages: PackageTier[];
    loading: boolean;
    addPackage: (pkg: Omit<PackageTier, 'id'>) => Promise<void>;
    updatePackage: (pkg: PackageTier) => Promise<void>;
    deletePackage: (id: string) => Promise<void>;
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
    const [packages, setPackages] = useState<PackageTier[]>(INITIAL_PACKAGES);
    const [loading, setLoading] = useState(true);

    const fetchPackages = async () => {
        try {
            const { data, error } = await supabase
                .from('packages')
                .select('*')
                .order('tier_order', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                // Map DB structure to App structure if needed (ensure types match)
                setPackages(data as PackageTier[]);
            } else {
                // If DB is empty, maybe seed it or keep INITIAL?
                // For now, keep INITIAL if empty to avoid broken UI, or empty []
                // Strategy: if empty, show INITIAL but don't save to DB unless edited
                if (data?.length === 0) {
                    setPackages(INITIAL_PACKAGES);
                }
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const addPackage = async (pkgData: Omit<PackageTier, 'id'>) => {
        try {
            // Remove 'id' if it exists in pkgData just in case, let DB generate it
            const { id, ...rest } = pkgData as any;

            const { data, error } = await supabase
                .from('packages')
                .insert([{ ...rest }])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setPackages(prev => [...prev, data as PackageTier]);
            }
        } catch (error) {
            console.error('Error adding package:', error);
            throw error;
        }
    };

    const updatePackage = async (updatedPackage: PackageTier) => {
        try {
            const { error } = await supabase
                .from('packages')
                .update(updatedPackage)
                .eq('id', updatedPackage.id);

            if (error) throw error;

            setPackages(prev => prev.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg));
        } catch (error) {
            console.error('Error updating package:', error);
            throw error;
        }
    };

    const deletePackage = async (id: string) => {
        try {
            const { error } = await supabase
                .from('packages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPackages(prev => prev.filter(pkg => pkg.id !== id));
        } catch (error) {
            console.error('Error deleting package:', error);
            throw error;
        }
    };

    return (
        <PackagesContext.Provider value={{ packages, loading, addPackage, updatePackage, deletePackage }}>
            {children}
        </PackagesContext.Provider>
    );
};
