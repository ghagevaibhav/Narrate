import { Avatar } from "./BlogCard"


export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <div className=" font-serif text-2xl flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar name="Vaibhav" size={"big"} /> 
        </div>
    </div>
  )
}
