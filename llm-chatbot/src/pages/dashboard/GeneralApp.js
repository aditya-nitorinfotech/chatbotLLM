import { Box, Stack } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";

const GeneralApp = () => {

  return (
    <Stack direction="row" sx={{ width: "100%" }}>

      <Box sx={{
        height: "100%",
        width: "calc(100vw-100px)",
        backgroundColor: "#000"
      }}>
        {/* <Conversation /> */}
      </Box>
      {/* <Chats /> */}

    </Stack>
  );

};

export default GeneralApp;
