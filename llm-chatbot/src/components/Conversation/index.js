import { faker } from "@faker-js/faker";
import { Box, Stack, Avatar, Badge, Typography, InputAdornment, IconButton, Button, TextField, Backdrop, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const useStyles = makeStyles(theme => ({
    input: {
        "&::placeholder": {
            color: "darkgray",
            //  textAlign: "center",
            justifyContent: "center",
            textAlign: "left",
            alignContent: "center",
            alignItems: "center",
            justify: "center",

        }
    }
}));



const Conversation = () => {

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

    const [gMessages, setGMessages] = useState([
        { from: "bot", text: "Hello! I am the Nitor Chabot, Please ask any question!" },
    ]);

    const [saveList, setSaveList] = useState()

    const [inputMessage, setInputMessage] = useState("");
    const [pageLoad, setPageLoad] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = React.useState(1);
    const [selectedType, setSelectedType] = useState('')
    const [autoQ, setAutoQ] = useState("")
    const classes = useStyles();
    let tokens = localStorage.getItem("tokens")
    const [inputT, setInputT] = useState("0");
    const [outputT, setOutputT] = useState("0");
    const [responseT, setResponseT] = useState(0.01);
    const [totalT, setTotalT] = useState("0")
    const [baseURL, setBaseURL] = useState("http://10.11.13.102:5000")
    const [points, setPoints] = useState()


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSelectionChange = (event) => {
        console.log("value", event.target.value)
        setValue(event.target.value);
        setInputT("0")
        setOutputT("0")
        setResponseT(0)
        setTotalT("0")
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


    const capitalize = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);


    const split = (text) =>
        text
            .split(".")
            .map((p) => (
                <Typography variant="body1">{`${capitalize(p)}`}</Typography>

            ))


    const basicAlerts = () => {
        return (

            <Alert severity="success">Your conversation is saved successfully </Alert>

        );
    }


    const handleAutoSend = async (data) => {
        handleOpen()
        console.log("inside auto method", data)
        let url = 'https://nitorhealth.community.saturnenterprise.io'
        let urlCORS = `https://` + `${url}`
        let token = "deployment-4835a3af01624b49a626b7c8afa3b6e8"


        // let data = { "text": "What are symptoms of Covid-19?" }

        let config = {

            headers: {
                'Authorization': `Bearer` + ` ${token}`,
                'Access-Control-Allow-Origin': "*"
            }
        }
        setIsLoading(true)
        let user = localStorage.getItem("userId")
        // if (!autoQ.trim().length) {
        //     return;
        // }
        // const data = autoQ.toString();

        // setRetailMessages((old) => [...old, { from: "me", text: data }]);
        if (value == 1)
            console.log("inside 1")
        if (value == 2)
            console.log("inside 2")

        if (value == 3)
            console.log("inside 3")







        console.log("sending request")
        let response;


        console.log("inside single", data)


        if (value == 1) {
            console.log("inside 1", data)
            response = await axios.post({ target: "http://10.11.13.102:5000/health" },
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`
                    }
                })

            if (response)
                handleClose()
            else {
                setHMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);

                handleClose()
            }

            console.log("response", response)
        }
        else if (value == 2) {
            console.log("sending finance request")
            console.log("inside 2", data)
            response = await axios.post({ target: "http://10.11.13.102:5000/finance" },
                { "text": `${data}` },
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`
                    }
                })
            if (response)
                handleClose()
            else {
                setRMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);
                handleClose()
            }

            console.log("response", response)

        }
        else if (value == 3) {
            console.log("sending general request")
            console.log("inside 3", data)
            response = await axios.post("http://10.11.13.102:5000/general",
                { "text": `${data}` },
                // {
                //     headers: {
                //         'Authorization': `Bearer` + ` ${token}`
                //     }
                // }
            )
            if (response)
                handleClose()
            else {
                setGMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);
                handleClose()
            }

            console.log("response", response)

        }
        else {

        }

        let responseData = response.data?.length ? (response.data.result).toString() : null;
        console.log("input token", response.data.input_token_used)
        console.log("output token", response.data.output_token_used)
        console.log("execution time", response.data.execution_time)
        console.log("total token", response.data.total_token_used)



        setInputT(response?.data.input_token_used)
        setOutputT(response?.data.output_token_used)
        setResponseT(response?.data.execution_time)
        setTotalT(response?.data.total_token_used)


        if (value == 1) {
            setTimeout(() => {
                if (response?.data.result != "The question is not related to healthcare.")
                    setSaveList({ userId: user, qadata: { question: Array.from(hMessages.values()).pop(), answer: response?.data.result, type: "healthcare", favourite: 0 }, inputTokens: "", outputTokens: "", totalTokens: "", responseTime: "" });
                setHMessages((old) => [...old, { from: "bot", text: response?.data.result }]);


            }, 1000);
        }
        else if (value == 2) {
            setTimeout(() => {

                setRMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1000);
        }
        else if (value == 3) {

            let result;

            if (JSON.stringify(response?.data.result).includes("1.") && JSON.stringify(response?.data.result).includes("2.")) {


                // Split the response into paragraphs and points
                let [paragraphs, points] = response?.data.result.split('\n');

                // Format paragraphs
                const formattedParagraphs = paragraphs.split('\n').map((paragraph, index) => (
                    <Typography key={`para-${index}`} variant="body1" paragraph>
                        {paragraph}
                    </Typography>
                ));

                // Format points
                const formattedPoints = points.split('\n').map((point, index) => {
                    // Check if the line starts with a number followed by a dot
                    const isNumberedPoint = /^\d+\./.test(point.trim());

                    return (
                        <Typography
                            key={`point-${index}`}
                            variant="body1"
                            paragraph
                            component={isNumberedPoint ? 'div' : 'p'}
                            style={{ marginLeft: isNumberedPoint ? '16px' : '0' }}
                        >
                            {point}
                        </Typography>
                    );
                });


                console.log("formatted", formattedParagraphs)
                console.log("points", formattedPoints)
                setPoints(formattedPoints)






                // if (typeof (response?.data.result === "object"))
                //     formatted = JSON.stringify(response)

                let formatted = response?.data.result.replace(/\n/g, ``)
                // let formattedArray = formatted.split(`\n`);
                let formattedArray = formatted.split(`<br/><br/>`);

                // let formattedAns = `<ol>` + formattedArray.map(ans =>
                //     `<li>${ans}</li>`).join("") + `</ol>`;
                // let formattedAns = (
                //     <ol>
                //         {formattedArray?.map((answer, index) => (
                //             <li key={index}>{answer}</li>
                //         ))}
                //     </ol>
                // )

                // Split the text into lines
                const lines = formattedArray;

                // Initialize variables to track unique numbers
                let seenNumbers = new Set();

                // Process each line
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i].trim();

                    // Check if the line starts with a number followed by a dot
                    const match = line.match(/^\d+\./);

                    if (match) {
                        const number = parseInt(match[0]);

                        // Check if the number is not in the set and the line has content
                        if (!seenNumbers.has(number) && line.length > match[0].length) {
                            // Add the number to the set and update the line
                            seenNumbers.add(number);
                            lines[i] = line.replace(/^\d+/, seenNumbers.size + '.');
                        } else {
                            // Remove lines with duplicate numbers or empty content
                            lines.splice(i, 1);
                            i--;
                        }
                    }
                }

                // Join the lines and display the result
                result = lines.join("\n");
                console.log(result);

            }
            else
                result = response?.data.result





            setTimeout(() => {

                setGMessages((old) => [...old, { from: "bot", text: result }]);
            }, 1000);
        }
        else {

        }

        // }
        return response
        // return "ok"

    }



    const handleSendMessage = async () => {
        console.log("inside method", inputMessage)
        let url = 'https://nitorhealth.community.saturnenterprise.io'
        let urlCORS = `https://` + `${url}`
        // let token = "deployment-4835a3af01624b49a626b7c8afa3b6e8"
        let user = localStorage.getItem("userId")
        let token = localStorage.getItem("token")



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


        }
        if (value == 2) {
            console.log("inside 2")
            setRMessages((old) => [...old, { from: "me", text: data }]);


        }
        if (value == 3) {
            console.log("inside 3")
            setGMessages((old) => [...old, { from: "me", text: data }]);


        }
        setInputMessage("")




        console.log("sending request")
        let response;

        // console.log("sending finance request")
        console.log("inside single", data)




        if (value == 1) {
            console.log("inside 1", data)
            response = await axios.post("http://10.11.13.102:5000/health",
                { "text": `${data}` },
                // {
                //     headers: {
                //         'Authorization': `Bearer` + ` ${token}`
                //     }
                // })
            )
            if (response)
                handleClose()
            else {
                setHMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);
                handleClose()
            }

            console.log("response", response)
        }
        else if (value == 2) {
            console.log("sending finance request")
            console.log("inside 2", data)
            response = await axios.post("http://10.11.13.102:5000/finance",
                { "text": `${data}` },
                // {
                //     headers: {
                //         'Authorization': `Bearer` + ` ${token}`
                //     }
                // }
            )
            if (response)
                handleClose()
            else {
                setRMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);
                handleClose()
            }



            // console.log("response", response)


        }

        else if (value == 3) {
            console.log("sending general request")
            console.log("inside 3", data)
            response = await axios.post("http://10.11.13.102:5000/general",
                { "text": `${data}` },
                // {
                //     headers: {
                //         'Authorization': `Bearer` + ` ${token}`
                //     }
                // }
            )
            if (response)
                handleClose()
            else {

                setGMessages((old) => [...old, { from: "bot", text: "Sorry, there was an error" }]);
                handleClose()
            }
        }
        else {

        }


        let responseData = response.data?.length ? (response.data.result).toString() : null;
        console.log("input token", response.data.input_token_used)
        console.log("output token", response.data.output_token_used)
        console.log("execution time", response.data.execution_time)
        console.log("total token", response.data.total_token_used)



        setInputT(response?.data.input_token_used)
        setOutputT(response?.data.output_token_used)
        setResponseT(response?.data.execution_time)
        setTotalT(response?.data.total_token_used)

        // tokens = localStorage.getItem("tokens")
        // tokens = parseInt(tokens) + response?.data.total_token_used
        // localStorage.setItem("tokens", tokens)


        if (value == 1) {


            setSaveList({ userId: user, question: data, answer: response?.data.result, model: "healthcare", favourite: false, inputTokens: response?.data.input_token_used, outputTokens: response?.data.output_token_used, totalTokens: response?.data.total_token_used, responseTime: response?.data.execution_time });
            const request = { "userId": user, "question": data, "answer": response?.data.result, "model": "Healthcare", "favourite": false, "inputTokens": response?.data.input_token_used, "outputTokens": response?.data.output_token_used, "totalTokens": response?.data.total_token_used, "responseTime": response?.data.execution_time }
            // const request = { userId: "657b3a19e8ff286e40bafdb9", question: data, answer: response?.data.result, inputTokens: response?.data.input_token_used, outputTokens: response?.data.output_token_used, totalTokens: response?.data.total_token_used, responseTime: response?.data.execution_time }

            setTimeout(() => {
                setHMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1200)
            console.log("sending request", request)
            let resp = await axios.post("http://localhost:3000/qa/save", request,
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`,
                        'Content-Type': 'application/json'
                    }
                }

            )
            console.log("response received, saved", resp)
            if (resp) {
                return (

                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>conversation saved!</strong>
                    </Alert>

                );
            }



        }
        else if (value == 2) {
            setSaveList({ userId: user, question: data, answer: response?.data.result, model: "Finance", favourite: false, inputTokens: response?.data.input_token_used, outputTokens: response?.data.output_token_used, totalTokens: response?.data.total_token_used, responseTime: response?.data.execution_time });
            const request = { "userId": user, "question": data, "answer": response?.data.result, "model": "Finance", "favourite": false, "inputTokens": response?.data.input_token_used, "outputTokens": response?.data.output_token_used, "totalTokens": response?.data.total_token_used, "responseTime": response?.data.execution_time }
            setTimeout(() => {
                setRMessages((old) => [...old, { from: "bot", text: response?.data.result }]);
            }, 1200);
            console.log("sending request", request)
            let resp = await axios.post("http://localhost:3000/qa/save", request,
                {
                    headers: {
                        'Authorization': `Bearer` + ` ${token}`,
                        'Content-Type': 'application/json'
                    }
                }

            )
            console.log("response received, saved", resp)
            if (resp)
                basicAlerts()
        }
        else if (value == 3) {
            let result;

            if (JSON.stringify(response?.data.result).includes("1.") && JSON.stringify(response?.data.result).includes("2.")) {


                // Split the response into paragraphs and points
                let [paragraphs, points] = response?.data.result.split('\n');

                // Format paragraphs
                const formattedParagraphs = paragraphs.split('\n').map((paragraph, index) => (
                    <Typography key={`para-${index}`} variant="body1" paragraph>
                        {paragraph}
                    </Typography>
                ));

                // Format points
                const formattedPoints = points.split('\n').map((point, index) => {
                    // Check if the line starts with a number followed by a dot
                    const isNumberedPoint = /^\d+\./.test(point.trim());

                    return (
                        <Typography
                            key={`point-${index}`}
                            variant="body1"
                            paragraph
                            component={isNumberedPoint ? 'div' : 'p'}
                            style={{ marginLeft: isNumberedPoint ? '16px' : '0' }}
                        >
                            {point}
                        </Typography>
                    );
                });


                console.log("formatted", formattedParagraphs)
                console.log("points", formattedPoints)
                setPoints(formattedPoints)






                // if (typeof (response?.data.result === "object"))
                //     formatted = JSON.stringify(response)

                let formatted = response?.data.result.replace(/\n/g, ``)
                // let formattedArray = formatted.split(`\n`);
                let formattedArray = formatted.split(`<br/><br/>`);

                // let formattedAns = `<ol>` + formattedArray.map(ans =>
                //     `<li>${ans}</li>`).join("") + `</ol>`;
                // let formattedAns = (
                //     <ol>
                //         {formattedArray?.map((answer, index) => (
                //             <li key={index}>{answer}</li>
                //         ))}
                //     </ol>
                // )

                // Split the text into lines
                const lines = formattedArray;

                // Initialize variables to track unique numbers
                let seenNumbers = new Set();

                // Process each line
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i].trim();

                    // Check if the line starts with a number followed by a dot
                    const match = line.match(/^\d+\./);

                    if (match) {
                        const number = parseInt(match[0]);

                        // Check if the number is not in the set and the line has content
                        if (!seenNumbers.has(number) && line.length > match[0].length) {
                            // Add the number to the set and update the line
                            seenNumbers.add(number);
                            lines[i] = line.replace(/^\d+/, seenNumbers.size + '.');
                        } else {
                            // Remove lines with duplicate numbers or empty content
                            lines.splice(i, 1);
                            i--;
                        }
                    }
                }

                // Join the lines and display the result
                result = lines.join("\n");
                console.log(result);

            }
            else
                result = response?.data.result



            // split(result)

            setTimeout(() => {
                setGMessages((old) => [...old, { from: "bot", text: result }]);
            }, 800);

        }

        else {

        }

        // }
        return response
        // return "ok"

    }

    const handleText = (event) => {
        setInputMessage(event.target.value)

    }

    const [open, setOpen] = React.useState(false);
    const [onLoad, setOnLoad] = React.useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => {
            elementRef.current.scrollIntoView()
        }, [isLoading]);
        return <div ref={elementRef} />;
    };

    useEffect(() => {

        setOnLoad(true)
        setTimeout(() => {
            setOnLoad(false)
        }, 3000)

    }, [])



    return (


        <Stack height="100%" maxHeight="100vh" width="100%" flex={1}>
            < Box

                sx={{
                    height: 95,
                    maxHeight: 95,
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
                                <InputLabel id="demo-simple-select-helper-label" sx={{}}>Model</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={value}
                                    label="Model"
                                    onChange={handleSelectionChange}

                                >

                                    <MenuItem value={1}>Healthcare</MenuItem>
                                    <MenuItem value={2}>Finance</MenuItem>
                                    <MenuItem value={3}>General</MenuItem>
                                    <MenuItem value={4}>Retail</MenuItem>

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


            {/* Middle section of  chat conversations*/}





            <Box sx={{ width: "100%", height: window.innerHeight / 0.8, maxHeight: window.innerHeight / 0.8, overflowY: "scroll", scrollBehavior: "smooth" }}   >
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
                                                maxWidth: 550,
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
                                                width: 550,
                                                maxWidth: 550,
                                                marginLeft: "2%",
                                                fontWeight: "lighter"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography fontSize={15}>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )

                            }
                        }) : value == 2 ? rMessages.map((item, index) => {
                            if (item.from === "me") {
                                return (
                                    <Stack key={index} width="100%" justify="flex-start" direction="row" sx={{ marginBottom: "1.5%", marginTop: "1.5%" }} >
                                        <Box >
                                            {/* <Avatar src={faker.image.avatar()} sx={{ width: 25, height: 25, borderRadius: 20 / 2 }} /> */}
                                            <UserCirclePlus size={30} />
                                        </Box>
                                        <Box
                                            sx={{
                                                color: "black",
                                                width: 450,
                                                maxWidth: 550,
                                                marginLeft: "2%",
                                                fontWeight: "bolder"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography >{item.text}</Typography>
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
                                                width: 500,
                                                maxWidth: 550,
                                                marginLeft: "2%",
                                                fontWeight: "lighter"
                                                // border: "0.5p5x solid darkgray"

                                            }}

                                        >
                                            <Typography fontSize={15}>{item.text}</Typography>
                                        </Box>
                                    </Stack>
                                )

                            }
                        }) : gMessages.map((item, index) => {
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
                                                maxWidth: 550,
                                                marginLeft: "2%",
                                                fontWeight: "bolder"
                                                // border: "0.5px solid darkgray"

                                            }}

                                        >
                                            <Typography >{item.text}</Typography>
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
                                                width: 500,
                                                maxWidth: 550,
                                                marginLeft: "2%",
                                                fontWeight: "lighter"
                                                // border: "0.5p5x solid darkgray"

                                            }}

                                        >
                                            <Typography fontSize={15}>{split(item.text)}</Typography>
                                            {/* <h3 >{item.text}</h3> */}
                                        </Box>
                                    </Stack>
                                )

                            }
                        })}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={onLoad}
                        onClick={{}}
                    >
                    </Backdrop>
                    {open ? <CircularProgress size={25} color="primary" onClick={handleClose} /> : (<></>)}

                    <AlwaysScrollToBottom />

                </Box>




                {/* {/* <ChatBubble isLoading={isLoading} /> */}
            </Box>


            <Box
                p={2}
                sx={{

                    width: "100%",
                    // backgroundColor: "#F8FAFF",
                    // boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    backgroundColor: "#fff",

                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} marginBottom={2}>

                    <h5>Chat suggestions:</h5>

                    {value == 1 ? (
                        <><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                            <Button onClick={() => {
                                setHMessages((old) => [...old, { from: "me", text: "What is HIV and its symptoms?" }]);

                                handleAutoSend("What is HIV and its symptoms?")

                            }}>
                                <Typography sx={{ color: "#000" }} fontSize={12}>
                                    What is HIV and its symptoms?
                                </Typography>
                            </Button>

                        </Box><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                <Button onClick={() => {
                                    setHMessages((old) => [...old, { from: "me", text: "What is Covid-19 disease?" }]);

                                    handleAutoSend("What is Covid-19 disease?")
                                }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What is Covid-19 disease?
                                    </Typography>
                                </Button>
                            </Box><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                <Button onClick={() => {

                                    setHMessages((old) => [...old, { from: "me", text: "What is health insurance?" }]);

                                    handleAutoSend("What is health insurance?")
                                }}>
                                    <Typography sx={{ color: "#000" }} fontSize={12}>
                                        What is health insurance?
                                    </Typography>
                                </Button>
                            </Box></>) : value == 2 ? (<>
                                <Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                    <Button onClick={() => {

                                        setRMessages((old) => [...old, { from: "me", text: "What are the key differences between stocks and bonds?" }]);
                                        handleAutoSend("What are the key differences between stocks and bonds?")
                                    }}>
                                        <Typography sx={{ color: "#000" }} fontSize={12}>
                                            What are the key differences between stocks and bonds?
                                        </Typography>
                                    </Button>

                                </Box><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                    <Button onClick={() => {

                                        setRMessages((old) => [...old, { from: "me", text: "Explain the P/E ratio?" }]);
                                        handleAutoSend("Explain the P/E ratio?")
                                    }}>
                                        <Typography sx={{ color: "#000" }} fontSize={12}>
                                            Explain the P/E ratio?
                                        </Typography>
                                    </Button>
                                </Box><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                    <Button onClick={() => {

                                        setRMessages((old) => [...old, { from: "me", text: "What are fixed bonds?" }]);
                                        handleAutoSend("What are fixed bonds?")
                                    }}>
                                        <Typography sx={{ color: "#000" }} fontSize={12}>
                                            What are fixed bonds?
                                        </Typography>
                                    </Button>
                                </Box></>) : (<>
                                    <Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                        <Button onClick={() => {

                                            setGMessages((old) => [...old, { from: "me", text: "Ideas to plan new years resolutions" }]);
                                            handleAutoSend("Ideas to plan new years resolutions")
                                        }}>
                                            <Typography sx={{ color: "#000" }} fontSize={12}>
                                                Ideas to plan new years resolutions
                                            </Typography>
                                        </Button>

                                    </Box><Box p={0.1} sx={{ width: "auto", height: "auto", borderRadius: 7, textAlign: "center", alignItems: "center", backgroundColor: "#F8FAFF", color: "#F8FAFF" }}>
                                        <Button onClick={() => {

                                            setGMessages((old) => [...old, { from: "me", text: "Make a content strategy for an events newsletter" }]);
                                            handleAutoSend("Make a content strategy for an events newsletter")
                                        }}>
                                            <Typography sx={{ color: "#000" }} fontSize={12}>
                                                Make a content strategy for an events newsletter
                                            </Typography>
                                        </Button>
                                    </Box></>)}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton sx={{ marginLeft: "-2%" }} >
                        <Paperclip size={30} />
                    </IconButton>
                    <TextField placeholder="Send a message..." fullWidth variant="filled" InputProps={{
                        disableUnderline: true, endAdornment:
                            <InputAdornment>
                                <IconButton>
                                    <Microphone size={25} />
                                </IconButton>
                                <Box sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "red", }} height={32} width={32} borderRadius={35 / 2} alignContent="center" alignItems={"center"}>
                                    <IconButton sx={{ color: "white" }} onClick={() => handleSendMessage()}>
                                        <PaperPlaneRight size={"auto"} />
                                    </IconButton>
                                </Box>
                            </InputAdornment>,
                        classes: { input: classes.input }

                    }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                // setAutoQ(false)
                                handleSendMessage();
                                handleOpen()
                            }
                        }}
                        onChange={handleText}
                        sx={{
                            paddingTop: "7px !important",
                            paddingBottom: "7px !important",
                            border: "2 px solid",
                            color: "black",
                            textAlign: "center"
                        }}

                        defaultValue={inputMessage}
                        value={inputMessage}
                    />
                </Stack>
                <Stack direction="row" sx={{ marginTop: "1%", justifyContent: "space-between" }}>
                    <h5>Response Time: {responseT?.toFixed(2)} seconds</h5>
                    <h5>Input Tokens: {inputT}</h5>
                    <h5>Output Tokens: {outputT}</h5>
                    <h5>Total Tokens Used: {totalT}/{value == 1 || value == 2 ? 200 : 1000}</h5>
                </Stack>
            </Box>
        </Stack >
    );
};

export default Conversation;
