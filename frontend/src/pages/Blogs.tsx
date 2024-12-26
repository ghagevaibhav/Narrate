import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

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
          <BlogCard id={1} authorName="Vaibhav" title="How an ugly single page website makes more than $5000 with affiliate marketing" content="How an ugly single page website makes more than $5000 with affiliate marketingHow an ugly single page website makes more than $5000 with affiliate marketingHow an ugly single page website makes more than $5000 with affiliate marketingHow an ugly single page website makes more than $5000 with affiliate marketing" publishedDate="24th June 2002" />
        </div>
      </div>
    </div>
  )
}
