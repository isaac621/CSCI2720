import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Input, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { HeartFilled, UnorderedListOutlined, PlusCircleFilled, GooglePlusOutlined } from '@ant-design/icons';

import Map from './Map';

function Location() {
    let { locationID } = useParams()
    let navigate = useNavigate()
    const { TextArea } = Input;
    console.log(locationID)

    const [marker, setMarker] = useState({ lat: 0, lng: 0 })
    const [fetchedData, setFetchedData] = useState([])
    const [fetchedList, setFetchedList] = useState([])
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    const zoomLevel = 10

    // fetch details of location 
    const fetchLocation = async () => {

        setLoading(true);
        const res = await fetch(`http://localhost:3000/users/location/get/${locationID}`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
            }
        })
        setLoading(false);

        if (res.ok) {
            res.json().then(res => {
                console.log("test", res)
                console.log("test", res.info.latitude)
                setFetchedData(res)
                setMarker({ lat: parseFloat(res.info.latitude), lng: parseFloat(res.info.longitude) })
            })
        }
    }

    // fetch user comment data
    const fetchUserList = async () => {

        setLoading(true);
        const res = await fetch(`http://localhost:3000/users/favorite`, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
            }
        })
        setLoading(false);

        if (res.ok) {
            res.json().then(res => {
                console.log("list", res)
                setFetchedList(res)
            })
        }
    }

    // add location to favorite list
    const addFavourite = async () => {
        let flag = false;

        // check whether or not the location already existed in favorite list
        _.forEach(fetchedList, (i) => {
            console.log("i>>", i)
            if (i?.locationID === _.toInteger(locationID)) {
                flag = true;
            }
        })

        // console.log(flag)

        if (flag) {
            notification.error({ message: 'Location CANNOT be added', description: 'Locations already existed in favourite list!' });
        } else {
            notification.success({ message: 'Location is added SUCCESSFULLY' });
            setLoading(true);
            const res = await fetch(`http://localhost:3000/users/favorite/create/${locationID}`, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`
                },

                method: "POST"
            })
            setLoading(false);

            if (res.ok) {
                console.log("result", res)
            }
        }
    }

    // add comment to database
    const createComments = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/users/comment`, {
            method: "POST",

            body: JSON.stringify({
                locID: _.toInteger(locationID),
                content: comment
            }),

            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWJjYWM1NGZhZWZlMTc1MGM4NzYxMSIsImlhdCI6MTY1MjI1OTA4MH0.R96Q1GnTSu7FRBOOwwu9u_w8DErxZthBetNmwRsYTI8`,
                'Content-Type': 'application/json'
            },
        })
        setLoading(false);

        if (res.ok) {
            console.log("result", res)
        }

        // refresh page
        window.location.reload(false)
    }

    useEffect(() => {
        fetchLocation()
        fetchUserList()
    }, [])

    console.log("data", fetchedData)
    console.log("marker", marker)

    if (loading) {
        return null
    }

    return (
        <div style={{ marginLeft: 30, marginRight: 30 }}>
            <h1>Location Details</h1>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Map center={marker}
                            zoomLevel={zoomLevel}
                    />
                </Col>
                <Col span={12}>
                    <div>
                        Location ID: {fetchedData?.locationID}
                    </div>
                    <div>
                        Location Name: {fetchedData?.info?.name}
                    </div>
                    <div>
                        Location Latitude: {fetchedData?.info?.latitude}
                    </div>
                    <div>
                        Location Longitude: {fetchedData?.info?.longitude}
                    </div>
                    <div>
                        humidity: {fetchedData?.weather?.humidity}
                    </div>
                    <div>
                        precip_mm: {fetchedData?.weather?.precip_mm}
                    </div>
                    <div>
                        temp_c: {fetchedData?.weather?.temp_c}
                    </div>
                    <div>
                        vis_km: {fetchedData?.weather?.vis_km}
                    </div>
                    <div>
                        wind_kph: {fetchedData?.weather?.wind_kph}
                    </div>
                    <br />
                    <div>
                        <Button type="primary"
                            icon={<HeartFilled />}
                            size={'small'}
                            onClick={
                                () => {
                                    addFavourite()
                                }}>
                            {' '}Add Location to Favourite
                        </Button>
                    </div>
                    <br />
                    <div>
                        <Button type="primary"
                            icon={<UnorderedListOutlined />}
                            size={'small'}
                            onClick={
                                () => {
                                    navigate(`/location/favourite`)
                                }}>
                            {' '}Checkout Favourite List
                        </Button>
                    </div>
                    <br />
                    <div>
                        <Button type="primary"
                            icon={<GooglePlusOutlined />}
                            size={'small'}
                            onClick={
                                () => {
                                    navigate(`/map`)
                                }}>
                            {' '}Back to Map
                        </Button>
                    </div>
                    <br />
                </Col>
                <Col span={12}>
                    <h3>
                        User Comments:
                    </h3>
                    {
                        (fetchedData?.comments)?.map((comments) => {
                            // console.log(comments)
                            return (
                                <>
                                    <div>
                                        Username: {comments.username}
                                    </div>
                                    <div>
                                        Comment Content: {comments.content}
                                    </div>
                                    <div>
                                        Comment Last Update Time: {comments.updatedAt}
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }
                    <h3>
                        Add your comments below:
                    </h3>
                    <TextArea
                        showCount maxLength={250}
                        rows={4}
                        placeholder={'Comments'}
                        onChange={
                            (e) => {
                                setComment(e.target.value)
                            }}
                    />
                    <br />
                    <br />
                    <div>
                        <Button type="primary"
                            icon={<PlusCircleFilled />}
                            onClick={
                                () => {
                                    createComments()
                                }}>
                            {' '}Add
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Location