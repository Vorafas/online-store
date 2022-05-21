import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import start from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card style={{ width: 150, cursor: 'pointer' }} border="light">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.image} />
                <div className="mt-1 d-flex justify-content-between align-items-center">
                    <div className="text-black-50">Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={start} width={18} height={18} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;