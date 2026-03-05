import { useAuth0 } from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button className="auth-btn login" onClick={() => loginWithRedirect()}>
                <FiLogIn style={{ marginRight: 6 }} /> Sign In
            </button>
        )
    );
}

export default LoginButton;
