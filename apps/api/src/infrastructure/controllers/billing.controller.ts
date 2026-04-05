import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common'
import type { Request } from 'express'
import { CheckoutService } from '../../application/checkout.service'

@Controller('billing')
export class BillingController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  async createCheckout(@Body() body: { email?: string }) {
    return this.checkoutService.createSession(body)
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody
    if (!rawBody) {
      throw new BadRequestException('Missing raw body')
    }
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header')
    }

    try {
      await this.checkoutService.handleWebhook(rawBody, signature)
      return { received: true }
    } catch (err) {
      throw new BadRequestException(
        `Webhook signature verification failed: ${(err as Error).message}`,
      )
    }
  }
}
