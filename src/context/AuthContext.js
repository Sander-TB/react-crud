import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
	const [auth, setAuth] = useLocalStorage("jwt", null); //TODO: use localstorage

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
