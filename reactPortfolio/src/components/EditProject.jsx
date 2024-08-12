import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '', description: '', url: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError('Error fetching project');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/projects/${id}`, project);
      navigate('/'); // Navigate back to the projects list
    } catch (err) {
      setError('Error updating project');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Project</h1>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProject;
