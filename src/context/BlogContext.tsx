import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

interface BlogContextType {
    posts: BlogPost[];
    loading: boolean;
    addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
    updatePost: (post: BlogPost) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
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
    const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                // Map DB structure to App structure if needed
                const mappedPosts: BlogPost[] = data.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    excerpt: p.excerpt,
                    content: p.content,
                    date: p.published_at ? new Date(p.published_at).toLocaleDateString('ar-SA') : new Date().toLocaleDateString('ar-SA'),
                    imageUrl: p.image_url || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
                    category: 'عام', // Default or fetch if added to Schema
                    status: p.is_published ? 'Published' : 'Draft'
                }));
                setPosts(mappedPosts);
            } else {
                if (data?.length === 0) {
                    setPosts(BLOG_POSTS);
                }
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const addPost = async (postData: Omit<BlogPost, 'id' | 'date'>) => {
        try {
            const newPostData = {
                title: postData.title,
                excerpt: postData.excerpt,
                content: postData.content || '',
                image_url: postData.imageUrl,
                published_at: new Date().toISOString(),
                is_published: true
            };

            const { data, error } = await supabase
                .from('posts')
                .insert([newPostData])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                const newPost: BlogPost = {
                    id: data.id,
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    date: new Date(data.published_at).toLocaleDateString('ar-SA'),
                    imageUrl: data.image_url,
                    category: 'عام',
                    status: 'Published'
                };
                setPosts(prev => [newPost, ...prev]);
            }
        } catch (error) {
            console.error('Error adding post:', error);
            throw error;
        }
    };

    const updatePost = async (updatedPost: BlogPost) => {
        try {
            const updateData = {
                title: updatedPost.title,
                excerpt: updatedPost.excerpt,
                content: updatedPost.content,
                image_url: updatedPost.imageUrl,
                is_published: updatedPost.status === 'Published'
            };

            const { error } = await supabase
                .from('posts')
                .update(updateData)
                .eq('id', updatedPost.id);

            if (error) throw error;

            setPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    };

    const deletePost = async (id: string) => {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPosts(prev => prev.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    };

    return (
        <BlogContext.Provider value={{ posts, loading, addPost, updatePost, deletePost }}>
            {children}
        </BlogContext.Provider>
    );
};
