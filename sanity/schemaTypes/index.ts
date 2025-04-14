// sanity/schemaTypes/index.ts
import category from './category'
import event from './event'
import photo from './photo'
import project from './project'
import recognition from './recognition'
import memberResource from './memberResource'
import bursary from './bursary'
import applicationSteps from './applicationSteps'
import importantDate from './importantDate'
import bursaryDocument from './bursaryDocument'
import seo from './objects/seo'
import textSection from './objects/textSection'
import imageGallerySection from './objects/imageGallerySection'
import page from './documents/page'

export const schemaTypes = [
  category, 
  photo,
  event,
  project,
  recognition,
  memberResource,
  bursary,
  applicationSteps,
  importantDate,
  bursaryDocument,
  page,
  seo,
  textSection,
  imageGallerySection,
]