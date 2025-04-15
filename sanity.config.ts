'use client'

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

import { myStructure } from './sanity/deskStructure'
import { schemaTypes } from './sanity/schemaTypes'
import { StudioLayout } from './sanity/studioLayout' // 👈 Add this

import { apiVersion, dataset, projectId } from './sanity/env'
import type { SchemaTypeDefinition } from 'sanity'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  studio: {
    components: {
      layout: StudioLayout, // 👈 Register your layout override
    },
  },
  plugins: [
    structureTool({ structure: myStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
