
import { initializeApp } from "firebase/app";


import { createUserWithEmailAndPassword,
        getAuth,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut, 
        updateProfile,
    } from "firebase/auth"

import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";




const firebaseConfig = {
  
  
  apiKey:"AIzaSyD6wKF-8Q7e7fOax6RlqRnL1Frpm63NutI",
  authDomain: "dn3-stream-e-comm.firebaseapp.com",
  projectId: "dn3-stream-e-comm",
  storageBucket: "dn3-stream-e-comm.appspot.com",
  messagingSenderId: "1080687378769",
  appId: "1:1080687378769:web:c19fd6ecdf693f8b039370"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = useProviderAuth();
    return <AuthContext.Provider value={auth}>
    {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

function useProviderAuth(){
    const [user, setUser] = useState();
    
    const signUp = (email, password, displayName) => 
    createUserWithEmailAndPassword(auth , email, password )
    .then(({user}) => {
        updateProfile(user, {displayName});
        setUser(user);
        return user;
    
    });

    const signIn = (email, password) => 
    signInWithEmailAndPassword(auth,email, password)
    .then(({user}) =>{
        setUser(user);
        return user;
    });

    const signOutUser = () => signOut(auth).then(()=> setUser(null));

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            user? setUser(user) : setUser(null)
        });
        return ()=> unsubscribe();
    })

    return{
        signIn , signUp , signOut: signOutUser, user,
    }


}

export default AuthProvider;
