
import React, { useState, useEffect } from 'react'
import { Col, Row, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
import { List, ListItem, ListItemButton, ListItemIcon, Skeleton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import serverURL from '../../constant';

function FavouriteList() {
    let navigate = useNavigate()

    const [fetchedData, setFetchedData] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchFavourite = async () => {
        const jwt = localStorage.getItem('jwt')
        setLoading(true);
        const res = await fetch(`${serverURL}/users/favorite`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        setLoading(false);

        if (res.ok) {
            res.json().then(res => {
                console.log("test", res)
                setFetchedData(res)
            })
        }
    }

    useEffect(() => {
        fetchFavourite()
    }, [])

    console.log("data", fetchedData)

    if (loading) {
        return <Skeleton>{console.log("cannot load")}</Skeleton>
    }

    return (
        <div style={{marginLeft: 30, marginRight: 30, textAlign: 'center'}}>
            <Typography variant="h4" color="initial">

                Favourite Locations List <FavoriteIcon/>
            </Typography>
            
            
            <List sx={{bgcolor: 'background.paper', height: '500px', overflowY: 'scroll'}}>
                {
                    fetchedData?.map((fetchedData, key) => {
                        console.log(fetchedData?.info?.name)
                        return (
                            <ListItem>
                                <ListItemButton onClick={
                                                () =>{
                                                    navigate(`/user/location/${fetchedData?.locationID}`)
                                                }}>
                                    <ListItemIcon>
                                        <SearchOutlined />
                                    </ListItemIcon>
                                    <Typography variant="h6" color="initial">Location {key + 1}: {fetchedData?.info?.name}</Typography>
                                     
                                    
                                            
                                    <Typography variant="caption" color="initial">{' >> '}See Details</Typography> 
                                  
                                </ListItemButton>
                               
                            </ListItem>
                        )
                    })
                }
            </List>

        </div>
    )
}

export default FavouriteList