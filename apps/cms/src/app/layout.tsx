import '@payloadcms/next/css'

import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'
import configPromise from '@payload-config'
import { RootLayout as PayloadRootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './(payload)/admin/importMap.js'

export const metadata: Metadata = {
  title: 'payloadcms.ai — AI assistant for PayloadCMS',
  description: 'Add AI to your PayloadCMS admin in minutes.',
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadRootLayout>
  )
}
