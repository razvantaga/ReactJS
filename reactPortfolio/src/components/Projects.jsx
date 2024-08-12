import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Error fetching projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      setError('Error deleting project');
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const toggleDetails = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, showDetails: !project.showDetails } : project
      )
    );
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (projectId) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);

      // Upload the file
      const uploadResponse = await axios.post('http://localhost:3000/projects/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the URL of the uploaded image from the response
      const imageUrl = uploadResponse.data.url;

      // Update the project with the new image URL
      await axios.patch(`http://localhost:3000/projects/${projectId}`, { img: imageUrl });

      // Refresh the projects list
      const updatedProjects = projects.map((project) =>
        project.id === projectId ? { ...project, img: imageUrl } : project
      );
      setProjects(updatedProjects);
    } catch (err) {
      setError('Error uploading image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">Projects</h1>
      <button
        onClick={() => navigate('/create')}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Create New Project
      </button>
      <div>
        {projects.map((project) => (
          <div key={project.id} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full max-w-xl lg:w-3/4">
              <div className="flex items-start">
                {project.img && (
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-24 h-24 object-cover mr-4"
                  />
                )}
                <div>
                  <h6 className="mb-2 font-semibold">{project.title}</h6>
                  {project.showDetails && (
                    <>
                      <p className="mb-4 text-neutral-400">{project.description}</p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Project
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="mr-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleDetails(project.id)}
                  className={`px-4 py-2 ${project.showDetails ? 'bg-gray-500' : 'bg-gray-300'} text-white rounded`}
                >
                  {project.showDetails ? 'Hide' : 'Show'} Details
                </button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2"
                />
                <button
                  onClick={() => handleUpload(project.id)}
                  className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
