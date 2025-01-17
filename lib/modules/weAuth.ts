// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as utils from "./utils";
import * as crypto from 'crypto-js';
import * as config from './config';

export class Auth {
    private _username: string;
    private _api_key: string;

    constructor(username: string, api_key: string){
        this._username = username;
        this._api_key = api_key;
    }

    public get username(): string {
        return this._username;
    }

    public get api_key(): string {
        return this._api_key;
    }
}

export class AppPermission {
    private _name: string;
    private _token: string;

    constructor(obj?: {name: string, token: string}){
        this._name = obj.name;
        this._token = obj.token;
    }

    public get name(): string {
        return this._name;
    }

    public get token(): string {
        return this._token;
    }
}

export class UserApp {
    private _id: number;
    private _app_name: string;
    private _app_token: string;
    private _app_profile_id: number;
    private _display_name: string;
    private _admin: boolean;
    private _permissions: Array<AppPermission>;

    constructor(
      id: number,
      app_name: string,
      app_token: string,
      app_profile_id: number,
      display_name: string,
      admin: boolean,
      permissions: Array<any>
    ){
        this._id = id;
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._display_name = display_name;
        this._admin = admin;
        this._permissions = [];

        for(let perm of permissions){
            this._permissions.push(perm);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get app_name(): string {
        return this._app_name;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get app_profile_id(): number {
        return this._app_profile_id;
    }

    public get display_name(): string {
        return this._display_name;
    }

    public get admin(): boolean {
        return this._admin;
    }

    public has_perm(perm_token_list: Array<string>): boolean {
        if(this._admin){
            return true;
        }else{
            let resp_return: boolean = false;
            for(let token of perm_token_list){
                for(let perm of this._permissions){
                    if(perm.name == token){
                        resp_return = true;
                        break;
                    }
                }
                if(resp_return){
                    break;
                }
            }
            return resp_return;
        }
    }
}

export class User {
    private _id: number;
    public name: string;
    private _email: string;
    private _auth: Auth;
    private _apps: Array<UserApp>;
    private _account: UserAccount;
    private _is_authenticated: boolean;
    private _encrypt_key: string = 's7hsj2d12easd63ksye598sdhw312ed8';
    private _current_user_app: UserApp;
    private _plugin_navegador: utils.PluginNavegador;

    private _we_auth_user_create_account_resource = new api.Tastypie.Resource('we-auth/user/create-account')
    private _we_auth_user_create_account_ong_resource = new api.Tastypie.Resource('we-auth/user/create-account-ong')
    private _we_auth_user_create_account_doador_empresa_resource = new api.Tastypie.Resource('we-auth/user/create-account-doador-empresa')
    private _we_auth_user_login_resource = new api.Tastypie.Resource('we-auth/user/login')
    private _we_auth_user_logout_resource = new api.Tastypie.Resource('we-auth/user/logout')
    private _we_auth_user_profile_resource = new api.Tastypie.Resource('we-auth/user/profile')
    private _we_auth_user_reset_pass_request_resource = new api.Tastypie.Resource('we-auth/user/reset-password-request')
    private _we_auth_user_reset_pass_execute_resource = new api.Tastypie.Resource('we-auth/user/reset-password-execute')
    private _we_auth_user_change_pass_resource = new api.Tastypie.Resource('we-auth/user/change-password')

    constructor(){
        this.name = ''
        this._email = ''
        this._is_authenticated = false;
        this._auth = new Auth('','');
        this._account = new UserAccount();
        this._apps = [];
        this._plugin_navegador = new utils.PluginNavegador();

        let _self = this;
        document.addEventListener("$wl_msg_checkSite", function(data){
            _self._plugin_navegador.instalado = true;
            _self.notificarPlugin()
        });
    }

    public save(): Promise<User> {
        let _self = this;
        return _self._we_auth_user_profile_resource.objects.update(_self._id, {name: _self.name}).then(
            function(){
                _self.notificarPlugin();
                return _self;
            }
        )
    }

    public get id(): number {
      return this._id;
    }

    public get email(): string {
      return this._email;
    }

    public get auth(): Auth {
        return this._auth;
    }

    public get apps(): Array<UserApp> {
        return this._apps;
    }

    public get account(): UserAccount {
        return this._account;
    }

    public get is_authenticated(): any {
        return this._is_authenticated;
    }

    public get current_user_app(): UserApp {
        return this._current_user_app;
    }

    public set current_user_app(userapp:UserApp) {
        this._current_user_app = userapp;
    }

    public get plugin_navegador(): utils.PluginNavegador {
        return this._plugin_navegador;
    }

    public getUserAppAdmin(app_token: string): UserApp {
        let userapp_return: UserApp;
        for(let userapp of this.apps){
          if(userapp.app_token == app_token && userapp.admin){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public getUserAppById(id: number): UserApp {
        let userapp_return: UserApp;
        for(let userapp of this.apps){
          if(userapp.id == id){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public getUserAppByProfile(token: string, profile_id: number): UserApp {
        let userapp_return: UserApp;
        for(let userapp of this.apps){
          if(userapp.app_token == token && userapp.app_profile_id == profile_id){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public has_perm(obj_perm: {
      app_token: string,
      app_profile_id: number,
      perm_token_list: Array<string>
    }): boolean {

        let obj_userapp: UserApp;

        if(this._current_user_app.app_token == obj_perm.app_token
          && this._current_user_app.app_profile_id == obj_perm.app_profile_id){
              obj_userapp = this._current_user_app;
        }else{
            obj_userapp = this.getUserAppByProfile(obj_perm.app_token, obj_perm.app_profile_id);
        }

        if(!obj_userapp){
            return false;
        }

        let obj_member = {
            admin: false,
            member: false
        }

        for(let token of obj_perm.perm_token_list){
            if(token == 'admin'){
                obj_member.admin = true;
                break;
            }

            if(token == 'member'){
                obj_member.member = true;
            }
        }

        if(obj_member.admin){
            return obj_userapp.admin;
        }

        if(obj_member.member){
            return true;
        }

        return obj_userapp.has_perm(obj_perm.perm_token_list);
    }

    private setProfile(data: any, kwargs?: any): void{
      let _self = this;
      if(data &&
         data.hasOwnProperty('name') &&
         data.hasOwnProperty('email') &&
         data.hasOwnProperty('auth') &&
         data.hasOwnProperty('apps') &&
         data.hasOwnProperty('account')){
           api.Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);

           _self._id = data.id;
           _self.name = data.name;
           _self._email = data.email;
           _self._auth = new Auth(data.auth.username, data.auth.api_key);
           _self._account = new UserAccount(data);

           _self._apps = [];
           for(let userapp of data.apps){
              _self._apps.push(new UserApp(
                userapp.id,
                userapp.app_name,
                userapp.app_token,
                userapp.app_profile_id,
                userapp.display_name,
                userapp.admin,
                userapp.permissions
              ));
           }

           if(kwargs){
              if(kwargs.hasOwnProperty('source')){
                  if(kwargs.source.detail.hasOwnProperty('user_app_id')){
                      _self._current_user_app = _self.getUserAppById(kwargs.source.detail.user_app_id);
                  }
              }
           }

           _self._is_authenticated = true;
           _self.notificarPlugin();
           if(utils.Tools.localStorageSuported){
               let encrypted_user = crypto.AES.encrypt(JSON.stringify({
                  username: data.auth.username,
                  apikey: data.auth.api_key,
                  kwargs: kwargs
              }), _self._encrypt_key).toString();
              localStorage.setItem('weUserX', encrypted_user);
            }
       }else{
           _self.name = ''
           _self._email = ''
           _self._is_authenticated = false;
           _self._auth = new Auth('','');
           _self._apps = [];
          if(utils.Tools.localStorageSuported) localStorage.removeItem('weUserX');
       }
    }

    public createAccount(name: string, email: string, password: string, kwargs?:any): Promise<User> {
      let _self = this;
      return _self._we_auth_user_create_account_resource.objects.create({
          name: name,
          email: email,
          password: password,
          kwargs: kwargs
      }).then(
          function(data: any){
              _self.setProfile(data, kwargs);
              if(_self._is_authenticated){
                  return _self;
              }else{
                  return api.Tastypie.Tools.generate_exception("[WeAuth][create_account] Usuario não identificado");
              }
          }
      )
    }

    public createAccountOng(nome: string, email: string, razao_social: string, cnpj:string, kwargs?:any): Promise<User> {
      let _self = this;
      return _self._we_auth_user_create_account_ong_resource.objects.create({
          nome: nome,
          email: email,
          razao_social: razao_social,
          cnpj: cnpj,
          kwargs: kwargs
      }).then(
          function(data: any){
              _self.setProfile(data, kwargs);
              if(_self._is_authenticated){
                  return _self;
              }else{
                  return api.Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
              }
          }
      )
    }

    public createAccountDoadorEmpresa(nome: string, email: string, cpf_cnpj:string, kwargs?:any): Promise<User> {
      let _self = this;
      return _self._we_auth_user_create_account_doador_empresa_resource.objects.create({
          nome: nome,
          email: email,
          cpf_cnpj: cpf_cnpj,
          kwargs: kwargs
      }).then(
          function(data: any){
              _self.setProfile(data, kwargs);
              if(_self._is_authenticated){
                  return _self;
              }else{
                  return api.Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_empresa] Usuario não identificado");
              }
          }
      )
    }

    public login(username: string, password: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            password: password,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data, kwargs);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
                }
            }
        )
    }

    public loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token:  facebook_access_token,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data, kwargs);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
                }
            }
        )
    }

    private _quickLogin(username: string, apikey: string, kwargs?:any): Promise<User> {
      let _self = this;
      api.Tastypie.Provider.setAuth('welight', username, apikey);
      return _self._we_auth_user_profile_resource.objects.findOne({kwargs:kwargs}).then(
          function(data: any){
              _self.setProfile(data, kwargs);
              if(_self._is_authenticated){
                  return _self;
              }else{
                  return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
              }
          }
      ).catch(function(){
          _self._logout();
          return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
      });
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<User> {
        let _self = this;
        if(auth){
            return _self._quickLogin(auth.username, auth.apikey, kwargs);
        }else{
            if(utils.Tools.localStorageSuported){
                let weUser: string = localStorage.getItem('weUserX')
                if(weUser){
                    let auth_user = JSON.parse(crypto.AES.decrypt(weUser, _self._encrypt_key).toString(crypto.enc.Utf8));
                    return _self._quickLogin(auth_user.username, auth_user.apikey, auth_user.kwargs);
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
                }
            }else{
                return api.Tastypie.Tools.generate_exception("[WeAuth][quickLogin] Usuario não identificado");
            }
        }
    }

    private _logout(): void {
        api.Tastypie.Provider.removeAuth('welight');
        this.name = ''
        this._email = ''
        this._is_authenticated = false;
        this._auth = new Auth('','');
        this._apps = [];
        if(utils.Tools.localStorageSuported) localStorage.removeItem('weUserX');
        if(config.Environment.env == 'prod'){
          let wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': {} });
          document.dispatchEvent(wl_msg_event);
        }
    }

    public logout(): Promise<any> {
        let _self = this;
        if(utils.Tools.localStorageSuported) localStorage.removeItem('weUserX');
        return _self._we_auth_user_logout_resource.objects.findOne().then(
            function(){
              _self._logout();
              return _self;
            }
        ).catch(function(){
            _self._logout();
            return _self;
        });
    }

    public reset_password_request(email: string, kwargs?:any): Promise<any> {
        return this._we_auth_user_reset_pass_request_resource.objects.create({
            email: email,
            kwargs: kwargs
        });
    }

    public reset_password_execute(token: string, password: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_reset_pass_execute_resource.objects.create({
            token: token,
            pass: password,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data, kwargs);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][reset_password_execute] Usuario não identificado");
                }
            }
        )
    }

    public change_password(username: string, pass_old: string, pass_new: string, kwargs?:any): Promise<User> {
        let _self = this;
        return _self._we_auth_user_change_pass_resource.objects.create({
            username: username,
            pass_old: pass_old,
            pass_new: pass_new,
            kwargs: kwargs
        }).then(
            function(data: any){
                _self.setProfile(data, kwargs);
                if(_self._is_authenticated){
                    return _self;
                }else{
                    return api.Tastypie.Tools.generate_exception("[WeAuth][change_password] Usuario não identificado");
                }
            }
        )
    }

    public notificarPlugin(): void{
        if(config.Environment.env == 'prod' && this._is_authenticated){
            let _self = this;
            let wl_msg_profile = {
                user: {username: _self._auth.username, api_key: _self._auth.api_key}
            };
            let wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': wl_msg_profile });
            document.dispatchEvent(wl_msg_event);
        }
    }

    public instalarPluginNavegador(navegador:string): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            if(navegador == "chrome"){
                _self._plugin_navegador.instalarExtensaoChrome().then(
                    function(success: any){
                        _self.notificarPlugin();
                        resolve(true);
                    }
                );
            }else if(navegador == "firefox"){
                _self._plugin_navegador.instalarExtensaoFirefox().then(
                    function(success: any){
                        _self.notificarPlugin();
                        resolve(true);
                    }
                );
            }else if(navegador == "safari"){
                window.open('https://safari-extensions.apple.com/details/?id=co.welight.safari.welight-AR7RY2A3BF', '_blank');
                resolve(true);
            }else{
                reject('Browser not supported.');
            }
        });
    }
}

export class UserAccount extends api.Tastypie.Model<UserAccount> {

    public static resource = new api.Tastypie.Resource<UserAccount>('we-auth/user/profile', {model: UserAccount});

    public user_id: number;
    public foto: string;

    public pais: string;
    public idioma: string;

    public moeda: string;
    public sexo: string;
    public cidade: string;

    public religiao: string;
    public estado_civil: string;
    public range_idade: string;

    public dt_nascimento: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(UserAccount.resource);
        if(obj){
            this.setData(obj.account);
            this.user_id = obj.id
        }
    }

    public save(): Promise<UserAccount> {
        let _self = this;
        return UserAccount.resource.objects.update(_self.user_id, {account: _self.getData()}).then(
            function(data){
                _self.setData(data);
                return _self;
            }
        )
    }

    public changeFoto(event: any): Promise<UserAccount> {
        let _self = this;
        let uploading = new Promise<UserAccount>(function(resolve, reject) {
            let timeout = setTimeout(function(){ reject('timeout'); }, 15000);
            let reader = new FileReader();
            reader.onload = function(loadEvent: any){
                let paramFile = loadEvent.target.result;
                UserAccount.resource.objects.update(_self.user_id, {account:{foto:paramFile}}).then(function(data){
                    clearTimeout(timeout);
                    _self.setData(data);
                    resolve(data);
                }).catch(function(error){
                    clearTimeout(timeout);
                    reject(error);
                });
            }
            reader.readAsDataURL(event.target.files[0]);
        });
        return uploading;
    }

    public changeFotoBase64(dataBase64: any): Promise<UserAccount> {
        let _self = this;
        return UserAccount.resource.objects.update(_self.user_id, {account:{foto:dataBase64}}).then(function(data){
            _self.setData(data);
            return _self;
        });
    }
}
