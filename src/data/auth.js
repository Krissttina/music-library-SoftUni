import { clearUserData, setUserData } from '../util.js';
import { get, post, put, del } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: "/users/logout",
}

//TODO change user object according to project requirements
export async function login(email, password){
    const result = await post(endpoints.login, {email, password});
    setUserData(result);
}

export async function register(email, password){
    const result = await post(endpoints.register, {email, password});
    setUserData(result);
}

export async function logout(){
    get(endpoints.logout);
    clearUserData();
}

export async function getById(){
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(album){
    return post('/data/albums', album);
}

export async function getAlbumById(id){
    return get(`/data/albums/${id}`);
}

export async function editAlbumById(id, album){
    return put(`/data/albums/${id}`, album);
}

export async function deleteAlbumById(id){
    return del(`/data/albums/${id}`);
}

//bonus
export async function addLike(productId){
    return post("/data/likes", productId);
}

export async function totalLikes(albumId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,);
}

export async function likesForUser(albumId, userId){
    return get( `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}