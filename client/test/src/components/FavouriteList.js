import {
    Box,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Col, Row, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';

function FavouriteList() {
    let navigate = useNavigate()

    const [fetchedData, setFetchedData] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchFavourite = async () => {

        setLoading(true);
        const res = await fetch(`http://localhost:3000/users/favorite`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
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
        return <SkeletonText>{console.log("cannot load")}</SkeletonText>
    }

    return (
        <div style={{marginLeft: 30, marginRight: 30}}>
            <h1>
                Favourite Locations List
            </h1>
            <div>
                {
                    fetchedData?.map((fetchedData, key) => {
                        console.log(fetchedData?.info?.name)
                        return (
                            <>
                                <div>
                                    Location {key + 1}: {fetchedData?.info?.name} {' '}
                                    <Button type="primary"
                                            icon={ <SearchOutlined /> }
                                            size={'small'}
                                            onClick={
                                                () =>{
                                                    navigate(`/location/${fetchedData?.locationID}`)
                                                }}>
                                        See Details
                                    </Button>
                                </div>
                                <br/>
                            </>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default FavouriteList