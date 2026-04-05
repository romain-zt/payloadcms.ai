import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey: string

  constructor() {
    const key = process.env.API_KEY
    if (!key) {
      throw new Error('API_KEY environment variable is required but not set')
    }
    this.apiKey = key
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>()
    const provided = req.headers['x-api-key']

    if (!provided || provided !== this.apiKey) {
      throw new UnauthorizedException('Invalid or missing API key')
    }

    return true
  }
}
