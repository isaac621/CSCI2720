import { Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import serverURL from "../../constant";

export default function UserTable(){

    const jwt = localStorage.getItem('jwt')
    const [data, setData] = useState([])
    const [field, setField] = useState('')
    const [inputText, setInputText] = useState('')
    const navigate = useNavigate()

    const fetchData = async()=>{
      const res = await fetch(`${serverURL}/users/locations`, {
        headers:{
            'Authorization': `Bearer ${jwt}`
        }
      })
      .then(res => res.json())

      setData(res)
    }

    useEffect(()=>{
        fetchData()
    }, [])
  

    function TempCsort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.temp_c < sortedData[min].weather.temp_c) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        setData(sortedData)
        setField("temp_c")
    }

    function WindKphsort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.wind_kph < sortedData[min].weather.wind_kph) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
       
        setData(sortedData)
        setField("wind_kph")
    }

    function WindDirsort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.wind_dir < sortedData[min].weather.wind_dir) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        setData(sortedData)
        setField("wind_dir")
    }


    function Humiditysort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.humidity < sortedData[min].weather.humidity) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        setData(sortedData)
        setField("humidity")
    }

    function PrecipMmsort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.precip_mm < sortedData[min].weather.precip_mm) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        setData(sortedData)
        setField("precip_mm")
    }

    function VisKmsort() {
      const sortedData = data;
        for(let i = 0; i < sortedData.length; i++) {
            let min = i;
            for(let j = i+1; j < sortedData.length; j++){
                if(sortedData[j].weather.vis_km < sortedData[min].weather.vis_km) {
                    min=j; 
                }
             }
             if (min !== i) {
                 let tmp = sortedData[i]; 
                 (sortedData[i]) = sortedData[min];
                 (sortedData[min]) = tmp;
            }
        }
        setData(sortedData)
        setField("vis_km")
    }

    const inputHandler = async(e)=>{
        setInputText(e.target.value)
        const res = await fetch(`${serverURL}/users/location/search/${e.target.value}`, {
        headers:{
            'Authorization': `Bearer ${jwt}`
        }
      })
      .then(res => res.json())

      setData(res) 
    }

    function searchField(inputText) {
     
      let result = [];

      if (field === "temp_c") {
        result = checkTempCInput();
      }

      if (field === "wind_kph") {
        result = checkWindKphInput();
      }

      if (field === "wind_dir") {
        result = checkWindDirInput();
      }

      if (field === "humidity") {
        result = checkHumidityInput();
      }

      if (field === "precip_mm") {
        result = checkPrecipMmInput();
      }

      if (field === "vis_km") {
        result = checkVisKmInput();
      }
      
      function checkTempCInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.temp_c.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkWindKphInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.wind_kph.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      
      function checkWindDirInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.wind_dir.toString().includes(inputText);
            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }
      
      
      function checkHumidityInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.humidity.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkPrecipMmInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.precip_mm.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      function checkVisKmInput() {
        let searchresult = [];
        for (let i = 0; i < data.length; i++) {
          if(inputText !== "") {
            let boolCheck = data[i].weather.vis_km.toString().includes(inputText);

            if (boolCheck === true) {
              searchresult.push(data[i].info.name);
            }
          }
        }
        return searchresult;
      }

      if (result !== []) {
        return (
          <div>
          <table className="table table-sm">
            {result.map(size => (
                          <tr><td>{size}</td></tr>
                        ))}
          </table>
          </div>
        )
      }
      
    }

    return (
        <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box>
                
                    <div>
                            <Typography variant="body1" color="initial" display='inline'>Sort By   </Typography>
                            <Button variant='contained' onClick={() => TempCsort()} scope="row"> temp_c</Button>
                            <Button variant='contained' onClick={() => WindKphsort()} scope="row"> wind_kph</Button>
                            <Button variant='contained' onClick={() => WindDirsort()} scope="row"> wind_dir</Button> 
                            <Button variant='contained' onClick={() => Humiditysort()} scope="row"> humidity</Button>
                            <Button variant='contained' onClick={() => PrecipMmsort()} scope="row"> precip_mm</Button>
                            <Button variant='contained' onClick={() => VisKmsort()} scope="row"> vis_km</Button>
                    </div>
                    <TableContainer sx={{overFlowY: "scroll", height: 370}} component={Paper}>
                    <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow sx={{bgcolor: 'primary.main'}}>
                            <TableCell>Location</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((location, i) => (
                            <TableRow
                            hover
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" onClick={()=>{navigate(`/user/location/${location.locationID}`)}} sx={{cursor: 'pointer'}} >
                                    
                                    {location.locationID}: {location.info.name}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
    <TextField 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            
          }}
          onChange={(e) => inputHandler(e)}
          label="Location Name"
          sx={{mt: 2}}
        />
        </Box>
    );
    
}