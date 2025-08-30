import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/login');
          return;
        }
        const res = await axios.get('/api/v1/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(res);

        setProfile(res.data.data);
        setError('');
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userData');
          navigate('/login');
        } else {
          setError('Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your profile? This action cannot be undone. All your posts and data will be lost.'
      )
    )
      return;

    try {
      setDeleteLoading(true);
      const token = localStorage.getItem('accessToken');
      await axios.delete('/api/v1/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem('token');
      alert('Profile deleted successfully.');
      window.location.href = '/';
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg">
          {error || 'Could not load profile'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img
                src={profile.avatar || 'https://via.placeholder.com/100'}
                alt="avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.userName}
            </h1>
            <p className="text-gray-600">{profile.email}</p>
            {profile.location && (
              <p className="text-gray-700 mt-1">📍 {profile.location}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Member since: {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Bio Section */}
          {profile.bio && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Website Section */}
          {profile.website && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Website
              </h3>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-words"
              >
                {profile.website}
              </a>
            </div>
          )}

          {/* Social Links Section */}
          {(profile.socialLinks?.twitter ||
            profile.socialLinks?.github ||
            profile.socialLinks?.linkedin) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Connect With Me
              </h3>
              <div className="flex gap-4 justify-center">
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
                      𝕏
                    </div>
                  </a>
                )}
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white">
                      𝖦
                    </div>
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      in
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors font-semibold"
            >
              Edit Profile
            </button>

            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors font-semibold"
            >
              {deleteLoading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
