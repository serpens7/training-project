import { screen } from '@testing-library/react';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import userEvent from '@testing-library/user-event';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';
import { componentRender } from '@/shared/lib/tests/componentRender';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

// RTK Query's fetchBaseQuery reads global fetch; stub it so the initial
// getProfile query resolves instead of hitting the network.
const mockFetchOk = () =>
    jest.fn((_input: unknown, init?: RequestInit) => {
        const body = init?.method === 'PUT' && init.body ? init.body : JSON.stringify(profile);
        return Promise.resolve(
            new Response(body, {
                status: 200,
                headers: { 'content-type': 'application/json' },
            })
        );
    }) as jest.Mock;

describe('features/EditableProfileCard', () => {
    beforeEach(() => {
        global.fetch = mockFetchOk();
    });

    test('Readonly should switch', async () => {
        componentRender(<EditableProfileCard id='1' />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton')
        );
        expect(
            screen.getByTestId('EditableProfileCardHeader.CancelButton')
        ).toBeInTheDocument();
    });

    test('Values should be reset when canceled', async () => {
        componentRender(<EditableProfileCard id='1' />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton')
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user'
        );
        await userEvent.type(
            screen.getByTestId('ProfileCard.lastname'),
            'user'
        );

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.CancelButton')
        );

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(
            'admin'
        );
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });

    test('Error should appear', async () => {
        componentRender(<EditableProfileCard id='1' />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton')
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton')
        );

        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph')
        ).toBeInTheDocument();
    });

    test('If there are no validation errors, a PUT request should be sent to the server', async () => {
        componentRender(<EditableProfileCard id='1' />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton')
        );

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user'
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton')
        );

        const putCall = (global.fetch as jest.Mock).mock.calls.find(
            ([request]) => (request as Request).method === 'PUT'
        );
        expect(putCall).toBeDefined();
    });
});
