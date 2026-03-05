import { useAuth0 } from "@auth0/auth0-react";
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button className="auth-btn logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <CiLogout style={{ marginRight: 6 }} /> SignOut
            </button>
        )
    );
}

export default LogoutButton;