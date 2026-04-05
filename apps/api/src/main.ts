import { NestFactory } from '@nestjs/core'
import { AppModule } from './infrastructure/app.module'

async function bootstrap() {
  if (!process.env.API_KEY) {
    console.error('FATAL: API_KEY environment variable is required but not set')
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
