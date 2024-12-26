import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
  id: number;
  title: string;
  content: string;
  publishedDate?: string;
  author: {
    username: string;
  };
}


export const useBlogs = () => {

    const [loading, setLoadnig] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect( () => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => {
            setBlogs(res.data.posts);
            setLoadnig(false);
        })
    }, [])
     return { loading, blogs }
}



export const useBlog = (id: string | undefined) => {
    const [loading, setLoadnig] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {  
        if (id) {
            axios.get(`${BACKEND_URL}/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                setBlog(res.data);
                setLoadnig(false);
            })
        }
    }, [id])

    return { loading, blog }
}