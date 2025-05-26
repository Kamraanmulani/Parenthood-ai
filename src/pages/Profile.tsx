// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_ENDPOINTS } from '@/config/api';
// import ProfileForm from '@/components/ProfileForm';
// import { useToast } from "@/components/ui/use-toast";

// const Profile = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     console.log('Profile component mounted');
//     const token = localStorage.getItem('token');
//     console.log('Token exists:', !!token);

//     if (!token) {
//       console.log('No token found, redirecting to login');
//       navigate('/login');
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         console.log('Fetching profile...');
//         setLoading(true);
//         setError(null);

//         const response = await axios.get(API_ENDPOINTS.USER.PROFILE, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         console.log('Profile response:', response.data);
        
//         if (response.data.profile) {
//           setProfile(response.data.profile);
//         } else {
//           console.error('No profile data in response:', response.data);
//           setError('Invalid profile data received');
//         }
//       } catch (err: any) {
//         console.error('Profile fetch error:', err);
//         console.error('Error details:', {
//           status: err.response?.status,
//           statusText: err.response?.statusText,
//           data: err.response?.data,
//           headers: err.response?.headers
//         });

//         if (err.response?.status === 401) {
//           console.log('Token expired or invalid, redirecting to login');
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           navigate('/login');
//         } else {
//           setError(err.response?.data?.message || 'Error fetching profile');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleProfileSubmit = async (formData: any) => {
//     try {
//       console.log('Submitting profile data:', formData);
//       setLoading(true);
//       setError(null);

//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await axios.put(API_ENDPOINTS.USER.PROFILE, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Profile update response:', response.data);
      
//       if (response.data.profile) {
//         console.log('Profile update successful');
//         setProfile(response.data.profile);
        
//         // Only show success message if we have ADHD info
//         if (formData.adhdAndAutismInfo && formData.adhdAndAutismInfo.primaryCaregiver) {
//           // Show success toast
//           toast({
//             title: "Profile Completed",
//             description: "Your profile has been completed successfully. Redirecting to home page...",
//             duration: 3000,
//           });

//           // Redirect to home page after successful submission
//           setTimeout(() => {
//             navigate('/', { replace: true });
//           }, 2000);
//         }
//       } else {
//         console.error('No profile data in response:', response.data);
//         setError('Invalid profile data received');
//         toast({
//           title: "Error",
//           description: "Failed to save profile. Please try again.",
//           variant: "destructive",
//           duration: 5000,
//         });
//       }
//     } catch (err: any) {
//       console.error('Profile update error:', err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//       } else {
//         setError(err.response?.data?.message || 'Error updating profile');
//         toast({
//           title: "Error",
//           description: err.response?.data?.message || 'Error updating profile',
//           variant: "destructive",
//           duration: 5000,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log('Current state:', { profile, loading, error });

//   if (loading) {
//     console.log('Rendering loading state');
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     console.log('Rendering error state:', error);
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="text-red-600 text-xl mb-4">Error</div>
//           <p className="text-gray-600">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   console.log('Rendering profile form');
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             {profile ? 'Update Your Profile' : 'Create Your Profile'}
//           </h1>
//           <p className="mt-2 text-gray-600">
//             {profile 
//               ? 'Update your information below' 
//               : 'Please fill in your information below to get started with ParenthoodAI'}
//           </p>
//         </div>
//         <ProfileForm
//           initialData={profile}
//           onSubmit={handleProfileSubmit}
//           isEditing={!!profile}
//         />
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';
import ProfileForm from '@/components/ProfileForm';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile component mounted');
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);

    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log('Fetching profile...');
        setLoading(true);
        setError(null);

        const response = await axios.get(API_ENDPOINTS.USER.PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Profile response:', response.data);
        
        if (response.data.profile) {
          setProfile(response.data.profile);
        } else {
          console.error('No profile data in response:', response.data);
          setError('Invalid profile data received');
        }
      } catch (err: any) {
        console.error('Profile fetch error:', err);
        console.error('Error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers
        });

        if (err.response?.status === 401) {
          console.log('Token expired or invalid, redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Error fetching profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileSubmit = async (formData: any) => {
    try {
      console.log('Submitting profile data:', formData);
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(API_ENDPOINTS.USER.PROFILE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Profile update response:', response.data);
      
      if (response.data.profile) {
        console.log('Profile update successful, preparing to navigate...');
        setProfile(response.data.profile);
        alert('Profile updated successfully!');
        console.log('Attempting navigation to home page...');
        try {
          navigate('/', { replace: true });
          console.log('Navigation completed');
        } catch (navError) {
          console.error('Navigation error:', navError);
          window.location.href = '/';
        }
      } else {
        console.error('No profile data in response:', response.data);
        setError('Invalid profile data received');
      }
    } catch (err: any) {
      console.error('Profile update error:', err);
      console.error('Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers
      });

      if (err.response?.status === 401) {
        console.log('Token expired or invalid, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Error updating profile');
      }
    } finally {
      setLoading(false);
    }
  };

  console.log('Current state:', { profile, loading, error });

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  console.log('Rendering profile form');
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile ? 'Update Your Profile' : 'Create Your Profile'}
          </h1>
          <p className="mt-2 text-gray-600">
            {profile ? 'Update your information below' : 'Please fill in your information below'}
          </p>
        </div>
        <ProfileForm
          initialData={profile}
          onSubmit={handleProfileSubmit}
          isEditing={!!profile}
        />
      </div>
    </div>
  );
};

export default Profile; 