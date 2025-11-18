import Link  from "next/link";
import { ArrowRight } from "lucide-react";

type ProjectProps = {
    title: string;
    description: string;
}

 const ProjectCard = ({title,description}: ProjectProps) => {
  return (
    <div  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
       <div className="h-48 relative bg-gradient-to-br from-gray-300 to-gray-400">
         <div className="absolute top-4 right-4">
          <span className="inline-block bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            category
          </span>
         </div>
       </div>
        <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <Link href="/details" className=" p-0 ml-4 mb-4 h-auto flex items-center font-semibold">
          <span>Learn More </span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
     </div>
  )
}


const ProjectPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-bold text-black mb-2">Our Projects</h2>
        <p className="text-center text-black font-semibold mb-8">Our projects are a reflection of our commitment to God and His Church. We believe that through our projects, we can make a positive impact on the lives of those around us.</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mb-8">
        <ProjectCard title="Project 1" description="Description of project 1" />
        <ProjectCard title="Project 2" description="Description of project 2" />
        <ProjectCard title="Project 3" description="Description of project 3" />
        <ProjectCard title="Project 4" description="Description of project 4" />
        <ProjectCard title="Project 5" description="Description of project 5" />
        <ProjectCard title="Project 6" description="Description of project 6" />
     </div>
     <div className="bg-green-700 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Support our projects</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            your donations will help us continue our projects which is part of our service to God and His Church.
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Donate
          </button>
        </div>
    </div>
  )
}


export default ProjectPage