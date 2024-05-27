import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/ProjectQuery';
import { IProject } from './Project';

interface IProps {
  projectId:IProject
}

export default function DeleteProjectButton( {projectId} :IProps ) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete =()=> {
    deleteProject()
  }

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={handleDelete}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}