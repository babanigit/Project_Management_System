import { AddClientModel } from "../components/AddClientModel";
import AddProjectModal from "../components/AddProjectModel";
import { Clients } from "../components/Clients";
import { Project } from "../components/Project";

export const Home = () => {
  return (
    <>
      <AddClientModel />
      <AddProjectModal />
      <Project />
      <Clients />
    </>
  );
};
