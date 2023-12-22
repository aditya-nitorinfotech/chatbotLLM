import React, { useState, useEffect, Component } from "react";
import "./Login.css";
import CustomInput from "../../components/LoginComponents/CustomInput";
import RegularButton from "../../components/LoginComponents/Button";
import background from "../../assets/Images/Shutterstock_2298186725.jpg"
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios"
import { Redirect, useHistory } from 'react-router-dom'



const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    axios.defaults.baseURL = "http://127.0.0.1:3000"
    axios.defaults.withCredentials = false
    const history = useHistory()



    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleEmail = (e) => {
        setCredentials({ ...credentials, email: e.target.value })
    }

    const handlePassword = (e) => {
        setCredentials({ ...credentials, password: e.target.value })
    }

    const handleLogin = async () => {


        console.log("pressed", credentials.email, credentials.password)


        let response = await axios.post("/auth/login",
            {
                "username": credentials.email,
                "password": credentials.password
            },

        )

        console.log("response", response, "token", response?.data?.token, "user", response?.data?.user?._id)
        if (response) {
            console.log("in if")
            let list = await axios.post("/qa/list",
                {
                    "userId": response?.data?.user?._id
                },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${response?.data?.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            localStorage.setItem("list", JSON.stringify(list))
            console.log("list", list)
            localStorage.setItem("token", response?.data?.token)
            localStorage.setItem("userId", response?.data?.user?._id)
            setTimeout(() => {

            }, 3000)
            history.push("/chat")


        }
    }




    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box className="main" sx={{ marginLeft: "1%", height: "100vh", width: "55%", backgroundRepeat: "no-repeat", marginTop: "7%", marginBottom: "7%" }} />

            <Box sx={{ marginLeft: "1%", backgroundColor: colors.primary[400], borderColor: "grey.400", border: 1, width: "40%", marginTop: "7%", marginBottom: "7%", height: "400px", marginRight: "2%" }} p={2}>
                <form className="form">
                    <CustomInput
                        labelText="Username"
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={handleEmail}
                        type="text"
                    />
                    <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={handlePassword}
                        type="password"
                    />

                    <RegularButton type="button" color="danger" className="form__custom-button" onClick={handleLogin}>
                        Log in
                    </RegularButton>
                </form>
            </Box>
        </Box>

    );

}

export default Login