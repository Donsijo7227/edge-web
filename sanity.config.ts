'use client'

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

// Custom structure override
import { myStructure } from './sanity/deskStructure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import type { SchemaTypeDefinition } from 'sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes as SchemaTypeDefinition[], 
  },
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
