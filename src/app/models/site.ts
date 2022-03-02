export class Site {
    id: string;
    name: string;
    testType: string;
    status: string;
    uptime: number;
}

export class SiteDetails extends Site {
    doNotFind: boolean;
    servers: Server[];
    processing: boolean;
    timeout: number;
    lastTestedAt: string;
}

export class Server {
    description: string;
    region: string;
    regionCode: string;
    status: string;
    ipv4: string;
}
