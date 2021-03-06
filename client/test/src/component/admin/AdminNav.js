// Lin Hechen		1155125125
// Lui Ming Hong		1155126306
// Lau Justin		1155126756
// CHEN ChengYi	1155126781
// Wong Tsz Lok		1155133187
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import Style from "../../static/style";

export default function AdminNav(){
    const navigate = useNavigate();
    const logoutOnClickHandler = ()=>{
      localStorage.removeItem('jwt')
      navigate('/login/admin', {replace: true})
  
      


    }
    return (
      <Box sx={Style.nav} > 

        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        >
              
                    <Button onClick={()=>navigate('/admins/users/read')} variant="text">
                        User
                    </Button>
          
    
                    <Button onClick={()=>navigate('/admins/location/read')} variant="text">
                        Location
                    </Button>
      
                <Button  variant="contained" onClick={logoutOnClickHandler}>
                    Logout
                </Button>
        </Stack>
      </Box>
    );
  }
  