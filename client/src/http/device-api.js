import { $authHost, $host } from './index';

const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

const createBrand = async (type) => {
    const { data } = await $authHost.post('api/brand', type);
    return data;
};

const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data;
};

const createDevice = async (type) => {
    const { data } = await $authHost.post('api/device', type);
    return data;
};

const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    console.log(typeId, brandId, page, limit);
    const { data } = await $host.get('api/device', {
        params: { typeId, brandId, page, limit }
    });
    return data;
};

const fetchOneDevice = async (id) => {
    const { data } = await $host.get(`api/device/${id}`);
    return data;
};

export {
    createType,
    fetchTypes,
    createBrand,
    fetchBrands,
    createDevice,
    fetchDevices,
    fetchOneDevice
}