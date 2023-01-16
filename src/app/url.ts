import { environment } from "src/environments/environment";

export class Url {
    static SERVER_URL = environment.baseUrl;
    // static SERVER_URL = 'https://springboot-crew-api.herokuapp.com/';
    static LOGIN_URL = Url.SERVER_URL+'login';
    static FILE_URL = Url.SERVER_URL+'api/manager/view';
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
    static MEMBR_LIST_PAGINATE_URL = Url.SERVER_URL+'api/manager/members-list';
    static MEMBR_SEARCH_LIST_PAGINATE_URL = Url.SERVER_URL+'api/manager/search-members-list';
    static MEMBR_SEARCH_MULTI_LIST_PAGINATE_URL = Url.SERVER_URL+'api/manager/search-multi';
    static MEMBR_ADD_URL = Url.SERVER_URL+'api/manager/save-member';
    static MEMBR_EDIT_URL = Url.SERVER_URL+'api/manager/edit-member';
    static MEMBR_DELETE_URL = Url.SERVER_URL+'api/manager/delete-member';
    static MEMBR_GET_URL = Url.SERVER_URL+'api/manager/member';
    static MEMBR_PRINT_URL = Url.SERVER_URL+'api/manager/report-liste-membre';
    static MEMBR_DOWNLOAD_URL = Url.SERVER_URL+'api/manager/viewPdf';
    //habilitation
    static HABILIT_LIST_URL = Url.SERVER_URL+'api/security/liste-habilitation';
    static HABILIT_ADD_URL = Url.SERVER_URL+'api/security/save-habilitation';
    static HABILIT_CHECK_URL = Url.SERVER_URL+'api/security/verifier-habilitation';
    
}