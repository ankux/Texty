import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { deleteAccount } = useAuthStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const success = await deleteAccount();
      if (success) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="w-full max-w-md mx-auto flex flex-col items-center p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Account Settings</h2>
            <p className="text-base-content/70 mb-6 text-center">
              You can delete your account here. <br />
              <span className="text-error font-semibold">Warning:</span> This action is <span className="font-semibold">permanent</span> and cannot be undone.
            </p>
            <button
              className="btn btn-error btn-lg w-full"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage