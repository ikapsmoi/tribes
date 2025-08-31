const ProfileInput = ({ label, ...props }) => (
    <div>
        <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {label}
        </label>
        <input
            {...props}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            style={{ fontFamily: "Inter, sans-serif" }}
        />
    </div>
);

const ProfileTextarea = ({ label, ...props }) => (
    <div>
        <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {label}
        </label>
        <textarea
            {...props}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            style={{ fontFamily: "Inter, sans-serif" }}
        />
    </div>
);


export default function ProfileView({ userProfile }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <h2
          className="text-xl font-semibold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Host Profile Settings
        </h2>
      </div>

      <div className="p-6">
        <div className="max-w-2xl">
          <div className="space-y-6">
            <ProfileInput 
                label="Community Name"
                type="text"
                defaultValue={userProfile?.community_name || ""}
                placeholder="Your community or brand name"
            />

            <ProfileInput 
                label="Community Size"
                type="number"
                defaultValue={userProfile?.community_size || ""}
                placeholder="Number of followers/subscribers"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileInput 
                    label="Instagram"
                    type="text"
                    defaultValue={userProfile?.social_instagram || ""}
                    placeholder="@username"
                />
                <ProfileInput 
                    label="YouTube"
                    type="url"
                    defaultValue={userProfile?.social_youtube || ""}
                    placeholder="https://youtube.com/..."
                />
                <ProfileInput 
                    label="TikTok"
                    type="text"
                    defaultValue={userProfile?.social_tiktok || ""}
                    placeholder="@username"
                />
                <ProfileInput 
                    label="Website"
                    type="url"
                    defaultValue={userProfile?.social_website || ""}
                    placeholder="https://yourwebsite.com"
                />
            </div>
            
            <ProfileTextarea 
                label="Host Bio"
                defaultValue={userProfile?.bio || ""}
                placeholder="Tell travelers about yourself and your hosting experience..."
            />
            
            <div className="flex space-x-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
