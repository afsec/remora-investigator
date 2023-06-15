export interface EventRequest {
    request_id: string;
    request_time: string;
    method: string;
    url: string;
    http_protocol: string;
    response_time: string;
    status_code: number;
    response_url: string;
    mime_type: string;
    rtt?: string;
}