export class StatisticVm {
    navigation: Navigation;
    periods: Period[];
    data: DataItem[];
}

export class DataItem {
    up: number;
    down: number;
    unknown: number;
    label: string;
}

export class Period {
    name: string;
    current: boolean;
    url: string;
}

export class Navigation {
    current: Link;
    next: Link;
    prev: Link;
}

export class Link {
    name: string;
    url: string;
}

export enum PeriodType {
    Hour,
    Day,
    Week,
    Month
}