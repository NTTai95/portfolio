// app/(client)/profile/personal-info/_ui/profileSidebar/ProfileContext.ts
import { createContext } from 'react';

const ProfileContext = createContext({
    reloadData: () => { }
});

export default ProfileContext;