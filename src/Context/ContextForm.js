import { createContext, useContext, useState, useCallback } from "react";

const useContextForm = createContext();

const ContextForm = ({children}) => {
    const [show, setShow] = useState( false );
    const [isSaveForm, setIsSaveForm] = useState( false );

    // const switchForm = (e) => {
    //     e.preventDefault();
    //     setShow( ( prev ) => !prev );
    // };

    const switchForm = useCallback((e) => {
        e.preventDefault();
        setShow( ( prev ) => !prev );
    }, [show]);

    return <useContextForm.Provider value={{show, switchForm, isSaveForm ,setIsSaveForm}}>{children}</useContextForm.Provider>
};

export const CTXForm = () => {
    return useContext( useContextForm );
}

export default ContextForm;