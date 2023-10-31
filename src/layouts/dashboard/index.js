import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  Stack,
  Switch
} from "@mui/material";
// import Logo from "../../assets/Images/logo.ico"
import Logo from "../../assets/Images/nitor-logo-main.png";
import { Nav_Buttons } from "../../data";
import { BellRinging } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { Row, Col } from "antd"
import Conversation from "../../components/Conversation";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';




const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 13,
    height: 13,
    borderRadius: 6.5,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 17 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


const DashboardLayout = () => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState(2);
  const [value, setValue] = React.useState(0);
  const [selectedType, setSelectedType] = useState('')


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectionChange = (event) => {
    setValue(event.target.value);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  }


  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    // <Row direction="col">
    //   <Col>
    <Stack direction="row">
      <Stack sx={{ paddingRight: 0.2 }}>
        <Box
          p={2}
          sx={{
            backgroundColor: theme.palette.common.black,
            height: "100vh",
            width: 100,
            boxShadow: "0px 0px 2px rgba(0,0,0.25)",
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            sx={{ height: "100%" }}
            spacing={3.5}
            justifyContent="space-between"

          >
            <Stack alignItems={"center"} spacing={4}>

              <Box
                sx={{
                  backgroundColor: theme.palette.common.white,
                  height: 64,
                  width: 64,
                  borderRadius: 1.5,
                }}
              >
                <img src={Logo} alt="Nitor Logo" />
              </Box>
              <Stack
                spacing={3}
                sx={{ width: "max-content" }}
                direction="column"
                alignItems="center"
              >
                {Nav_Buttons.map((m) =>
                  m.index == selectedButton ? (
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.common.white,
                        borderRadius: 1.5,
                      }}
                    >
                      <IconButton
                        key={m.index}
                        sx={{ width: "max-content", color: "#000" }}
                      >
                        {m.icon}
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setSelectedButton(m.index);
                      }}
                      key={m.index}
                      sx={{ width: "max-content", color: "#fff" }}
                    >
                      {m.icon}
                    </IconButton>
                  )
                )}

                <Divider sx={{ width: "48px", borderBottomWidth: 5, background: theme.palette.divider }} />


              </Stack>
            </Stack>


            <Stack spacing={2}>
              {selectedButton == 3 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ width: "max-content", color: "#000" }}>
                    <BellRinging />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelectedButton(3);
                  }}
                >
                  <BellRinging sx={{ width: "100%", color: "#fff" }} />
                </IconButton>
              )}
              <Avatar src={faker.image.avatar()} sx={{ height: 35, width: 35, borderRadius: 35 / 2, alignSelf: "center" }} />
              {/* <AntSwitch defaultChecked /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* </Col> */}
      {/* <Outlet /> */}
      {/* <Col> */}
      <>
        <Conversation />
      </>

      <Stack sx={{ paddingLeft: 0.2, borderLeft: "0.5px solid darkgray" }} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', }} p={1}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Recent" {...a11yProps(0)} />
            <Tab label="Favourites" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />


          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>

          <Box p={1} sx={{ width: "auto", height: "auto", borderRadius: 2, backgroundColor: "red", color: "red" }}>
            <Typography sx={{ color: "red" }} fontSize={12} >
              What is HIV and its symptoms?
            </Typography>
          </Box>

        </CustomTabPanel>
      </Stack >

    </Stack >
    //  </Col>
    //   </Row > 
  );
};

export default DashboardLayout
