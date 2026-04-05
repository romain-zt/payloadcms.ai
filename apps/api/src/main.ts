import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'

async function bootstrap() {
  const required = ['API_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET']
  const missing = required.filter((k) => !process.env[k])
  if (missing.length > 0) {
    console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`)
    process.exit(1)
  }

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })
  app.enableCors()
  await app.listen(process.env.PORT ?? 3001)
  console.log(`API running on port ${process.env.PORT ?? 3001}`)
}
bootstrap()
