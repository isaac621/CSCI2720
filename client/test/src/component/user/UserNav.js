import { Box, Button, Divider, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import Style from "../../static/style";

export default function UserNav(){
    const navigate = useNavigate();
    const logoutOnClickHandler = ()=>{
      localStorage.removeItem('jwt')
      navigate('/login/user', {replace: true})
  
      


    }
    return (
      <Box sx={Style.nav} > 

        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        >
              
                <Button onClick={()=>navigate('/user/locations')} variant="text">
                    All Locations
                </Button>
        

                <Button onClick={()=>navigate('/user/search')} variant="text">
                    Search
                </Button>

                <Button onClick={()=>navigate('/user/favorite')} variant="text">
                    Favourite
                </Button>
      
                <Button  variant="contained" onClick={logoutOnClickHandler}>
                    Logout
                </Button>
        </Stack>
      </Box>
    );
  }
  