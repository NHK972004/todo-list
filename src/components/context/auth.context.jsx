import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": ""
    })
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}