import React, { useEffect, useRef } from "react";
// import "./Message.css"

import { Avatar, Box } from "@mui/material";
import Typography from "../theme/overrides/Typography";
import { faker } from "@faker-js/faker";
import { Robot } from "phosphor-react"

const Messages = ({ messages, isLoading, }) => {



    // const AlwaysScrollToBottom = () => {
    //     const elementRef = useRef();
    //     useEffect(() => {
    //         elementRef.current.scrollIntoView()
    //     }, [isLoading]);
    //     return <div ref={elementRef} />;
    // };





    return (
        <Box sx={{ overflowY: "scroll", flexDirection: "column" }} p={3}>
            {messages.map((item, index) => {
                if (item.from == "me") {
                    return (
                        <Box key={index} width="100%" justify="flex-start" >
                            <Box
                                sx={{
                                    color: "black",
                                    width: 300,
                                    maxWidth: 350,
                                    border: "0.5px solid darkgray"

                                }}

                            >
                                <Typography>{item.text}</Typography>
                            </Box>
                        </Box>
                    );
                } else {
                    return (
                        <Box key={index} width="100%" marginTop={3}>

                            {/* {isLoading && (
                                <div class="chat-bubble">
                                    <div class="typing">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                </div>) } */}
                            <Robot size={20} />
                            <Box
                                sx={{

                                    color: "darkgray",
                                    width: 350,
                                    maxWidth: 350,
                                    border: "0.5px solid black"

                                }}
                                p={3}
                            >


                                {/* <Typist cursor={false}> */}
                                {item.text}
                                {/* </Typist> */}

                                {/* <Text>{item.text}</Text> */}
                            </Box>
                        </Box>
                    );
                }
            })}
            {/* <AlwaysScrollToBottom /> */}
        </Box>
    );
};


export default Messages;
