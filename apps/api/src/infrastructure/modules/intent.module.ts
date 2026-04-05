import { Module } from '@nestjs/common'
import { IntentController } from '../controllers/intent.controller'
import { IntentService } from '../../application/intent.service'
import { IntentParserService } from '../../application/intent-parser.service'
import { ApiKeyGuard } from '../guards/api-key.guard'

@Module({
  controllers: [IntentController],
  providers: [IntentService, IntentParserService, ApiKeyGuard],
})
export class IntentModule {}
