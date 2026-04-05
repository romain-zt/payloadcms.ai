export interface CMSToolsOptions {
  /** Collection slugs the AI can read */
  readableCollections?: string[]
  /** Collection slugs the AI can write to */
  writableCollections?: string[]
  /** Global slugs the AI can read */
  readableGlobals?: string[]
  /** Global slugs the AI can update */
  writableGlobals?: string[]
}
