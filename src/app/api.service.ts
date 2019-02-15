import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    // API path
    baseUrl: string = "";
    apiuser: string = "";
    apipassword: string = "";
    userId: any;
    activelist: any = [];
    oldlist: any = [];
    companylist: any = [];
    assessorlist: any = [];
    logochange = new Subject<any>();

    constructor(private http: Http) {
        if (localStorage.getItem('user_id')) {
            this.userId = localStorage.getItem('user_id');
        }
    }


    isAuth() {
        return this.userId != null;
    }

    register(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let register_data = 'Firstname=' + data.first_name + "&Lastname=" + data.last_name + "&email=" + data.email + "&mobile_number=" + data.mobile + "&password=" + data.password;
        console.log("register_data :" + JSON.stringify(register_data));

        return this.http.post(this.baseUrl + "registerUser", register_data, options)
            .map((res: Response) => res.json());
    }

    confirm_register(user_id: any, confirmation_code: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let confirm_register_data = 'user_id=' + user_id + '&confirmation_code=' + confirmation_code;
        console.log("confirm_register_data :" + JSON.stringify(confirm_register_data));
        return this.http.post(this.baseUrl + "confirm_registration", confirm_register_data, options)
            .map((res: Response) => res.json());
    }


    UpdatePassword(code: any, newpassword: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let assessorUpdatePassword_data = 'code=' + code + '&newpassword=' + newpassword;

        return this.http.post(this.baseUrl + "UpdatePassword", assessorUpdatePassword_data, options)
            .map((res: Response) => res.json());
    }

    verifyUser(mobile_number: string, password: string) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let login_data = 'mobile_number=' + mobile_number + '&password=' + password;

        return this.http.post(this.baseUrl + "verifyUser", login_data, options)
            .map((res: Response) => { this.userId = res.json().result.user_id; return res.json(); });
    }

    user_details(user_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + "user_details/" + user_id, options)
            .map((res: Response) => res.json());
    }

    update_location_assessor(user_id:any,currentlat:any,currentlng){
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let process_data = 'current_lat=' + currentlat + '&current_lng=' + currentlng+'&user_id='+user_id;
        return this.http.post(this.baseUrl + "update_location_assessor", process_data, options)
            .map((res: Response) => { return res.json(); });
    }

    createClaim(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/json', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let createClaim_data = data;

        console.log("createClaim_data :" + JSON.stringify(createClaim_data));

        return this.http.post(this.baseUrl + "createClaim", createClaim_data, options)
            .map((res: Response) => res.json());
    }

    list_vehicle_parts(){
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + "list_vehicle_parts", options)
            .map((res: Response) => res.json());
    }

    get_claim_list(user_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let get_claim_list_data = 'user_id=' + user_id;

        console.log("get_claim_list_data :" + JSON.stringify(get_claim_list_data));

        return this.http.get(this.baseUrl + "get_claim_list/" + user_id, options)
            .map((res: Response) => res.json());
    }

    get_claim_info(claim_unique_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let get_claim_info_data = 'claim_unique_id=' + claim_unique_id;
        console.log("get_claim_info_data :" + JSON.stringify(get_claim_info_data));
        return this.http.get(this.baseUrl + "get_claim_info/" + claim_unique_id, options)
            .map((res: Response) => { console.log(res.json()); return res.json(); });
    }

    delete_claim(claim_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let delete_claim_data = 'claim_id=' + claim_id;
        console.log("delete_claim_data :" + JSON.stringify(delete_claim_data) + " url :" + this.baseUrl + "delete_claim/" + claim_id);
        return this.http.post(this.baseUrl + "delete_claim", delete_claim_data, options)
            .map((res: Response) => res.json());
    }

    add_thirdparty_toclaim(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let add_thirdparty_toclaim_data = 'claim_id=' + data.claim_id +
            "&name=" + data.name +
            "&license_plate_number=" + data.license_plate_number +
            "&address=" + data.address +
            "&cellphone=" + data.cellphone +
            "&insurance_company_name=" + data.insurance_company_name +
            "&car_manufacturer=" + data.car_manufacturer +
            "&car_model=" + data.car_model +
            "&car_year=" + data.car_year;

        console.log("add_thirdparty_toclaim_data :" + JSON.stringify(add_thirdparty_toclaim_data));

        return this.http.post(this.baseUrl + "add_thirdparty_toclaim", add_thirdparty_toclaim_data, options)
            .map((res: Response) => res.json());
    }

    add_injured_toclaim(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let add_injured_toclaim_data = 'claim_id=' + data.claim_id +
            "&name=" + data.name +
            "&address=" + data.address +
            "&phone_number=" + data.phone_number;

        console.log("add_injured_toclaim_data :" + JSON.stringify(add_injured_toclaim_data));

        return this.http.post(this.baseUrl + "add_injured_toclaim", add_injured_toclaim_data, options)
            .map((res: Response) => res.json());
    }

    get_nearer_assessor(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let get_nearer_assessor_data = 'currentlat=' + data.currentlat + "&currentlng=" + data.currentlng+'&schedulenow='+data.schedulenow;
        return this.http.post(this.baseUrl + "get_nearer_assessors", get_nearer_assessor_data, options)
            .map((res: Response) => res.json());
    }

    get_assessor_info(assessor_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let get_assessor_info_data = 'assessor_id=' + assessor_id;
        return this.http.get(this.baseUrl + "get_assessor_info/" + assessor_id, options)
            .map((res: Response) => res.json());
    }

    update_assessor_complete_profile(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_profile_data = 'user_id=' + data.user_id + '&Firstname=' + data.Firstname + "&Lastname=" + data.Lastname + '&city=' + data.city + '&Business_id_number=' + data.Business_id_number + '&License_number=' + data.License_number + '&latitude=' + data.latitude + '&longitude=' + data.longitude + '&Ins_coy_id=' + data.Ins_coy_id;

        console.log("update_profile_data :" + JSON.stringify(update_profile_data));
        return this.http.post(this.baseUrl + "update_assessor_complete_details", update_profile_data, options)
            .map((res: Response) => res.json());
    }


    update_assessor_profile(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_profile_data = 'user_id=' + data.user_id + '&Firstname=' + data.Firstname + "&Lastname=" + data.Lastname + '&city=' + data.city + '&Business_id_number=' + data.Business_id_number + '&License_number=' + data.License_number + '&latitude=' + data.latitude + '&longitude=' + data.longitude+'&radius='+data.radius+'&card_holdername='+data.card_holdername+'&card_number='+data.card_number+'&card_cvv='+data.card_cvv+'&card_exp_month='+data.card_exp_month+'&card_exp_year='+data.card_exp_year;

        return this.http.post(this.baseUrl + "update_assessor_profile", update_profile_data, options)
            .map((res: Response) => res.json());
    }


    get_garage_info(garage_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let get_garage_info_data = 'garage_id=' + garage_id;
        console.log("get_garage_info_data :" + JSON.stringify(get_garage_info_data));
        return this.http.get(this.baseUrl + "get_garage_info/" + garage_id, options)
            .map((res: Response) => res.json());
    }

    send_request_to_assessor(claim_unq_id: any, assessor_id: any, scheduledatetime: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let senddata = 'claim_unq_id=' + claim_unq_id + "&assessor_id=" + assessor_id + '&scheduledatetime=' + scheduledatetime;

        console.log("send_request_to_assessor :" + JSON.stringify(senddata));

        return this.http.post(this.baseUrl + "send_details_to_assessor", senddata, options)
            .map((res: Response) => res.json());
    }

    send_request_to_all_assessor(claim_unq_id: any, assessorIds: any, scheduledatetime: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let inputdata = 'claim_unq_id=' + claim_unq_id + '&assessorIds=' + assessorIds + '&scheduledatetime=' + scheduledatetime;
        return this.http.post(this.baseUrl + "send_details_to_allassessor", inputdata, options)
            .map((res: Response) => res.json());
    }


    get_insurance_company_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_company_list", options)
            .map((res: Response) => res.json());
    }

    get_agent_list(Ins_coy_id:number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_agent_list/"+Ins_coy_id, options)
            .map((res: Response) => res.json());
    }

    //new claim request
    get_claim_request_list(assessor_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "claim_request_list/"+assessor_id, options)
            .map((res: Response) => res.json());
    }

    get_old_claim_request_list(assessor_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "old_claim_request_list/" + assessor_id, options)
            .map((res: Response) => res.json());
    }

    register_assessor(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        //let register_data = 'Firstname=' + data.Firstname + '&Lastname=' + data.Lastname + '&Ins_coy_id=' + data.Ins_coy_id + '&email=' + data.email + '&cell_phone_number=' + data.cell_phone_number + '&password=' + data.password + '&city=' + data.city + '&latitude=' + data.latitude + '&longitude=' + data.longitude + '&License_number=' + data.License_number;
        let register_data = 'Firstname=' + data.Firstname + '&Lastname=' + data.Lastname + '&email=' + data.email + '&cell_phone_number=' + data.cell_phone_number + '&password=' + data.password + '&city=' + data.city + '&latitude=' + data.latitude + '&longitude=' + data.longitude + '&License_number=' + data.License_number+'&Business_id_number='+data.Business_id_number+'&payment_method='+data.payment_method+'&Seniority='+data.Seniority+'&card_holdername='+data.card_holdername+'&card_number='+data.card_number+'&card_cvv='+data.card_cvv+'&card_exp_month='+data.card_exp_month+'&card_exp_year='+data.card_exp_year+'&office_phone_number='+data.office_phone_number+'&fax_phone_number='+data.fax_phone_number+'&image='+data.image;
        console.log('final input'+JSON.stringify(register_data));
        return this.http.post(this.baseUrl + "register_assessor", register_data, options)
            .map((res: Response) => res.json());
    }

    register_assessor_completeinfo(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("register_assessor :" + JSON.stringify(data));
        let register_data = 'Firstname=' + data.Firstname + '&Lastname=' + data.Lastname + '&Ins_coy_id=' + data.Ins_coy_id + '&email=' + data.email + '&cell_phone_number=' + data.cell_phone_number + '&password=' + data.password + '&address=' + data.address + '&city=' + data.city + '&state=' + data.state + '&zipcode=' + data.zipcode + '&country=' + data.country + '&latitude=' + data.latitude + '&longitude=' + data.longitude + '&License_number=' + data.License_number + '&Business_id_number=' + data.Business_id_number;
        return this.http.post(this.baseUrl + "register_assessor", register_data, options)
            .map((res: Response) => res.json());
    }

    accept_claim_request(claim_unq_id: any, status: any, assessor_id: any, scheduledatetime: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_data = 'scheduledatetime=' + scheduledatetime + '&claim_unq_id=' + claim_unq_id + '&status=' + status + '&assessor_id=' + assessor_id;
        console.log("update_claim_status :" + JSON.stringify(update_data));
        return this.http.post(this.baseUrl + "accept_claim_request", update_data, options)
            .map((res: Response) => res.json());
    }


    update_assessment_report(fileurl: any, form_data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        let update_data = 'fileurl=' + fileurl + '&claim_unq_id=' + form_data.claim_unq_id + '&assessor_id=' + form_data.assessor_id + '&assessor_charge=' + form_data.assessor_charge+'&spareparts_amount='+form_data.spareparts_amount;
        return this.http.post(this.baseUrl + "update_assessment_report", update_data, options).map((res: Response) => res.json());
    }

    cancel_claim_request(claim_unq_id: any, assessor_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_data = 'claim_unq_id=' + claim_unq_id + '&assessor_id=' + assessor_id;
        console.log("cancel_claim_request :" + JSON.stringify(update_data));
        return this.http.post(this.baseUrl + "cancel_claim_request", update_data, options)
            .map((res: Response) => res.json());
    }

    register_garage(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("register_garage :" + JSON.stringify(data));
        let register_data = 'Name=' + data.Name + '&Contact_name=' + data.contact_name + '&business_id_number=' + data.business_id_number + '&email=' + data.email + '&cell_phone_number=' + data.cell_phone_number + '&password=' + data.password + '&city=' + data.city + '&authorized_importer=' +parseInt(data.authorized_importer) + '&latitude=' + data.latitude + '&longitude=' + data.longitude + '&License_number=' + data.License_number+'&payment_method='+parseInt(data.payment_method)+'&card_holdername='+data.card_holdername+'&card_number='+data.card_number+'&card_cvv='+data.card_cvv+'&card_exp_month='+data.card_exp_month+'&card_exp_year='+data.card_exp_year+'&office_phone_number='+data.office_phone_number+'&fax_phone_number='+data.fax_phone_number+'&image='+data.image+'&bank='+data.bank+'&bank_account_number='+data.bank_account_number+'&bank_branch_number='+data.bank_branch_number+'&delivery_allowed='+parseInt(data.delivery_allowed)+'&delivery_radius='+parseInt(data.delivery_radius)+'&manufacturer='+data.manufacturer;
        
        return this.http.post(this.baseUrl + "register_garage", register_data, options)
            .map((res: Response) => res.json());
    }


    loginAsGarage(mobile_number: string, password: string) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let login_data = 'mobile_number=' + mobile_number + '&password=' + password;
        return this.http.post(this.baseUrl + "garageLogin", login_data, options)
            .map((res: Response) => { this.userId = res.json().result.user_id; return res.json(); });
    }

    ForgetPassword(mobile_number: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'mobile_number=' + mobile_number;
        return this.http.post(this.baseUrl + "ForgetPassword", data, options)
            .map((res: Response) => res.json());
    }


    store_toassessor_rating(claim_id: number, assessor_id: number, message: any, rating: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let store_toassessor_rating_data = 'claim_id=' + claim_id + '&assessor_id=' + assessor_id + '&message=' + message + '&rating=' + rating;
        console.log("store_toassessor_rating_data :" + JSON.stringify(store_toassessor_rating_data));
        return this.http.post(this.baseUrl + "store_toassessor_rating", store_toassessor_rating_data, options)
            .map((res: Response) => res.json());
    }

    change_my_password(user_id: number, currentpassword: any, newpassword: any, role: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'currentpassword=' + currentpassword + '&user_id=' + user_id + '&newpassword=' + newpassword;
        if (role == 'admin') {
            return this.http.post(this.baseUrl + "admin_change_password", data, options)
                .map((res: Response) => res.json());
        }
        else {
            return this.http.post(this.baseUrl + "change_my_password", data, options)
                .map((res: Response) => res.json());
        }

    }

    update_garage_complete_profile(forminput: any, garage_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_garage_basic_data = 'garage_id=' + garage_id + '&Name=' + forminput.Name + '&Contact_name=' + forminput.Contact_name + '&email=' + forminput.email + '&cell_phone_number=' + forminput.cell_phone_number + '&city=' + forminput.city + '&latitude=' + forminput.latitude + '&longitude=' + forminput.longitude + '&License_number=' + forminput.License_number + '&authorized_importer=' + forminput.authorized_importer + '&business_id_number=' + forminput.business_id_number;

        return this.http.post(this.baseUrl + "update_garage_complete_details", update_garage_basic_data, options)
            .map((res: Response) => res.json());
    }

    update_garage_basic(forminput: any, garage_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let update_garage_basic_data = 'Name=' + forminput.Name + '&Contact_name=' + forminput.Contact_name + '&email=' + forminput.email + '&cell_phone_number=' + forminput.cell_phone_number + '&city=' + forminput.city + '&latitude=' + forminput.latitude + '&longitude=' + forminput.longitude;

        return this.http.post(this.baseUrl + "update_garage_basic/" + garage_id, update_garage_basic_data, options)
            .map((res: Response) => res.json());
    }

    update_garage_business(forminput: any, garage_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        var update_garage_business_data;
        if (forminput.delivery_allowed == false) {
            update_garage_business_data = 'License_number=' + forminput.License_number + '&authorized_importer=' + forminput.authorized_importer + '&business_id_number=' + forminput.business_id_number + '&delivery_allowed=' + forminput.delivery_allowed;
        }
        else if (forminput.delivery_allowed == true) {
            update_garage_business_data = 'License_number=' + forminput.License_number + '&authorized_importer=' + forminput.authorized_importer + '&business_id_number=' + forminput.business_id_number + '&delivery_allowed=' + forminput.delivery_allowed + '&delivery_radius=' + forminput.delivery_radius;
        }

        console.log("update_garage_business :" + JSON.stringify(update_garage_business_data));
        return this.http.post(this.baseUrl + "update_garage_business/" + garage_id, update_garage_business_data, options)
            .map((res: Response) => res.json());
    }

    send_offer_toAll_garage(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        //let send_offer_toAll_garage_data = 'currentlat=' + data.currentlat + "&currentlng=" + data.currentlng + "&radius=" + data.radius + '&claim_unq_id=' + data.claim_unq_id;
        let send_offer_toAll_garage_data = 'currentlat=' + data.currentlat + "&currentlng=" + data.currentlng +'&claim_unq_id=' + data.claim_unq_id;
       
        return this.http.post(this.baseUrl + "send_offer_toAll_garage", send_offer_toAll_garage_data, options)
            .map((res: Response) => res.json());
    }

    get_newclaim_offer_list(garage_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "newclaim_offer_list/" + garage_id, options)
            .map((res: Response) => res.json());
    }

    get_complete_claim_offer(garage_offer_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "complete_claim_offer/" + garage_offer_id, options)
            .map((res: Response) => res.json());
    }

    get_complete_claimJob_details(garage_offer_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "complete_claimJob_details/" + garage_offer_id, options)
            .map((res: Response) => res.json());
    }


    update_garage_offer_info(data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("update_garage_offer_information :" + JSON.stringify(data));
        let info_data = 'claim_unq_id=' + data.claim_unq_id + '&garage_charge=' + data.garage_charge + '&additional_service=' + data.additional_services + '&parts_amount=' + data.parts_amount + '&garage_offer_id=' + data.garage_offer_id;
        return this.http.post(this.baseUrl + "update_garage_offer_information", info_data, options)
            .map((res: Response) => res.json());
    }

    get_oldclaim_offer_list(garage_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "oldclaim_offer_list/" + garage_id, options)
            .map((res: Response) => res.json());
    }

    get_garage_offer_list(claim_unq_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_all_garage_offers/" + claim_unq_id, options)
            .map((res: Response) => res.json());
    }

    update_garage_offer_status(formdata: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("update_garage_offer_status :" + JSON.stringify(formdata));

        let info_data = 'claim_unq_id=' + formdata.claim_unq_id + '&client_number=' + formdata.client_number + '&client_name=' + formdata.client_name + '&garage_cell_number=' + formdata.garage_cell_number + '&garage_email=' + formdata.garage_email + '&garage_contact_name=' + formdata.garage_contact_name + '&garage_offer_id=' + formdata.garage_offer_id + '&offer_status=' + formdata.offer_status;
        return this.http.post(this.baseUrl + "update_garage_offer_status", info_data, options)
            .map((res: Response) => res.json());
    }
    update_job_status(formdata: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("update_job_status :" + JSON.stringify(formdata));

        let info_data = 'claim_unq_id=' + formdata.claim_unq_id + '&Insured_cellphone=' + formdata.Insured_cellphone + '&Insured_name=' + formdata.Insured_name + '&status=' + formdata.status + '&garage_offer_id=' + formdata.garage_offer_id;
        return this.http.post(this.baseUrl + "update_job_status_fr_garage", info_data, options)
            .map((res: Response) => res.json());
    }

    update_job_status_fr_client(formdata: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        console.log("update_job_status_fr_client :" + JSON.stringify(formdata));
        let info_data = 'claim_unq_id=' + formdata.claim_unq_id + '&garage_id=' + formdata.garage_id + '&client_name=' + formdata.client_name + '&status=' + formdata.status + '&client_number=' + formdata.client_number;
        return this.http.post(this.baseUrl + "update_job_status_fr_client", info_data, options)
            .map((res: Response) => res.json());
    }

    store_togarage_rating(claim_id: number, garage_id: number, message: any, rating: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let store_togarage_rating = 'claim_id=' + claim_id + '&garage_id=' + garage_id + '&message=' + message + '&rating=' + rating;
        console.log("store_togarage_rating :" + JSON.stringify(store_togarage_rating));
        return this.http.post(this.baseUrl + "store_togarage_rating", store_togarage_rating, options)
            .map((res: Response) => res.json());
    }

    get_manufacturer_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_vehicle_manufacturer", options)
            .map((res: Response) => res.json());
    }

    get_model_list(manufacturer_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_vehicle_model/" + manufacturer_id, options)
            .map((res: Response) => res.json());
    }

    loginAsAdmin(mobile_number: string, password: string) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let login_data = 'mobile_number=' + mobile_number + '&password=' + password;

        return this.http.post(this.baseUrl + "adminlogin", login_data, options)
            .map((res: Response) => { this.userId = res.json().result.user_id; return res.json(); });
    }


    loginAsInsuranceCoy(username: string, password: string) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let login_data = 'username=' + username + '&password=' + password;

        return this.http.post(this.baseUrl + "InsuranceCoyLogin", login_data, options)
            .map((res: Response) => { this.userId = res.json().result.user_id; return res.json(); });
    }


    adminForgetPassword(mobile_number: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let adminForgetPassword_data = 'mobile_number=' + mobile_number;
        console.log("adminForgetPassword :" + JSON.stringify(adminForgetPassword_data));
        return this.http.post(this.baseUrl + "adminForgetPassword", adminForgetPassword_data, options)
            .map((res: Response) => res.json());
    }

    adminUpdatePassword(code: any, newpassword: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let adminUpdatePassword_data = 'code=' + code + '&newpassword=' + newpassword;
        console.log("adminUpdatePassword_data :" + JSON.stringify(adminUpdatePassword_data));
        return this.http.post(this.baseUrl + "adminUpdatePassword", adminUpdatePassword_data, options)
            .map((res: Response) => res.json());
    }

    admin_active_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "active_claim_lists", options)
            .map((res: Response) => { this.activelist = res.json().result; return res.json(); });
    }
    admin_oldclaim_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "history_claim_lists", options)
            .map((res: Response) => { this.oldlist = res.json().result; return res.json(); });
    }

    get_complete_claim_info(claim_id: Number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "complete_claiminfo/" + claim_id, options)
            .map((res: Response) => res.json());

    }

    InsCoy_active_list(ins_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "insurancecoy_active_lists/" + ins_id, options)
            .map((res: Response) => { this.activelist = res.json().result; return res.json(); });
    }

    InsCoy_oldclaim_list(ins_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "insurancecoy_history_claim_lists/" + ins_id, options)
            .map((res: Response) => { this.oldlist = res.json().result; return res.json(); });
    }

    register_Insurance_coy(logofile: any, form_data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        var fd = new FormData();
        if (logofile != '') {
            fd.append('logofile', logofile, logofile.name);
        }
        fd.append('name', form_data.name);
        fd.append('address', form_data.address);
        fd.append('zipcode', form_data.zipcode);
        return this.http.post(this.baseUrl + "register_Insurance_coy", fd, options).map((res: Response) => {
            this.get_complete_company_list();
            return res.json();
        });
    }

    update_Insurance_coy(logofile: any, form_data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        var fd = new FormData();
        if (logofile != '') {
            fd.append('logofile', logofile, logofile.name);
        }
        fd.append('name', form_data.name);
        fd.append('address', form_data.address);
        fd.append('zipcode', form_data.zipcode);
        fd.append('ins_id', form_data.ins_id);
        return this.http.post(this.baseUrl + "update_Insurance_coy", fd, options).map((res: Response) => {
            this.logochange.next({ logo: res.json().result.logo });
            return res.json();
        });
    }


    get_complete_company_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_company_complete_list", options)
            .map((res: Response) => { this.companylist = res.json().result; return res.json(); });
    }

    get_company_information(ins_id: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_company_info/" + ins_id, options)
            .map((res: Response) => { return res.json(); });
    }

    remove_insurance_coy(ins_id: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'ins_id=' + ins_id;
        return this.http.post(this.baseUrl + "remove_insurance_coy", data, options)
            .map((res: Response) => res.json());
    }

    inscoy_change_password(ins_id: number, formdata: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'currentpassword=' + formdata.currentpassword + '&ins_id=' + ins_id + '&newpassword=' + formdata.newpassword;
        return this.http.post(this.baseUrl + "inscoy_change_password", data, options)
            .map((res: Response) => res.json());
    }

    get_assessors_complete_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_assessors_complete_list", options)
            .map((res: Response) => { this.assessorlist = res.json().result; return res.json(); });
    }

    get_garage_complete_list() {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + "get_garage_complete_list", options)
            .map((res: Response) => { this.assessorlist = res.json().result; return res.json(); });
    }


    change_status_assessor(assessor_id: any, active: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'assessor_id=' + assessor_id + '&active=' + active;
        return this.http.post(this.baseUrl + "change_status_assessor", data, options)
            .map((res: Response) => res.json());
    }

    change_status_garage(garage_id: any, active: number) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + base64encodedData }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        let data = 'garage_id=' + garage_id + '&active=' + active;
        return this.http.post(this.baseUrl + "change_status_garage", data, options)
            .map((res: Response) => res.json());
    }

    get_image_url(logofile:any,form_data:any){
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        var fd = new FormData();
        if (logofile != '') {
            fd.append('logofile', logofile, logofile.name);
        }
        fd.append('prevlogofile', form_data.prevlogofile);
        fd.append('role', form_data.role);
        return this.http.post(this.baseUrl + "temp_upload_avatar", fd, options).map((res: Response) => {
            return res.json();
        });
    }


    get_file_url(reportfile:any,form_data:any){
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        var fd = new FormData();
        if (reportfile != '') {
            fd.append('reportfile', reportfile, reportfile.name);
        }
        fd.append('prevreportfile', form_data.prevlogofile);
        return this.http.post(this.baseUrl + "temp_upload_file", fd, options).map((res: Response) => {
            return res.json();
        });
    }


    update_avatar(logofile: any, form_data: any) {
        let base64encodedData = btoa(this.apiuser + ':' + this.apipassword);
        let headers = new Headers({ 'Authorization': 'Basic ' + base64encodedData });
        let options = new RequestOptions({ headers: headers });
        var fd = new FormData();
        if (logofile != '') {
            fd.append('logofile', logofile, logofile.name);
        }
        fd.append('user_id', form_data.user_id);
        fd.append('role', form_data.role);
        return this.http.post(this.baseUrl + "update_avatar", fd, options).map((res: Response) => {
            this.logochange.next({ logo: res.json().result.image });
            return res.json();
        });
    }


    getchangelogo(): Observable<any> {
        return this.logochange.asObservable();
    }

    getloadedactivelist() {
        return this.activelist;
    }
    getloadedoldlist() {
        return this.oldlist;
    }
    getcompanylist() {
        return this.companylist;
    }
    getassessorlist() {
        return this.assessorlist;
    }


}
