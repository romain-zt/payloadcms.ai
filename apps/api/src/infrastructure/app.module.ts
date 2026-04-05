import { Module } from '@nestjs/common'
import { IntentModule } from './modules/intent.module'
import { BillingModule } from './modules/billing.module'
import { HealthController } from './controllers/health.controller'

@Module({
  imports: [IntentModule, BillingModule],
  controllers: [HealthController],
})
export class AppModule {}
