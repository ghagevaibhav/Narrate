import { AppBar } from "../components/AppBar";
import { SingleBlogPage } from "../components/SingleBlogPage";
import { Spinner } from "../components/Spinnner";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog(id);

    if (loading || !blog) {
        return <div>
            <AppBar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <SingleBlogPage blog={blog} />
    </div>
}