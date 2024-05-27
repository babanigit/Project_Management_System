import { AddClientModel } from "../components/AddClientModel";
import { Clients } from "../components/Clients";
import { Project } from "../components/Project";

export const Home = () => {
  return (
    <>
      <AddClientModel />
      <Project />
      <Clients />
    </>
  );
};
