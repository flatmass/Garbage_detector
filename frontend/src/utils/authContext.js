import React, {useContext, createContext, useState, useEffect} from "react";
import ky from "ky";
import {host} from "./rawApi";
import historyRef from "./history";
import api from "./api";


const authContext = createContext(3);

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(true);

    useEffect(() => {
        if (user === null)
            getCurrent()
    }, []);

    const getCurrent = () => {
        return api('/users/me').then((result) => {
            setUser(result)
        });
    };

    const signIn = (username, password) => {
        ky.post(`${host}/auth/jwt/login`, {
            body: new URLSearchParams(`username=${username}&password=${password}`), timeout: 2 * 60 * 1000,
            credentials: 'include',
        }).then((response) => {
            if (response.status === 200) {
                api('/users/me').then((result) => {
                    setUser(result)
                }).then(() => {
                    historyRef.history.push('/');
                }).catch((_) => {
                    historyRef.history.push('/login')
                });
            } else if (response.status === 401){
                alert('При аворизации произошла ошибка! Пожалуйста, проверьте логин и пароль')
            } else {
                alert('Произошла неизвестная ошибка. Попробуйте позже или обратитесь к разработчику')
            }
        }).catch(() => console.log(
            alert('Произошла неизвестная ошибка. Попробуйте позже или обратитесь к разработчику')
        ))
    };

    const signOut = () => {
        setUser(null);
    };

    return {
        user,
        getCurrent,
        signIn,
        signOut
    };
}


export {useAuth, useProvideAuth, ProvideAuth}