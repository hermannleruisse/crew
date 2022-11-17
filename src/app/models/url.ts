export class Url {
    static SERVER_URL = 'http://localhost:2509/';
    // static SERVER_URL = 'https://springboot-crew-api.herokuapp.com/';
    static LOGIN_URL = Url.SERVER_URL+'login';
    //profile
    static PROFILE_LIST_URL = Url.SERVER_URL+'api/security/profiles';
    static PROFILE_ADD_URL = Url.SERVER_URL+'api/security/save-profile';
    static PROFILE_EDIT_URL = Url.SERVER_URL+'api/security/edit-profile';
    static PROFILE_DELETE_URL = Url.SERVER_URL+'api/security/delete-profile';
    static PROFILE_GET_URL = Url.SERVER_URL+'api/security/profile';
    //user
    static USER_LIST_URL = Url.SERVER_URL+'api/security/users';
    static USER_ADD_URL = Url.SERVER_URL+'api/security/save-user';
    static USER_EDIT_URL = Url.SERVER_URL+'api/security/edit-user';
    static USER_DELETE_URL = Url.SERVER_URL+'api/security/delete-user';
    static USER_GET_URL = Url.SERVER_URL+'api/security/user';
    //ministére
    static MINIS_LIST_URL = Url.SERVER_URL+'api/manager/ministers';
    static MINIS_ADD_URL = Url.SERVER_URL+'api/manager/save-minister';
    static MINIS_EDIT_URL = Url.SERVER_URL+'api/manager/edit-minister';
    static MINIS_DELETE_URL = Url.SERVER_URL+'api/manager/delete-minister';
    static MINIS_GET_URL = Url.SERVER_URL+'api/manager/minister';
    //membre
    static MEMBR_LIST_URL = Url.SERVER_URL+'api/manager/members';
    static MEMBR_ADD_URL = Url.SERVER_URL+'api/manager/save-member';
    static MEMBR_EDIT_URL = Url.SERVER_URL+'api/manager/edit-member';
    static MEMBR_DELETE_URL = Url.SERVER_URL+'api/manager/delete-member';
    static MEMBR_GET_URL = Url.SERVER_URL+'api/manager/member';
    //habilitation
    static HABILIT_LIST_URL = Url.SERVER_URL+'api/security/liste-habilitation';
    static HABILIT_ADD_URL = Url.SERVER_URL+'api/security/save-habilitation';
    static HABILIT_CHECK_URL = Url.SERVER_URL+'api/security/verifier-habilitation';
    
}