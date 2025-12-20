import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class TmdbClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    const baseURL = this.configService.get<string>("TMDB_BASE_URL");
    this.apiKey = this.configService.get<string>("TMDB_API_KEY")!;

    if (!this.apiKey) {
      throw new Error("TMDB_API_KEY is not configured");
    }

    this.client = axios.create({
      baseURL,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error instanceof Error) {
          throw new Error(`TMDB API error: ${error.message}`);
        }
        const tmdbError = error as { status_message?: string };
        throw new Error(
          `TMDB API error: ${tmdbError.status_message ?? "Unknown error"}`,
        );
      }
      throw error;
    }
  }
}
