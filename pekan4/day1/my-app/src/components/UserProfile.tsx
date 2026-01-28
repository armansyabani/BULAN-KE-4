import React, { useState, useReducer } from 'react';

// Complex interfaces untuk real-world scenario
interface UserProfile {
  id: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    language: string;
  };
  stats: {
    loginCount: number;
    lastLogin: Date;
    accountCreated: Date;
  };
}

type UserAction =
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile['personalInfo']> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserProfile['preferences']> }
  | { type: 'INCREMENT_LOGIN_COUNT' }
  | { type: 'RESET' };

const initialUser: UserProfile = {
  id: 1,
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  },
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'id'
  },
  stats: {
    loginCount: 0,
    lastLogin: new Date(),
    accountCreated: new Date()
  }
};

function userReducer(state: UserProfile, action: UserAction): UserProfile {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'INCREMENT_LOGIN_COUNT':
      return {
        ...state,
        stats: {
          ...state.stats,
          loginCount: state.stats.loginCount + 1,
          lastLogin: new Date()
        }
      };
    case 'RESET':
      return initialUser;
    default:
      return state;
  }
}

const UserProfile: React.FC = () => {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleProfileUpdate = (field: keyof UserProfile['personalInfo'], value: string): void => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { [field]: value }
    });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {user.personalInfo.firstName} {user.personalInfo.lastName}</p>
        <p>Email: {user.personalInfo.email}</p>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={user.personalInfo.firstName}
              onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
              placeholder="First Name"
            />
            <input
              type="email"
              value={user.personalInfo.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              placeholder="Email"
            />
            <button onClick={() => setIsEditing(false)}>Save</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>

      <div>
        <h3>Preferences</h3>
        <p>Theme: {user.preferences.theme}</p>
        <p>Notifications: {user.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
        <p>Language: {user.preferences.language}</p>
      </div>

      <div>
        <h3>Statistics</h3>
        <p>Login Count: {user.stats.loginCount}</p>
        <p>Last Login: {user.stats.lastLogin.toLocaleDateString()}</p>
        <p>Member Since: {user.stats.accountCreated.toLocaleDateString()}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT_LOGIN_COUNT' })}>
          Simulate Login
        </button>
      </div>
    </div>
  );
};

export default UserProfile;