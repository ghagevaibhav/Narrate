import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../confiig";



export const useBlogs = () => {

    const [loading, setLoadnig] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect( () => {
        axios.get(`${BACKEND_URL}/blog/bulk`)
        .then((res) => {
            setBlogs(res.data);
            setLoadnig(false);
        })
    }, [])
     return { loading, blogs }
}



export const useBlog = () => {
    const [loading, setLoadnig] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id) {
            axios.get(`${BACKEND_URL}/blog/${id}`)
           .then((res) => {
                setBlog(res.data);
                setLoadnig(false);
            })
        }
    }, [])

    return { loading, blog }
}