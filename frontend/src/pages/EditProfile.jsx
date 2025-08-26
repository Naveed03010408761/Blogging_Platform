import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    location: '',
    bio: '',
    website: '',
    twitter: '',
    facebook: '',
    github: '',
  });

  useEffect(() => {
    try {
      const fetchProfile = async () => {
        const res = await axios.get('/api/v1/users/profile');
        setFormData(res.data);
      };
    } catch (error) {
      console.error(error);
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch('/api/v1/users/profile', formData);
      alert('Profile editted successfully.');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border rounded-lg"
        ></textarea>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="Twitter Link"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="Github Link"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn Link"
          className="w-full p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
