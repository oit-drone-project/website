import axios from 'axios';

const API_URL = 'http://localhost:8000/api/posts/';

export interface Post {
    id?: number;
    title: string;
    content: string;
    author: string;
    // Add any other fields that your post object may have
}

export const getPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
    const response = await axios.post<Post>(API_URL, post);
    return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}${id}/`);
};

export const getPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_URL}${id}/`);
    return response.data;
};