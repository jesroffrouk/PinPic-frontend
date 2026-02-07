import { useEffect, useState } from 'react';
import { Camera, Check, X, Edit2 } from 'lucide-react';
import { useGetUserProfileQuery } from '../lib/features/apiSlice';

// this profile page needs work on it. 
// first i want to fetch details from backend like details. 
// then it should able to edit details and match with backend.
// then profile picture should be choosed from these 5. Backend for now will just store profile image named rendered from public folder for now
// remove unncessary details and keep it. 

export default function ProfilePage() {
  const [username,setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(bio);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const {data,error} = useGetUserProfileQuery()
  useEffect(()=> {
    if (data) {
      console.log(data)
      setUsername(data.userDetails.username)
      setBio(data.userDetails.bio)
      console.log(data.userDetails.profile_url)
    }
  },[data])
  

  const avatars = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleCancelBio = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const handleAvatarSelect = (index) => {
    setSelectedAvatar(index);
    setShowAvatarPicker(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>

          {/* Profile Section */}
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <div className="relative inline-block">
                <div
                  className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-xl"
                  style={{ background: avatars[selectedAvatar] }}
                ></div>
                <button
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Change profile picture"
                >
                  <Camera size={18} />
                </button>
              </div>

              {/* Avatar Picker Modal */}
              {showAvatarPicker && (
                <div className="absolute top-full mt-4 left-0 bg-gray-700 rounded-xl shadow-2xl p-4 border border-gray-600 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-gray-300 text-sm font-medium mb-3">Choose your avatar</p>
                  <div className="flex gap-3">
                    {avatars.map((gradient, index) => (
                      <button
                        key={index}
                        onClick={() => handleAvatarSelect(index)}
                        className={`w-14 h-14 rounded-full transition-all duration-200 hover:scale-110 ${
                          selectedAvatar === index
                            ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-gray-700'
                            : 'hover:ring-2 hover:ring-gray-500'
                        }`}
                        style={{ background: gradient }}
                        aria-label={`Avatar option ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Username */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">@{username}</h1>
              <p className="text-gray-400 text-sm">Username cannot be changed</p>
            </div>

            {/* Bio Section */}
            <div className="bg-gray-700 rounded-xl p-5 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-200">Bio</h2>
                {!isEditingBio && (
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-purple-400 hover:text-purple-300 transition-colors p-2 hover:bg-gray-600 rounded-lg"
                    aria-label="Edit bio"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>

              {isEditingBio ? (
                <div className="space-y-3">
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="w-full bg-gray-800 text-gray-200 rounded-lg p-3 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 outline-none resize-none transition-all"
                    rows="4"
                    maxLength="200"
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {tempBio.length}/200 characters
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancelBio}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveBio}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check size={16} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed">{bio}</p>
              )}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-700 rounded-xl p-4 text-center border border-gray-600">
                <p className="text-2xl font-bold text-white">248</p>
                <p className="text-sm text-gray-400 mt-1">Posts</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-4 text-center border border-gray-600">
                <p className="text-2xl font-bold text-white">1.2k</p>
                <p className="text-sm text-gray-400 mt-1">Followers</p>
              </div>
              <div className="bg-gray-700 rounded-xl p-4 text-center border border-gray-600">
                <p className="text-2xl font-bold text-white">487</p>
                <p className="text-sm text-gray-400 mt-1">Following</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-600/50">
                Edit Profile
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 border border-gray-600">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your profile is visible to all users
        </p>
      </div>
    </div>
  );
}