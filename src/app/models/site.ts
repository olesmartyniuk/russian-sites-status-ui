export class Site {
    id: number;
    name: string;
    status: string;
    uptime: number;
}

export class SiteDetails extends Site {
    servers: Server[];
    lastTestedAt: string;
}

export class Server {
    region: string;
    regionCode: string;
    spentTimeInSec: number;
    status: string;
    statusCode: number;
}
