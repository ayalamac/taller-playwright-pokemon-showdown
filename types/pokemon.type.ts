export interface Pokemon {
    name   : string;
    item   : string;
    ability: string;
    moves  : Array<string>;
    evs    : EvsConfig;
}

export interface EvsConfig {
    healthPoints  : EvsProperty;
    attack        : EvsProperty;
    defense       : EvsProperty;
    specialAttack : EvsProperty;
    specialDefense: EvsProperty;
    speed         : EvsProperty;
}

export interface EvsProperty {
    id   : string;
    value: number;
}