import { Module } from '@nestjs/common'
import { BillingController } from '../controllers/billing.controller'
import { CheckoutService } from '../../application/checkout.service'

@Module({
  controllers: [BillingController],
  providers: [CheckoutService],
})
export class BillingModule {}
