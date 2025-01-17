import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import { Ods, MetricCategory, MetricUnit, Metric } from "./onu";
export declare class Ong extends api.Tastypie.Model<Ong> {
    static resource: api.Tastypie.Resource<Ong>;
    nome: string;
    email: string;
    razao_social: string;
    cnpj: string;
    slug: string;
    checked: Boolean;
    children_id: number;
    private _status;
    private _ativo;
    private _parceira;
    private _invite;
    private _qtde_pontos;
    private _qtde_doadores;
    private _profile_detail;
    private _site_custom;
    private _dt_updated;
    private _dt_created;
    private _user;
    private _timeline;
    private _fotos;
    private _videos;
    private _projetos;
    private _bancos;
    private _recursos;
    private _status_carteira;
    private _projeto_entrega;
    private _carteira;
    constructor(obj?: any);
    save(): Promise<Ong>;
    private initProfile;
    readonly status: OngStatus;
    readonly ativo: boolean;
    readonly parceira: boolean;
    readonly invite: string;
    readonly qtde_pontos: number;
    readonly qtde_doadores: number;
    readonly profile_detail: OngDetail;
    readonly site_custom: OngSiteCustom;
    readonly dt_updated: string;
    readonly dt_created: string;
    readonly timeline: api.Tastypie.Resource<OngTimeLine>;
    readonly fotos: api.Tastypie.Resource<OngTimeLine>;
    readonly videos: api.Tastypie.Resource<OngTimeLine>;
    readonly user: weauth_models.User;
    readonly projetos: api.Tastypie.Resource<OngProjeto>;
    readonly bancos: api.Tastypie.Resource<OngBanco>;
    readonly recursos: api.Tastypie.Resource<OngRecurso>;
    readonly status_carteira: api.Tastypie.Resource<OngStatusCarteira>;
    readonly projeto_entrega: api.Tastypie.Resource<OngProjetoEntrega>;
    readonly carteira: api.Tastypie.Resource<OngCarteira>;
    getEndereco(): Promise<OngEndereco>;
    createAccount(nome: string, email: string, razao_social: string, cnpj: string, kwargs?: any): Promise<Ong>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Ong>;
}
export declare class OngDetail extends api.Tastypie.Model<OngDetail> {
    static resource: api.Tastypie.Resource<OngDetail>;
    contato_fone: string;
    missao: string;
    missao_resumo: string;
    realizacao: string;
    realizacao_resumo: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    video_institucional: string;
    estatuto_social: string;
    ultima_assembleia: string;
    website: string;
    youtube: string;
    facebook: string;
    instagram: string;
    oscip: boolean;
    diretor_nome: string;
    diretor_assinatura: string;
    dt_fundacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngSiteCustom {
    descricao: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    constructor(obj?: any);
}
export declare class OngEndereco extends api.Tastypie.Model<OngEndereco> {
    static resource: api.Tastypie.Resource<OngEndereco>;
    ong_id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    constructor(obj?: any);
}
export declare class OngBanco extends api.Tastypie.Model<OngBanco> {
    static resource: api.Tastypie.Resource<OngBanco>;
    ong_id: number;
    banco_codigo: string;
    banco_nome: string;
    agencia: string;
    agencia_digito: string;
    conta_corrente: string;
    conta_corrente_digito: string;
    pessoa_fisica: boolean;
    titular: string;
    cpf_cnpj: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngPostScrap extends api.Tastypie.Model<OngPostScrap> {
    static resource: api.Tastypie.Resource<OngPostScrap>;
    description: string;
    image: string;
    source: string;
    title: string;
    url: string;
    video: string;
    constructor(obj?: any);
}
export declare class OngPost extends api.Tastypie.Model<OngPost> {
    static resource: api.Tastypie.Resource<OngPost>;
    tipo: string;
    descricao: string;
    fotos: Array<string>;
    site_scraped: OngPostScrap;
    dt_updated: string;
    dt_created: string;
    private _fotos_resource;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<OngPost>);
    setScraper(url: string): Promise<OngPostScrap>;
    addFiles(event: any): Promise<Array<string>>;
}
export declare class OngTimeLine extends OngPost {
    static resource: api.Tastypie.Resource<OngTimeLine>;
    ong: Ong;
    projeto: OngProjeto;
    doacao_credito: OngCarteira;
    recurso: OngRecurso;
    entrega: OngProjetoEntrega;
    constructor(obj?: any);
}
export declare class OngProjeto extends api.Tastypie.Model<OngProjeto> {
    static resource: api.Tastypie.Resource<OngProjeto>;
    nome: string;
    descricao: string;
    img_capa: string;
    periodo_continuo: boolean;
    dt_inicio: string;
    dt_fim: string;
    ativo: boolean;
    inicializado: boolean;
    dt_updated: string;
    dt_created: string;
    private _endereco;
    private _metric;
    getSobre(): Promise<OngProjetoSobre>;
    constructor(obj?: any);
    readonly endereco: api.Tastypie.Resource<OngProjetoEndereco>;
    readonly metric: api.Tastypie.Resource<OngProjetoMetric>;
    get_metric_summary(): Promise<OngProjetoMetricSummary>;
}
export declare class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    static resource: api.Tastypie.Resource<OngProjetoSobre>;
    ong_projeto_id: number;
    problema: string;
    impacto: string;
    meta: string;
    como_alcacar_meta: string;
    como_medir_impacto: string;
    website: string;
    video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricSummary extends api.Tastypie.Model<OngProjetoMetricSummary> {
    static resource: api.Tastypie.Resource<OngProjetoMetricSummary>;
    categories: Array<MetricCategory>;
    ods: Array<Ods>;
    constructor(obj?: any);
}
export declare class OngProjetoEndereco extends api.Tastypie.Model<OngProjetoEndereco> {
    static resource: api.Tastypie.Resource<OngProjetoEndereco>;
    ong_projeto_id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    regiao: string;
    coordenadas: {
        lat: string;
        lng: string;
    };
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    static resource: api.Tastypie.Resource<OngProjetoOds>;
    ong_projeto_id: number;
    ods_id: number;
    ods: Ods;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricRegisterEvidence extends api.Tastypie.Model<OngProjetoMetricRegisterEvidence> {
    static resource: api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>;
    ong_projeto_metric_register_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricRegister extends api.Tastypie.Model<OngProjetoMetricRegister> {
    static resource: api.Tastypie.Resource<OngProjetoMetricRegister>;
    ong_projeto_metric_config_id: number;
    total: string;
    type: string;
    dt_register: string;
    dt_updated: string;
    dt_created: string;
    private _evidencies;
    constructor(obj?: any);
    readonly evidencies: api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>;
}
export declare class OngProjetoMetricConfig extends api.Tastypie.Model<OngProjetoMetricConfig> {
    static resource: api.Tastypie.Resource<OngProjetoMetricConfig>;
    ong_projeto_metric_id: number;
    ong_projeto_endereco_id: number;
    medicao: string;
    medicao_meta: string;
    medicao_frequencia: number;
    medicao_mes: Array<number>;
    metric_unit: MetricUnit;
    base_value: string;
    base_date: string;
    meta_value: string;
    meta_date: string;
    ong_projeto_endereco: OngProjetoEndereco;
    dt_updated: string;
    dt_created: string;
    private _registers;
    constructor(obj?: any);
    readonly register: api.Tastypie.Resource<OngProjetoMetricRegister>;
}
export declare class OngProjetoMetric extends api.Tastypie.Model<OngProjetoMetric> {
    static resource: api.Tastypie.Resource<OngProjetoMetric>;
    ong_projeto_id: number;
    metric_id: number;
    configured: boolean;
    dt_updated: string;
    dt_created: string;
    private _ong_projeto;
    private _metric;
    private _metric_config;
    constructor(obj?: any);
    readonly ong_projeto: OngProjeto;
    readonly metric: Metric;
    readonly metric_config: api.Tastypie.Resource<OngProjetoMetricConfig>;
}
export declare class OngStatus {
    qtde_pontos: number;
    qtde_doadores: number;
    qtde_avaliacao_positiva: number;
    total_credito: number;
    total_saldo: number;
    total_debito_comprovado: number;
    constructor(obj?: any);
}
export declare class OngOrigemCredito extends api.Tastypie.Model<OngOrigemCredito> {
    static resource: api.Tastypie.Resource<OngOrigemCredito>;
    id: number;
    nome: string;
    token: string;
    grupo: string;
    source_id: number;
    ong_id: number;
    constructor(obj?: any);
}
export declare class OngRecurso extends api.Tastypie.Model<OngRecurso> {
    static resource: api.Tastypie.Resource<OngRecurso>;
    ong_id: number;
    ong_projeto_id: number;
    destino: string;
    ativo: boolean;
    total_doacao: number;
    dt_aplicacao: string;
    dt_updated: string;
    dt_created: string;
    private _doacao;
    private _comprovante;
    constructor(obj?: any);
    readonly doacao: api.Tastypie.Resource<OngRecursoDoacao>;
    readonly comprovante: api.Tastypie.Resource<OngRecursoComprovante>;
}
export declare class OngRecursoDoacao extends api.Tastypie.Model<OngRecursoDoacao> {
    static resource: api.Tastypie.Resource<OngRecursoDoacao>;
    ong_recurso_id: number;
    origem_credito_id: number;
    origem_credito: OngOrigemCredito;
    moeda: string;
    valor: number;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngRecursoComprovante extends api.Tastypie.Model<OngRecursoComprovante> {
    static resource: api.Tastypie.Resource<OngRecursoComprovante>;
    ong_recurso_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngStatusCarteira extends api.Tastypie.Model<OngStatusCarteira> {
    static resource: api.Tastypie.Resource<OngStatusCarteira>;
    ong_id: number;
    origem_credito: OngOrigemCredito;
    total_credito: number;
    total_debito: number;
    total_debito_pendente: number;
    total_debito_comprovado: number;
    total_debito_nao_comprovado: number;
    saldo: number;
    saldo_pendente: number;
    constructor(obj?: any);
}
export declare class OngCarteiraTransferencia {
    banco_codigo: string;
    banco_nome: string;
    agencia: string;
    agencia_digito: string;
    conta_corrente: string;
    conta_corrente_digito: string;
    pessoa_fisica: boolean;
    titular: string;
    cpf_cnpj: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngCarteiraCreditoCustomComprovante extends api.Tastypie.Model<OngCarteiraCreditoCustomComprovante> {
    static resource: api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>;
    credito_custom_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngCarteiraCreditoCustom {
    id: number;
    ong_carteira_id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    carteira_debito_id: string;
    dt_created: string;
    private _comprovante;
    constructor(obj?: any);
    readonly comprovante: api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>;
}
export declare class OngCarteira extends api.Tastypie.Model<OngCarteira> {
    static resource: api.Tastypie.Resource<OngCarteira>;
    private static _creditar;
    private static _transferir;
    ong_id: number;
    origem_credito_id: number;
    origem_credito: OngOrigemCredito;
    credito: boolean;
    moeda: string;
    valor: number;
    status: string;
    transferencia: OngCarteiraTransferencia;
    credito_custom: OngCarteiraCreditoCustom;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
    static creditar(obj: {
        ong_id: number;
        origem_credito_id: number;
        valor: number;
        ong_banco_id: number;
    }): Promise<OngCarteira>;
    static transferir(obj: {
        ong_id: number;
        origem_credito_id: number;
        ong_banco_id: number;
        valor: number;
    }): Promise<OngCarteira>;
}
export declare class OngTimelineDoacao extends api.Tastypie.Model<OngTimelineDoacao> {
    static resource: api.Tastypie.Resource<OngTimelineDoacao>;
    ong_id: number;
    tipo: string;
    source_model_name: string;
    source_model_id: number;
    doacao_credito: OngCarteira;
    recurso: OngRecurso;
    projeto: OngProjeto;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoEntrega extends api.Tastypie.Model<OngProjetoEntrega> {
    static resource: api.Tastypie.Resource<OngProjetoEntrega>;
    ong_projeto_id: number;
    titulo: string;
    descricao: string;
    ativo: boolean;
    mt_pessoas: number;
    mt_animais: number;
    mt_arvores: number;
    mt_areas: number;
    mt_criancas: number;
    dt_entrega: string;
    dt_updated: string;
    dt_created: string;
    projeto: OngProjeto;
    private _endereco;
    private _comprovante;
    constructor(obj?: any);
    readonly endereco: api.Tastypie.Resource<OngProjetoEntregaEndereco>;
    readonly comprovante: api.Tastypie.Resource<OngProjetoEntregaComprovante>;
}
export declare class OngProjetoEntregaEndereco extends api.Tastypie.Model<OngProjetoEntregaEndereco> {
    static resource: api.Tastypie.Resource<OngProjetoEntregaEndereco>;
    projeto_entrega_id: number;
    projeto_endereco_id: number;
    endereco: OngProjetoEndereco;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoEntregaComprovante extends api.Tastypie.Model<OngProjetoEntregaComprovante> {
    static resource: api.Tastypie.Resource<OngProjetoEntregaComprovante>;
    projeto_entrega_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
