export class Site {
    id: string;
    name: string;
    testType: string;
    websiteUrl: string;
    status: string;
    uptime: string;
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
    status: string;
    ipv4: string;
}
