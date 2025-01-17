import * as api from "ts-resource-tastypie";
export declare class Ods extends api.Tastypie.Model<Ods> {
    static resource: api.Tastypie.Resource<Ods>;
    tipo: string;
    nome: string;
    descricao: string;
    objetivo: string;
    fatos: string;
    metas: string;
    icone: string;
    cor: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class MetricStandard extends api.Tastypie.Model<MetricStandard> {
    static resource: api.Tastypie.Resource<MetricStandard>;
    name: string;
    token: string;
    slug: string;
    ong_id: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class MetricSubcategory {
    id: number;
    name: {
        'PT-BR': string;
        'EN-US': string;
    };
    slug: string;
    dt_created: string;
    dt_updated: string;
    metric_category_id: number;
    constructor(obj?: any);
}
export declare class MetricCategory extends api.Tastypie.Model<MetricCategory> {
    static resource: api.Tastypie.Resource<MetricCategory>;
    name: {
        'PT-BR': string;
        'EN-US': string;
    };
    slug: string;
    dt_created: string;
    dt_updated: string;
    subcategories: Array<MetricSubcategory>;
    constructor(obj?: any);
}
export declare class MetricUnit {
    id: number;
    name: {
        'PT-BR': string;
        'EN-US': string;
    };
    unit: string;
    slug: string;
    dt_created: string;
    dt_updated: string;
    metric_unit_group_id: number;
    constructor(obj?: any);
}
export declare class MetricUnitGroup extends api.Tastypie.Model<MetricUnitGroup> {
    static resource: api.Tastypie.Resource<MetricUnitGroup>;
    name: {
        'PT-BR': string;
        'EN-US': string;
    };
    slug: string;
    dt_created: string;
    dt_updated: string;
    units: Array<MetricUnit>;
    constructor(obj?: any);
}
export declare class MetricOds {
    id: number;
    metric: Metric;
    ods: Ods;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class Metric extends api.Tastypie.Model<Metric> {
    static resource: api.Tastypie.Resource<Metric>;
    name: {
        'PT-BR': string;
        'EN-US': string;
    };
    token: string;
    description: string;
    usage_guide: string;
    tag: string;
    order_group: number;
    ong_id: number;
    metric_type: {
        'PT-BR': string;
        'EN-US': string;
    };
    unit_edit: boolean;
    dt_created: string;
    dt_updated: string;
    private _metric_standard;
    private _metric_category;
    private _metric_subcategory;
    private _metric_unit_group;
    private _metric_unit;
    private _metric_ods;
    constructor(obj?: any);
    readonly standard: MetricStandard;
    readonly category: MetricCategory;
    readonly subcategory: MetricSubcategory;
    readonly unit_group: MetricUnitGroup;
    readonly unit: MetricUnit;
    readonly ods: Array<MetricOds>;
}
