import { rtkApi } from '@/shared/api/rtkApi';
import { Profile } from '@/entities/Profile';

interface UpdateProfileArg {
    profileId: string;
    data: Profile;
}

const profileApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<Profile, string>({
            query: (profileId) => ({
                url: `/profile/${profileId}`,
            }),
            providesTags: (result, error, profileId) => [
                { type: 'Profile', id: profileId },
            ],
        }),
        updateProfile: build.mutation<Profile, UpdateProfileArg>({
            query: ({ profileId, data }) => ({
                url: `/profile/${profileId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { profileId }) => [
                { type: 'Profile', id: profileId },
            ],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
