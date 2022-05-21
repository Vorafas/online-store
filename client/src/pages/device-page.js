import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/big-star.png';
import {fetchOneDevice} from '../http/device-api';

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, []);

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.image} width={300} height={300} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="w-auto">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}>
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                        <h3>От: {device.price} руб.</h3>
                        <Button variant="outline-dark">Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row
                        key={info.id}
                        style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;