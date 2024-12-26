import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

const getRandomDate = (): string => {
  const start = new Date(2016, 0, 1); // January 1, 2016
  const end = new Date(); // Current date
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return randomDate.toLocaleDateString('en-GB', options).replace(',', ''); // Format to "DD MMM YYYY"
};

export const Blogs = () => {

  const {loading, blogs} = useBlogs();

  if(loading) {
    return <>
      <div>
        Loading...
      </div>
    </>
  }

  return (
    <div >
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {/* {JSON.stringify(blogs)} */}
          {blogs.map((blog) => (
            <BlogCard 
              id={blog.id} 
              authorName={blog.author.username} 
              title={blog.title} 
              content={blog.content} 
              publishedDate={getRandomDate()}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
