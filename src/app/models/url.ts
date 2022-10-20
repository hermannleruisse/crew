export class Url {
    static SERVER_URL = 'http://localhost:8080/';
    static LOGIN_URL = Url.SERVER_URL+'login';
    static PROFILE_LIST_URL = Url.SERVER_URL+'api/security/profiles';
    static PROFILE_ADD_URL = Url.SERVER_URL+'api/security/save-profile';
    static PROFILE_EDIT_URL = Url.SERVER_URL+'api/security/edit-profile';
    static PROFILE_DELETE_URL = Url.SERVER_URL+'api/security/delete-profile';
    static PROFILE_GET_URL = Url.SERVER_URL+'api/security/profile';
}