import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Row, Card } from 'react-bootstrap';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <Row className="d-flex w-100">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className="p-3 w-auto"
                    style={{ cursor: 'pointer' }}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}>
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;