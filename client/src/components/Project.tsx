import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQuery";
import { ProjectCard } from "./ProjectCard";
import Spinner from "./Spinner";

import { IClient } from "./Clients";

export interface IProject {
  id: string;
  name: string;
  status: string;
  description: string;
  client: IClient;
}

export const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (

        <div className="row mt-4">
          {data.projects.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};
