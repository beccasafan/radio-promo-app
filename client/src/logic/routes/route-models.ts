import { History } from "history";

export interface UrlParams {
    country?: string;
    format?: string;
    parentGroup?: string;
    location?: string;
    name?: string;
    talent?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
    text?: string;
    phone?: string;
    whatsapp?: string;
    artist?: string;
    song?: string;
    page?: string;
    pageSize?: string;
    station?: string;
    section?: string;
}

export interface RouteInfo extends UrlParams {
    history?: History;
}
export interface RouteData {
    country?: string;
    format?: string;
    parentGroup?: string;
    location?: string;
    name?: string;
    talent?: string;
    twitter?: boolean;
    instagram?: boolean;
    facebook?: boolean;
    email?: boolean;
    text?: boolean;
    phone?: boolean;
    whatsapp?: boolean;
    artist?: string;
    song?: string;
    page?: number;
    pageSize?: number;
    station?: string;
    section?: string;
    history?: History; 
}
