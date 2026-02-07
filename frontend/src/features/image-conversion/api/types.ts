export interface UploadResponse {
    file_id: string;
    filename: string;
    size: number;
    content_type: string;
}

export interface ConvertRequest {
    file_id: string;
    target_format: string;
}

export interface ConvertResponse {
    download_url: string;
    file_id: string;
    format: string;
}

export interface ApiError {
    detail: string;
}
