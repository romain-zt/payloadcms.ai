import { Controller, Post, Body, Headers, RawBodyRequest, Req } from '@nestjs/common'
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
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string
  ) {
    const rawBody = req.rawBody
    if (!rawBody) {
      return { received: false, error: 'Missing raw body' }
    }
    await this.checkoutService.handleWebhook(rawBody, signature)
    return { received: true }
  }
}
