import { faker } from "@faker-js/faker";
import { Box, Stack, Avatar, Badge, Typography, InputAdornment, IconButton, Button, TextField, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Microphone, Paperclip, PaperPlaneRight, Robot, UserCirclePlus } from "phosphor-react"
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import axios from "axios"
import { fontWeight } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { tokens } from "../../theme"


const useStyles = makeStyles(theme => ({
    input: {
        "&::placeholder": {
            color: "darkgray",
            //  textAlign: "center",
            justifyContent: "center",
            textAlign: "left"
        }
    }
}));



const Dashboard = () => {

    const [retailMessages, setRetailMessages] = useState([
        { from: "bot", text: "Hello, I am the Retail chatbot. Please ask any Retail question!" },
        { from: "me", text: "Who is the competitor of Apple iPhone?" },
        {
            from: 'bot', text: `Sure, here is the list of the biggest competitors of Apple iPhone \n\n
        1.Samsung: Samsung is one of the biggest competitors of the iPhone. \n \n
        They offer a wide range of smartphones across various price points, from flagship series to more budget friendly options` }

    ]);

    const [rMessages, setRMessages] = useState([
        { from: "bot", text: "Hello, I am the Nitor Finance Chabot. Please ask any Finance question!" },
    ]);


    const [hMessages, setHMessages] = useState([
        { from: "bot", text: "Hello, I am the Nitor Healthcare Chabot. Please ask any Healthcare question!" },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [pageLoad, setPageLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = React.useState(1);
    const [selectedType, setSelectedType] = useState('')
    const [autoQ, setAutoQ] = useState("")
    const classes = useStyles();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSelectionChange = (event) => {
        console.log("value", event.target.value)
        setValue(event.target.value);
        // window.location.reload()
    };



    const StyledInput = styled(TextField)(({ theme }) => ({
        "& .MuiInputBase-input": {
            paddingTop: "12px !important",
            paddingBottom: "12px !important",
            border: "2 px solid",
            color: "black"
        },
    }));

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: '""',
            },
        },
        "@keyframes ripple": {
            "0%": {
                transform: "scale(.8)",
                opacity: 1,
            },
            "100%": {
                transform: "scale(2.4)",
                opacity: 0,
            },
        },
    }));

    const handleAutoSend = async (data) => {
        console.log("inside auto method", data)
        let url = 'https://nitorhealth.community.saturnenterprise.io'
        let urlCORS = `https://` + `${url}`
        let token = "deployment-58002153b40642fa90dd41ad5de90e60"
        let token2 = "deployment-d7181ed737694d6d9128db8dc2fc2eef"

        // let data = { "text": "What are symptoms of Covid-19?" }

        let config = {

            headers: {
                'Authorization': `Bearer` + ` ${token}`,
                'Access-Control-Allow-Origin': "*"
            }
        }
        setIsLoading(true)
        // if (!autoQ.trim().length) {
        //     return;
        // }
        // const data = autoQ.toString();

        // setRetailMessages((old) => [...old, { from: "me", text: data }]);
        if (value == 1) {
            console.log("inside 1")
            // setHMessages((old) => [...old, { from: "me", text: data }]);
        }
        if (value == 2) {
            console.log("inside 2")
            // setRMessages((old) => [...old, { from: "me", text: data }]);

        }





        console.log("sending request")
        let response;


        console.log("inside single", data)


        if (value == 1) {
            console.log("inside 1", data)
            response = await axios.post("/health",
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`
                    }
                })

            console.log("response", response)
        }
        else {
            console.log("sending finance request")
            console.log("inside 2", data)
            response = await axios.post("/finance",
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token2}`
                    }
                })

            console.log("response", response)

        }

        let responseData = response.data?.length ? (response.data.result).toString() : null;


        if (value == 1) {
            setTimeout(() => {
                // setRetailMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
                setHMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1000);
        }
        else {
            setTimeout(() => {
                // setRetailMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
                setRMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1000);
        }

        // }
        return response
        // return "ok"

    }

    const handleSendMessage = async () => {
        console.log("inside method", inputMessage)
        let url = 'https://nitorhealth.community.saturnenterprise.io'
        let urlCORS = `https://` + `${url}`
        let token = "deployment-58002153b40642fa90dd41ad5de90e60"
        let token2 = "deployment-d7181ed737694d6d9128db8dc2fc2eef"

        // let data = { "text": "What are symptoms of Covid-19?" }

        let config = {

            headers: {
                'Authorization': `Bearer` + ` ${token}`,
                'Access-Control-Allow-Origin': "*"
            }
        }
        setIsLoading(true)
        if (!inputMessage.trim().length) {
            return;
        }
        const data = inputMessage.toString();

        // setRetailMessages((old) => [...old, { from: "me", text: data }]);
        if (value == 1) {
            console.log("inside 1")
            setHMessages((old) => [...old, { from: "me", text: data }]);
            setAutoQ(false)
        }
        if (value == 2) {
            console.log("inside 2")
            setRMessages((old) => [...old, { from: "me", text: data }]);
            setAutoQ(false)

        }
        setInputMessage("")




        console.log("sending request")
        let response;

        // console.log("sending finance request")
        console.log("inside single", data)
        // response = await axios.post("/finance",
        //     { "text": `${data}` },
        //     {
        //         headers: {
        //             'Authorization': `Bearer` + ` ${token2}`
        //         }
        //     })

        // console.log("response", response)








        if (value == 1) {
            console.log("inside 1", data)
            response = await axios.post("/health",
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`
                    }
                })

            console.log("response", response)
        }
        else {
            console.log("sending finance request")
            console.log("inside 2", data)
            response = await axios.post("/finance",
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token2}`
                    }
                })

            console.log("response", response)

        }

        let responseData = response.data?.length ? (response.data.result).toString() : null;


        if (value == 1) {
            setTimeout(() => {
                // setRetailMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
                setHMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1000);
        }
        else {
            setTimeout(() => {
                // setRetailMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
                setRMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1000);
        }

        // }
        return response
        // return "ok"

    }

    const handleText = (event) => {
        setInputMessage(event.target.value)

    }


    return (


        <Stack height="100%" maxHeight="100vh" width="100%" flex={1}>



            {/* Middle section of  chat conversations*/}

            <Box sx={{ width: "100%", }}>
                <Box sx={{ padding: 2, justifyContent: "center" }}>
                    {/* <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",

                                }}
                                variant="dot"
                            >
                                <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
                            </StyledBadge> */}
                    {/* <Box sx={{ marginBottom: "4%", paddingLeft: 1 }} >
                                <Typography>Select data type</Typography>
                            </Box> */}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label" sx={{}}>Data Model</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={value}
                            label="Data Model"
                            onChange={handleSelectionChange}

                        >

                            <MenuItem value={1}>Healthcare</MenuItem>
                            <MenuItem value={2}>Finance</MenuItem>
                            <MenuItem value={3}>Retail</MenuItem>
                            <MenuItem value={4}>General</MenuItem>
                        </Select>
                        {/* <FormHelperText>Select data type</FormHelperText> */}
                    </FormControl>
                </Box>
                {/* <Messages messages={messages} isLoading={isLoading} /> */}

                <Box m="20px">
                    {/* HEADER */}
                    {/* <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="" subtitle="Welcome to your dashboard" />

                        <Box>
                            <Button
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                }}
                            >
                                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                                Download Reports
                            </Button>
                        </Box>
                    </Box> */}

                    {/* GRID & CHARTS */}
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="100px"
                        gap="10px"
                    >
                        {/* ROW 1 */}
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title="Models"
                                subtitle="04"
                                // subtitle2="vs last 7 days"
                                increase="+25%"

                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <StatBox
                                title="Users"
                                subtitle="03"
                                // subtitle2="vs last 7 days"
                                decrease="-2%"
                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title="Tokens"
                                subtitle="534" progress="0.30"
                                increase="+12%"
                                subtitle2="last 7 days"

                            />
                        </Box>
                        <Box
                            gridColumn="span 3"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <StatBox
                                title="Requests"
                                subtitle="186"
                                increase="+12%"

                            />
                        </Box>

                        {/* ROW 2 */}

                        {/* ROW 3 */}

                    </Box>
                </Box>




                {/* {/* <ChatBubble isLoading={isLoading} /> */}
            </Box>

        </Stack >
    );
};

export default Dashboard;
