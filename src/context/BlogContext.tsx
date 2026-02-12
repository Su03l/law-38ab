import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

interface BlogContextType {
    posts: BlogPost[];
    addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
    updatePost: (post: BlogPost) => void;
    deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from localStorage or fallback to constants
    const [posts, setPosts] = useState<BlogPost[]>(() => {
        const savedPosts = localStorage.getItem('blog_posts');
        if (savedPosts) {
            try {
                return JSON.parse(savedPosts);
            } catch (e) {
                console.error('Failed to parse blog posts from localStorage', e);
                return BLOG_POSTS;
            }
        }
        return BLOG_POSTS;
    });

    // Sync to localStorage whenever posts change
    useEffect(() => {
        localStorage.setItem('blog_posts', JSON.stringify(posts));
    }, [posts]);

    const addPost = (postData: Omit<BlogPost, 'id' | 'date'>) => {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('ar-SA'), // Default to Arabic locale as per existing app
            ...postData
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const updatePost = (updatedPost: BlogPost) => {
        setPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
    };

    const deletePost = (id: string) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    return (
        <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
            {children}
        </BlogContext.Provider>
    );
};
