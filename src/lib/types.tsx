export type Region = {
    id: number;
    name: string;
};

export type City = {
    id: number;
    name: string;
    region_id: number;
};

export type Inputs = {
    is_rental: number;
    address: string;
    zip_code: string;
    region_id: number;
    city_id: number;
    price: number;
    area: number;
    bedrooms: number;
    description: string;
    image: string;
    agent_id?: number;
}

export type Agents = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatar: string;
}