import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  Stack,
  Switch,

} from "@mui/material";
// import Logo from "../../assets/Images/logo.ico"
import Logo from "../../assets/Images/nitor-logo-main.png";
import { Nav_Buttons } from "../../data";
import { BellRinging, BookBookmark } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { Row, Col } from "antd"
import Conversation from "../../components/Conversation";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { maxHeight } from "@mui/system";
import Dashboard from "../../components/Dashboard";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useHistory } from "react-router-dom"
import axios from "axios"
import Modal from "@mui/material/Modal"
import Collapse from "@mui/material/Collapse";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


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
  const history = useHistory()
  const [saveList, setSaveList] = useState([])
  const [list, setList] = useState()
  const [open, setOpen] = React.useState(false);
  const [qa, setQA] = React.useState({
    question: "",
    answer: ""
  })
  const [collapsed, setCollapsed] = React.useState(false)



  const handleOpen = () => setOpen(true);


  const handleClose = () => setOpen(false);


  useEffect(() => {

    let listLocal = JSON.parse(localStorage.getItem("list"))
    console.log("list", listLocal)
    // list.map((l) => {
    //   return console.log("list", l?.data?.data)
    // })

    setList(listLocal)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectionChange = (event) => {
    setValue(event.target.value);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

      >
        {value === index && (
          <Box sx={{ p: 2.5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
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

  const handleLogout = async () => {


    // let response = axios.post("http://127.0.0.1:5000",)
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.clear()
    history.replace("/")
  }

  const openModal = (e, index) => {
    console.log("e", e, "index", index)
  }


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: "auto",
    maxHeight: window.innerHeight / 2,
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    scrollbarWidth: "none"

  };




  return (
    <>


      <Stack direction="row">
        <Stack sx={{ paddingRight: 0.2 }}>

          <Box
            p={2}
            sx={{
              backgroundColor: theme.palette.common.black,
              height: "100vh",
              position: "sticky",
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
                  {/* <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="expand"
                    size="large"
                    sx={{ width: "max-content", color: "#fff" }}
                  >
                    {!collapsed ? <ArrowCircleLeftIcon />
                      : <ArrowCircleRightIcon />}
                  </IconButton> */}


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

                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <Button {...bindTrigger(popupState)}>
                        <Avatar src={faker.image.avatar()} sx={{ height: 35, width: 35, borderRadius: 35 / 2, alignSelf: "center" }} />
                      </Button>


                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}

                      >
                        {/* <Typography sx={{ p: 2, fontSize: 10 }}>Logout</Typography> */}
                        <Button variant="outlined" sx={{ fontSize: 10, p: 2 }} onClick={handleLogout}>Logout</Button>

                      </Popover>

                    </div>
                  )}
                </PopupState>

                {/* <AntSwitch defaultChecked /> */}
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* <Outlet /> */}

        {selectedButton == 2 ?
          (
            <><>
              <Conversation />
            </><Box sx={{ paddingLeft: 0.2, borderLeft: "0.5px solid darkgray" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} p={1}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Recent" {...a11yProps(0)} />
                    {/* <Tab label="Favourites" {...a11yProps(1)} /> */}
                    <Tab label="Settings" {...a11yProps(1)} />


                  </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>

                  <>
                    {/* <div className="mainBody"></div> */}

                    {/* <div
                      style={{
                        textAlign: 'center',

                      }}
                    >
                      <h3 style={{ color: 'darkgray', fontWeight: '700' }}>
                        Favourites
                      </h3>
                      <Divider sx={{ marginTop: "2%" }} />


                    </div>
                    <Box sx={{ height: "auto", width: "100%" }} p={1}>
                      {list?.data?.data &&
                        (list?.data?.data?.toReversed().map((l, index) => {
                          console.log("l", l.question, l.model, l.inputTokens, l.outputTokens)

                          return (




                            <Box sx={{ width: 280, height: "auto", marginTop: "3%" }} p={0.1}>
                              {l.favourite ? (
                                <><CardContent>
                                  <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%", }}>
                                    {l.model}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {l.question.length > 52 ? (l.question.toString().substring(0, 52) + "... ") : (l.question)}
                                  </Typography>
                                </CardContent><CardActions sx={{ marginTop: "-7.5%", justifyContent: "center", }}>
                                    <Button size="small" onClick={() => {
                                      setOpen(true);
                                      setQA({ question: l.question, answer: l.answer });

                                    }}>
                                      View</Button>
                                    <IconButton onClick={() => {
                                      l.favourite = !l.favourite;
                                    }}><BookBookmark size="20" /></IconButton>
                                  </CardActions></>) :
                                (
                                  <></>
                                )}
                            </Box>




                          )

                        }))}
                    </Box> */}





                    <div
                      style={{
                        textAlign: 'center',

                      }}
                    >
                      <h3 style={{ color: 'darkgray', fontWeight: '700' }}>
                        Recent Chats
                      </h3>


                    </div>

                    <Box sx={{ height: 460, maxHeight: 460, overflowY: "scroll", width: "100%" }} p={1}>
                      {list?.data?.data &&
                        (list?.data?.data?.toReversed().map((l, index) => {
                          console.log("l", l.question, l.model, l.inputTokens, l.outputTokens)
                          return (


                            <Card sx={{ width: 280, height: "auto", minHeight: 130, marginTop: "3%" }} p={0.1}>
                              <CardContent  >
                                <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%", }}>
                                  {l.model}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {l.question.length > 52 ? (l.question.toString().substring(0, 52) + "... ") : (l.question)}
                                </Typography>
                              </CardContent>
                              <CardActions sx={{ marginTop: "-7.5%", justifyContent: "center", }}>
                                <Button size="small" onClick={() => {
                                  setOpen(true)
                                  setQA({ question: l.question, answer: l.answer })

                                }}>
                                  View</Button>
                                <IconButton onClick={() => {
                                  l.favourite = !l.favourite
                                }}><BookBookmark size="20" /></IconButton>
                              </CardActions>
                            </Card>



                          )
                        }))}
                    </Box>


                    {/* 
                    
                      <Card sx={{ width: 280, height: 150, marginTop: "5%" }} p={0.1}>
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%" }}>
                                Finance
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                What is the meaning of stock bonds?
                              </Typography>
                            </CardContent>
                            <CardActions sx={{ marginTop: "-7%", justifyContent: "center", }}>
                              <Button size="small">View</Button>
                              <IconButton><BookBookmark size="20" /></IconButton>
                            </CardActions>
                          </Card>
                    
                    
                    
                    
                    
                    
                    
                    <Card sx={{ width: 280, height: 150, marginTop: "5%" }} p={0.1}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%" }}>
                            General
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ideas for planning new years resolutions
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ marginTop: "-7%", justifyContent: "center", }}>
                          <Button size="small">View</Button>
                          <IconButton><BookBookmark size="20" /></IconButton>
                        </CardActions>
                      </Card>

                      <Card sx={{ width: 280, height: 150, marginTop: "5%" }} p={0.1}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%" }}>
                            Healthcare
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Ideal diet for high cholesterol
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ marginTop: "-7%", justifyContent: "center", }}>
                          <Button size="small">View</Button>
                          <IconButton><BookBookmark size="20" /></IconButton>
                        </CardActions>
                      </Card> */}





                  </>

                </CustomTabPanel>


                <CustomTabPanel value={value} index={1} sx={{}}>

                  <>
                    <div className="mainBody"></div>
                    <div
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <h3 style={{ color: 'darkgray', fontWeight: '700' }}>
                        Settings
                      </h3>


                    </div>
                    <Card sx={{ width: 280, height: 150, marginTop: "3%" }} p={0.1}>
                      {/* <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%" }}>
                          Healthcare
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          What is HIV disease and its symptoms?
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ marginTop: "-7%", justifyContent: "center", }}>
                        <Button size="small">View</Button>
                        <IconButton><BookBookmark size="20" /></IconButton>
                      </CardActions>
                    </Card>
                    <Card sx={{ width: 280, height: 150, marginTop: "5%" }} p={0.1}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: "-5%" }}>
                          Finance
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          What is the meaning of stock bonds?
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ marginTop: "-7%", justifyContent: "center", }}>
                        <Button size="small">View</Button>
                        <IconButton><BookBookmark size="20" /></IconButton>
                      </CardActions> */}
                    </Card>


                  </>





                </CustomTabPanel>



              </Box></>) : (
            <>
              <Dashboard />
            </>
          )
        }

      </Stack >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {qa.question}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {qa.answer}
          </Typography>
        </Box>
      </Modal>
    </>

  );
};

export default DashboardLayout
