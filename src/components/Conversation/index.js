import { faker } from "@faker-js/faker";
import { Box, Stack, Avatar, Badge, Typography, TextField, InputAdornment, IconButton, Button } from "@mui/material";
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



const Conversation = () => {

    const [retailMessages, setRetailMessages] = useState([
        { from: "bot", text: "Hello, I am the retail bot. Please ask any retail question" },
        { from: "me", text: "Who is the competitor of Apple iPhone?" },
        {
            from: 'bot', text: `Sure, here is the list of the biggest competitors of Apple iPhone \n\n
        1.Samsung: Samsung is one of the biggest competitors of the iPhone. \n \n
        They offer a wide range of smartphones across various price points, from flagship series to more budget friendly options` }

    ]);

    const [rMessages, setRMessages] = useState([
        { from: "bot", text: "Hello, I am the Nitor Finance Chabot. Please ask any Finance question" },
    ]);


    const [hMessages, setHMessages] = useState([
        { from: "bot", text: "Hello, I am the Nitor Healthcare Chabot. Please ask any healthcare question" },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [pageLoad, setPageLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = React.useState(1);
    const [selectedType, setSelectedType] = useState('')
    const [autoQ, setAutoQ] = useState(false)

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

        console.log("sending finance request")
        console.log("inside single", data)
        response = await axios.post("/finance",
            { "text": `${data}` },
            {
                headers: {
                    'Authorization': `Bearer` + ` ${token2}`
                }
            })

        console.log("response", response)








        // if (value == 1) {
        //     console.log("inside 1", data)
        //     response = await axios.post("/health",
        //         { "text": `${data}` },
        //         {
        //             headers: {
        //                 'Authorization': `Bearer` + ` ${token}`
        //             }
        //         })

        //     console.log("response", response)
        // }
        // else {
        //     console.log("sending finance request")
        //     console.log("inside 2", data)
        //     response = await axios.post("/finance",
        //         { "text": `${data}` },
        //         {
        //             headers: {
        //                 'Authorization': `Bearer` + ` ${token2}`
        //             }
        //         })

        //     console.log("response", response)

        // }

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
            < Box

                sx={{
                    height: 95,
                    minHeight: 95,
                    width: "100%",
                    // backgroundColor: "black"
                    backgroundColor: "#F8FAFF",
                    boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",

                }
                }
            >

                <Stack alignItems={"center"} direction="row" justifyContent={""} sx={{ width: "100%" }}>
                    <Stack direction="row" >
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
                                <InputLabel id="demo-simple-select-helper-label">Data Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={value}
                                    label="Data Type"
                                    onChange={handleSelectionChange}

                                >

                                    <MenuItem value={1}>Healthcare</MenuItem>
                                    <MenuItem value={2}>Finance</MenuItem>
                                    <MenuItem value={3}>Retail</MenuItem>
                                </Select>
                                {/* <FormHelperText>Select data type</FormHelperText> */}
                            </FormControl>
                        </Box>

                    </Stack>
                    <Stack>
                        <Box>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Box>
                    </Stack>

                    {/* <Stack>
                        <Sidebar />
                    </Stack> */}

                </Stack>

            </Box >




            <Box sx={{ width: "100%", flexGrow: 1, height: window.innerHeight / 0.8 }}   >
                {/* <Messages messages={messages} isLoading={isLoading} /> */}

                <Box sx={{ overflowY: "scroll", overflow: "hidden", flexDirection: "column" }} p={3}>
                    {/* {retailMessages.map((item, index) => {
                        if (item.from === "me") {
                            return (
                                <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }} >
                                    <Box >
                                        <Avatar src={faker.image.avatar()} sx={{ width: 25, height: 25, borderRadius: 20 / 2 }} />
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "darkgray",
                                            width4 350,
                                            maxWidth4 350,
                                            marginLeft: "2%",
                                            fontWeight: "bolder"
                                            // border: "0.5px solid darkgray"

                                        }}

                                    >
                                        <Typography>{item.text}</Typography>
                                    </Box>
                                </Stack>
                            )
                        } else {
                            return (
                                <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }}>
                                    <Box>
                                        <Robot size={30} />
                                    </Box>
                                    <Box
                                        sx={{
                                            color: "black",
                                            width4 350,
                                            maxWidth4 350,
                                            marginLeft: "2%",
                                            fontWeight: "lighter"
                                            // border: "0.5px solid darkgray"

                                        }}

                                    >
                                        <Typography>{item.text}</Typography>
                                    </Box>
                                </Stack>
                            )

                        }
                    })} */}
                    {value == 1 ?
                        hMessages.map((item, index) => {
                            if (item.from === "me") {
                                return (
                                    <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }} >
                                        <Box >
                                            <UserCirclePlus size={30} />
                                            {/* <Avatar src={faker.image.avatar()} sx={{ width: 25, height: 25, borderRadius: 20 / 2 }} /> */}
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "darkgray",
                                                width: 450,
                                                maxWidth: 450,
                                                marginLeft: "2%",
                                                fontWeight: "bolder"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )
                            } else {
                                return (
                                    <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }}>
                                        <Box>
                                            <Robot size={30} />
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "black",
                                                width: 450,
                                                maxWidth: 450,
                                                marginLeft: "2%",
                                                fontWeight: "lighter"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )

                            }
                        }) : rMessages.map((item, index) => {
                            if (item.from === "me") {
                                return (
                                    <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }} >
                                        <Box >
                                            {/* <Avatar src={faker.image.avatar()} sx={{ width: 25, height: 25, borderRadius: 20 / 2 }} /> */}
                                            <UserCirclePlus size={30} />
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "darkgray",
                                                width: 450,
                                                maxWidth: 450,
                                                marginLeft: "2%",
                                                fontWeight: "bolder"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )
                            } else {
                                return (
                                    <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }}>
                                        <Box>
                                            <Robot size={30} />
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "black",
                                                width: 450,
                                                maxWidth: 450,
                                                marginLeft: "2%",
                                                fontWeight: "lighter"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )

                            }
                        })}
                    {/* <AlwaysScrollToBottom /> */}
                </Box>




                {/* {/* <ChatBubble isLoading={isLoading} /> */}
            </Box>

            <Box
                p={2}
                sx={{

                    width: "100%",
                    // backgroundColor: "#F8FAFF",
                    // boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    backgroundColor: "#fff"
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} marginBottom={2}>

                    <h5>Chat suggestions:</h5>

                    {value == 1 ? (
                        <><Box p={0.5} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                            <Button onClick={() => {
                                setInputMessage("What is HIV and its symptoms?")
                                setHMessages((old) => [...old, { from: "me", text: "What is HIV and its symptoms?" }]);
                                setAutoQ(true)
                                // handleSendMessage()
                            }}>
                                <Typography sx={{ color: "#000" }} fontSize={12}>
                                    What is HIV and its symptoms?
                                </Typography>
                            </Button>

                        </Box><Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                <Button onClick={() => {
                                    setInputMessage("What is Covid-19 disease?")
                                    setHMessages((old) => [...old, { from: "me", text: "What is Covid-19 disease?" }]);
                                    setAutoQ(true)
                                    // handleSendMessage()
                                }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What is Covid-19 disease?
                                    </Typography>
                                </Button>
                            </Box><Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                <Button onClick={() => {
                                    setInputMessage("What is health insurance?")
                                    setHMessages((old) => [...old, { from: "me", text: "What is health insurance?" }]);
                                    setAutoQ(true)
                                    // handleSendMessage()
                                }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What is health insurance?
                                    </Typography>
                                </Button>
                            </Box></>) : (<>
                                <Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>

                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What are the key differences between stocks and bonds?
                                    </Typography>

                                </Box><Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        Explain the P/E ratio
                                    </Typography>
                                </Box><Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What is the meaning of financial markets?
                                    </Typography>
                                </Box></>)}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton>
                        <Paperclip size={32} />
                    </IconButton>
                    <TextField placeholder="Send a message..." fullWidth variant="filled" InputProps={{
                        disableUnderline: true, endAdornment:
                            <InputAdornment>
                                <IconButton>
                                    <Microphone />
                                </IconButton>
                                <Box sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "red", }} height={35} width={35} borderRadius={35 / 2} alignContent="center" alignItems={"center"}>
                                    <IconButton sx={{ color: "white" }} onClick={() => handleSendMessage()}>
                                        <PaperPlaneRight size={"auto"} />
                                    </IconButton>
                                </Box>
                            </InputAdornment>

                    }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                // setAutoQ(false)
                                handleSendMessage();
                            }
                        }}
                        onChange={handleText}
                        sx={{
                            paddingTop: "7px !important",
                            paddingBottom: "7px !important",
                            border: "2 px solid",
                            color: "black",
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center"
                        }}

                        defaultValue={inputMessage}
                        value={inputMessage}
                    />
                </Stack>
                <Stack direction="row" sx={{ marginTop: "1%", marginLeft: "88%" }}>
                    <h6>Tokens: 1250/2000</h6>
                </Stack>
            </Box>
        </Stack >
    );
};

export default Conversation;
