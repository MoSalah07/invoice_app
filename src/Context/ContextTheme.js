import { createContext, useContext, useState, useCallback } from 'react';

const UserTheme = createContext(null);

function ContextTheme({children}) {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || false);

    // before CallBack(() => call back function)

    // const changeTheme = () => {
    //     localStorage.setItem('theme', JSON.stringify(!theme))
    //     setTheme( ( prev ) => !prev )
    // };


    // use CallBack
    const changeTheme = useCallback(() => {
        localStorage.setItem('theme', JSON.stringify(!theme))
        setTheme( ( prev ) => !prev )
    }, [theme]);

    // Loading && Error
    const [loading, setLoading] = useState( false );
    const [error, setError] = useState( false );


    return <UserTheme.Provider value={{theme, changeTheme, setLoading , loading, error, setError}}>{children}</UserTheme.Provider>
}

export const CTXTheme = () => useContext(UserTheme)

export default ContextTheme;