import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import * as ong_models from "./ong";
import * as onu_models from "./onu";
import * as we_notify_models from "./weNotify";
import * as utils from "./utils";
export declare class Doador extends api.Tastypie.Model<Doador> {
    static resource: api.Tastypie.Resource<Doador>;
    nome: string;
    slug: string;
    avaliador: boolean;
    empresa: boolean;
    private _email;
    private _dt_updated;
    private _dt_created;
    private _we_notify;
    private _rede;
    private _ong_timeline;
    private _doacao_mes;
    private _user;
    private _check_slug_resource;
    private _doador_logado;
    plugin_navegador: utils.PluginNavegador;
    constructor(obj?: any);
    save(): Promise<Doador>;
    private initProfile(obj?);
    check_slug(slug: string): Promise<{
        available: boolean;
    }>;
    instalarPluginNavegador(navegador: string): Promise<any>;
    notificarPlugin(): Promise<any>;
    readonly email: string;
    readonly dt_created: string;
    readonly dt_updated: string;
    readonly rede: DoadorRede;
    readonly ong_timeline: api.Tastypie.Resource<ong_models.OngTimeLine>;
    readonly doacao_mes: api.Tastypie.Resource<DoadorDoacaoMes>;
    readonly we_notify: api.Tastypie.Resource<we_notify_models.WeNotifyDoador>;
    readonly user: weauth_models.User;
    getPontos(): Promise<DoadorPontos>;
    getDoacao(): Promise<DoadorDoacao>;
    getCompraAfiliadora(): Promise<DoadorCompraAfiliadoraStatus>;
    getAvaliador(): Promise<DoadorAvaliador>;
    getPluginNavegadorLog(): Promise<DoadorPluginNavegador>;
    getPreferencia(): Promise<DoadorPreferencia>;
    createAccount(name: string, email: string, password: string, kwargs?: any): Promise<Doador>;
    login(username: string, password: string, kwargs?: any): Promise<Doador>;
    loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?: any): Promise<Doador>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Doador>;
    reset_password_request(email: string, kwargs?: any): Promise<any>;
    reset_password_execute(token: string, password: string, kwargs?: any): Promise<Doador>;
    change_password(username: string, pass_old: string, pass_new: string, kwargs?: any): Promise<Doador>;
}
export declare class DoadorAvaliador extends api.Tastypie.Model<DoadorAvaliador> {
    static resource: api.Tastypie.Resource<DoadorAvaliador>;
    doador_id: number;
    acesso_ativo: boolean;
    cpf: string;
    rg: string;
    facebook: string;
    linkedin: string;
    cep: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class DoadorPluginNavegador extends api.Tastypie.Model<DoadorPluginNavegador> {
    static resource: api.Tastypie.Resource<DoadorPluginNavegador>;
    doador_id: number;
    navegador: string;
    dt_ultima_ativacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class DoadorPreferencia extends api.Tastypie.Model<DoadorPreferencia> {
    static resource: api.Tastypie.Resource<DoadorPreferencia>;
    doador_id: number;
    email_ao_ganhar_ponto: boolean;
    email_postagens_ong_pontuada: boolean;
    email_newsletter_welight: boolean;
    ong_pode_acessar_meu_email: boolean;
    constructor(obj?: any);
}
export declare class DoadorPontos extends api.Tastypie.Model<DoadorPontos> {
    static resource: api.Tastypie.Resource<DoadorPontos>;
    private _doador_id;
    private _recebidos;
    private _distribuidos;
    private _disponiveis;
    private _recebidos_cadastro;
    private _recebidos_convite;
    private _recebidos_compra;
    private _ong;
    private _distribuicao_resource;
    constructor(obj?: any);
    distribuir(ong_id: number, pontos: number): Promise<DoadorPontos>;
    readonly doador_id: number;
    readonly recebidos: number;
    readonly distribuidos: number;
    readonly disponiveis: number;
    readonly recebidos_cadastro: number;
    readonly recebidos_convite: number;
    readonly recebidos_compra: number;
    readonly ong: api.Tastypie.Resource<DoadorDoacaoOng>;
}
export declare class DoadorDoacaoMes extends api.Tastypie.Model<DoadorDoacaoMes> {
    static resource: api.Tastypie.Resource<DoadorDoacaoMes>;
    doador_id: number;
    mes: number;
    ano: number;
    moeda: string;
    doador_doacao_pendente: number;
    doador_doacao_direta: number;
    doador_doacao_pool: number;
    doador_doacao_total: number;
    doador_doacao_impacto: number;
    rede_acima_doacao_pendente: number;
    rede_acima_doacao_direta: number;
    rede_acima_doacao_pool: number;
    rede_acima_doacao_total: number;
    rede_abaixo_doacao_pendente: number;
    rede_abaixo_doacao_direta: number;
    rede_abaixo_doacao_pool: number;
    rede_abaixo_doacao_total: number;
    rede_direta_doacao_pendente: number;
    rede_direta_doacao_direta: number;
    rede_direta_doacao_pool: number;
    rede_direta_doacao_total: number;
    rede_indireta_doacao_pendente: number;
    rede_indireta_doacao_direta: number;
    rede_indireta_doacao_pool: number;
    rede_indireta_doacao_total: number;
    dt_created: string;
    constructor(obj?: any);
}
export declare class DoadorDoacao extends api.Tastypie.Model<DoadorDoacao> {
    static resource: api.Tastypie.Resource<DoadorDoacao>;
    private _doador_id;
    private _moeda;
    private _doador_doacao_pendente;
    private _doador_doacao_direta;
    private _doador_doacao_pool;
    private _doador_doacao_total;
    private _doador_doacao_impacto;
    private _rede_acima_doacao_pendente;
    private _rede_acima_doacao_direta;
    private _rede_acima_doacao_pool;
    private _rede_acima_doacao_total;
    private _rede_abaixo_doacao_pendente;
    private _rede_abaixo_doacao_direta;
    private _rede_abaixo_doacao_pool;
    private _rede_abaixo_doacao_total;
    private _rede_direta_doacao_pendente;
    private _rede_direta_doacao_direta;
    private _rede_direta_doacao_pool;
    private _rede_direta_doacao_total;
    private _rede_indireta_doacao_pendente;
    private _rede_indireta_doacao_direta;
    private _rede_indireta_doacao_pool;
    private _rede_indireta_doacao_total;
    private _doacao_ong;
    private _doacao_ods;
    private _dt_updated;
    constructor(obj?: any);
    readonly moeda: string;
    readonly doador_doacao_pendente: number;
    readonly doador_doacao_direta: number;
    readonly doador_doacao_pool: number;
    readonly doador_doacao_total: number;
    readonly doador_doacao_impacto: number;
    readonly rede_acima_doacao_pendente: number;
    readonly rede_acima_doacao_direta: number;
    readonly rede_acima_doacao_pool: number;
    readonly rede_acima_doacao_total: number;
    readonly rede_abaixo_doacao_pendente: number;
    readonly rede_abaixo_doacao_direta: number;
    readonly rede_abaixo_doacao_pool: number;
    readonly rede_abaixo_doacao_total: number;
    readonly rede_direta_doacao_pendente: number;
    readonly rede_direta_doacao_direta: number;
    readonly rede_direta_doacao_pool: number;
    readonly rede_direta_doacao_total: number;
    readonly rede_indireta_doacao_pendente: number;
    readonly rede_indireta_doacao_direta: number;
    readonly rede_indireta_doacao_pool: number;
    readonly rede_indireta_doacao_total: number;
    readonly doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;
    readonly doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;
}
export declare class DoadorRede {
    private _doador_id;
    private _acima_resource;
    private _abaixo_resource;
    private _direta_resource;
    private _indireta_resource;
    constructor(doador_id: number);
    readonly acima: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly abaixo: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly direta: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly indireta: api.Tastypie.Resource<DoadorRedeAmigos>;
}
export declare class DoadorRedeAmigos extends api.Tastypie.Model<DoadorRedeAmigos> {
    static resource: api.Tastypie.Resource<DoadorRedeAmigos>;
    doador_id: number;
    doador_nome: number;
    doador_email: number;
    parent_id: number;
    parent_nome: number;
    parent_email: number;
    parent_ativo: boolean;
    parent_dt_created: string;
    constructor(obj?: any);
}
export declare class DoadorDoacaoOng extends api.Tastypie.Model<DoadorDoacaoOng> {
    static resource: api.Tastypie.Resource<DoadorDoacaoOng>;
    ong: ong_models.Ong;
    doador_id: number;
    moeda: string;
    doacao_direta: number;
    doacao_pool: number;
    doacao_total: number;
    pontos: number;
    dt_updated: string;
    private _doacao_ods;
    constructor(obj?: any);
    readonly doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;
}
export declare class DoadorDoacaoOds extends api.Tastypie.Model<DoadorDoacaoOds> {
    static resource: api.Tastypie.Resource<DoadorDoacaoOds>;
    ods: onu_models.Ods;
    doador_id: number;
    moeda: string;
    doacao_direta: number;
    doacao_pool: number;
    doacao_total: number;
    nivel: number;
    dt_updated: string;
    private _doacao_ong;
    constructor(obj?: any);
    readonly doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;
}
export declare class DoadorCompraAfiliadoraStatus extends api.Tastypie.Model<DoadorCompraAfiliadoraStatus> {
    static resource: api.Tastypie.Resource<DoadorCompraAfiliadoraStatus>;
    private _doador_id;
    private _ativo;
    private _compra_qtde;
    private _doacao_total;
    private _doacao_porcentagem;
    private _dt_updated;
    private _compra;
    constructor(obj?: any);
    readonly doador_id: number;
    readonly ativo: boolean;
    readonly compra_qtde: number;
    readonly doacao_total: number;
    readonly doacao_porcentagem: number;
    readonly dt_updated: string;
    readonly compra: api.Tastypie.Resource<DoadorCompraAfiliadora>;
}
export declare class DoadorCompraAfiliadora extends api.Tastypie.Model<DoadorCompraAfiliadora> {
    static resource: api.Tastypie.Resource<DoadorCompraAfiliadora>;
    uid: string;
    doador_id: number;
    doador_email: string;
    afiliadora_id: number;
    afiliadora_nome: string;
    loja_id: number;
    loja_nome: string;
    compra_moeda: string;
    compra_valor: number;
    comissao_moeda: string;
    comissao_valor: number;
    cotacao_brl: number;
    comissao_valor_brl: number;
    doacao_porcentagem: number;
    taxas_afiliadora: number;
    total_taxa_adm: number;
    doacao_moeda: string;
    doacao_valor: number;
    status_compra: string;
    status_doacao: string;
    fatura_id: number;
    dt_compra: string;
    dt_aprovacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
