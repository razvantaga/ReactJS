import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [project, setProject] = useState({ title: '', description: '', url: '' });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/projects', project);
      navigate('/'); // Navigate back to the projects list
    } catch (err) {
      setError('Error creating project');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create New Project</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">URL</label>
          <input
            type="url"
            name="url"
            value={project.url}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
