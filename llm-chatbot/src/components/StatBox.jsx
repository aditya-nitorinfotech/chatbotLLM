import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';


const StatBox = ({ title, subtitle, icon, progress, increase, subtitle2,decrease }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 25px" flexDirection={"column"} >
      <Box display="flex" flexDirection={"row"} justifyContent="space-evenly">
       
        
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[700] }}
          >
            {title}
        
          </Typography>
          <AddCircleIcon size={20} sx={{color: 'rgba(74, 37, 225, 1)', marginLeft:"5%",marginTop:"1.5%" }} />
         
       
        <Box>
        {icon}
          {/* <ProgressCircle progress={progress} /> */}
        </Box>
        {increase?(
        <><MovingIcon size={20} sx={{ marginLeft: "22%", color: colors.greenAccent[600] }} /><Typography
            variant="h6"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[600], marginLeft: "1%" }}
          >
            {increase}
          </Typography></>):(
        <><Typography
              variant="h6"
              fontStyle="italic"
              sx={{ color: colors.redAccent[600], marginLeft: "30%" }}
            >
              {decrease}
            </Typography><TrendingDownIcon size={20} sx={{ marginLeft: "1.5%", color: colors.redAccent[600] }} /></>)}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: "black"}}>
          {subtitle}
        </Typography>   
     
      <Typography variant="h6" sx={{ color: colors.grey[800]}} >
          {subtitle2}
        </Typography>
       
      </Box>
    </Box>
  );
};

export default StatBox;
