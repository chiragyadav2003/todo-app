'use client';

import { useUser } from '../hooks/useUser';
import Image from 'next/image';

const ProfilePage = () => {
  const { data, isLoading, error } = useUser();

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="w-96 rounded-lg border border-gray-200 p-6 space-y-5 relative bg-white shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Profile</h1>

        {isLoading && <div className="text-gray-800 text-center">Loading...</div>}
        {error && <div className="text-red-600 text-center">Error fetching user: {error.message}</div>}

        {data ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              {data.image_url ? (
                <Image
                  src={data.image_url}
                  alt={data.display_name || ''}
                  width={100}
                  height={100}
                  className="rounded-full shadow-md cursor-pointer transition-transform transform hover:scale-110"
                />
              ) : (
                <div className="h-[100px] w-[100px] flex items-center justify-center ring-2 ring-gray-300 rounded-full text-3xl font-bold cursor-pointer transition-transform transform hover:scale-110">
                  <h1>{data.email[0]}</h1>
                </div>
              )}
              <h2 className="mt-3 text-xl font-semibold text-gray-800">{data.display_name || 'N/A'}</h2>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>User ID:</strong> {data.id}
              </p>
            </div>
          </div>
        ) : (
          !isLoading && <p className="text-gray-800 text-center">No user is logged in.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
