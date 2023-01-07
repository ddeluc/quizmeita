import React from "react";

import Auth from "../../components/Auth/Auth";

function LoginPage ({ setUserData, setToken }) {

    return (
        <div>
            <Auth setUserData={setUserData} setToken={setToken}></Auth>
        </div>        
    )
}

export default LoginPage;