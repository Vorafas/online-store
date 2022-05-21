import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import { Modal, Form, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { fetchTypes, fetchBrands, createDevice } from '../../http/device-api';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const selectFile = (evt) => {
        setFile(evt.target.files[0]);
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.number === number ? { ...item, [key]: value } : item));
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('image', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                        placeholder="Введите название устройства" />
                    <Form.Control
                        type="number"
                        className="mt-3"
                        value={price}
                        onChange={evt => setPrice(Number(evt.target.value))}
                        placeholder="Введите стоимость устройства" />
                    <Form.Control
                        type="file"
                        onChange={selectFile}
                        className="mt-3" />
                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}>
                        Добавить новое свойство
                    </Button>
                    {info.map(item =>
                        <Row className="mt-4" key={item.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={item.title}
                                    onChange={evt => changeInfo('title', evt.target.value, item.number)}
                                    placeholder="Введите название свойства" />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={item.description}
                                    onChange={evt => changeInfo('description', evt.target.value, item.number)}
                                    placeholder="Введите описание свойства" />
                            </Col>
                            <Button
                                className="w-auto"
                                variant="outline-danger"
                                onClick={() => removeInfo(item.number)}>
                                удалить
                            </Button>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;