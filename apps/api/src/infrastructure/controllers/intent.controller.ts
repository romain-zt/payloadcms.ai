import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import type { Response } from 'express'
import type { ActionResult } from '@payloadcms-ai/core'
import { IntentService } from '../../application/intent.service'
import { IntentParserService } from '../../application/intent-parser.service'
import { ApiKeyGuard } from '../guards/api-key.guard'

@Controller('intent')
@UseGuards(ApiKeyGuard)
export class IntentController {
  constructor(
    private readonly intentService: IntentService,
    private readonly parserService: IntentParserService,
  ) {}

  @Post()
  async processMessage(
    @Body() body: { message?: string },
  ): Promise<ActionResult & { intent?: unknown }> {
    if (!body.message || typeof body.message !== 'string') {
      throw new BadRequestException('Field "message" is required and must be a string')
    }

    const result = await this.parserService.parse(body.message)

    if (!result.success) {
      return { success: false, error: result.error }
    }

    const actionResult = await this.intentService.process(result.intent)
    return { ...actionResult, intent: result.intent }
  }

  @Post('stream')
  async streamMessage(
    @Body() body: { message?: string },
    @Res() res: Response,
  ): Promise<void> {
    if (!body.message || typeof body.message !== 'string') {
      res.status(400).json({ error: 'Field "message" is required and must be a string' })
      return
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    const sendEvent = (data: unknown) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    try {
      sendEvent({ type: 'status', message: 'Parsing intent...' })

      const parsed = await this.parserService.parse(body.message)
      if (!parsed.success) {
        sendEvent({ type: 'error', error: parsed.error })
        res.end()
        return
      }

      sendEvent({ type: 'intent', intent: parsed.intent })
      sendEvent({ type: 'status', message: 'Executing...' })

      const result = await this.intentService.process(parsed.intent)
      sendEvent({ type: 'result', ...result })
    } catch (err) {
      sendEvent({ type: 'error', error: 'Internal server error' })
    } finally {
      res.end()
    }
  }
}
