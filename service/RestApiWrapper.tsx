/**
 * REST API Wrapper
 * A common utility for making API calls without repeating the base URL
 *
 * Usage:
 * import api from '@/service/RestApiWrapper';
 *
 * // GET request
 * const data = await api.get('/users');
 *
 * // POST request
 * const result = await api.post('/users', { name: 'John' });
 *
 * // PUT request
 * const updated = await api.put('/users/1', { name: 'Jane' });
 *
 * // DELETE request
 * await api.delete('/users/1');
 */

// Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://www.mass-care-agency.dev5.intersmarthosting.in/api";

// Types
interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class RestApiWrapper {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Set default headers
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseURL}${
          endpoint.startsWith("/") ? endpoint : `/${endpoint}`
        }`;

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      return `${url}?${searchParams.toString()}`;
    }

    return url;
  }

  /**
   * Merge headers with defaults
   */
  private mergeHeaders(
    customHeaders?: Record<string, string>
  ): Record<string, string> {
    const headers: Record<string, string> = { ...this.defaultHeaders };

    // Override with custom headers
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

    return headers;
  }

  /**
   * Handle response and errors
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let apiResponse: ApiResponse<T>;
    try {
      if (isJson) {
        apiResponse = await response.json();
      } else {
        const text = await response.text();
        apiResponse = {
          status: response.status,
          message: response.statusText,
          data: text as T,
        };
      }
    } catch (error) {
      apiResponse = {
        status: response.status,
        message: response.statusText,
        data: {} as T,
      };
    }

    if (!response.ok) {
      throw new ApiError(
        apiResponse.message || `API Error: ${response.statusText}`,
        apiResponse.status,
        apiResponse.data
      );
    }

    return apiResponse;
  }

  /**
   * Generic request method
   */
  private async request<T>(
    endpoint: string,
    method: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, options.params);
    const headers = this.mergeHeaders(options.headers);

    // Remove Content-Type for FormData (browser will set it automatically)
    const isFormData = body instanceof FormData;
    if (isFormData) {
      delete headers["Content-Type"];
    }

    const config: RequestInit = {
      method,
      headers,
      signal: options.signal,
      redirect: "follow",
    };

    if (body && !isFormData) {
      config.body = JSON.stringify(body);
    } else if (body && isFormData) {
      config.body = body;
    }

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error occurred",
        0,
        "Network Error"
      );
    }
  }

  /**
   * GET request
   */
  async get<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "GET", undefined, options);
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "POST", body, options);
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PUT", body, options);
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    body?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PATCH", body, options);
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "DELETE", undefined, options);
  }

  /**
   * Upload file(s)
   */
  async upload<T = any>(
    endpoint: string,
    formData: FormData,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.post<T>(endpoint, formData, options);
  }
}

// Create and export a singleton instance
const restApiWrapper = new RestApiWrapper();

export default restApiWrapper;
export { RestApiWrapper, ApiError };
export type { ApiResponse, RequestOptions };
