import { type Block } from 'notion-types'
import { defaultMapImageUrl } from 'notion-utils'

import { defaultPageCover, defaultPageIcon } from './config'

export const mapImageUrl = (url: string | undefined, block: Block) => {
  if (url === defaultPageCover || url === defaultPageIcon) {
    return url
  }

  url = defaultMapImageUrl(url, block)

  // Optimize Notion image URLs with query parameters
  if (url && url.includes('notion.so')) {
    const urlObj = new URL(url)
    
    // Add optimization parameters for Notion images
    if (!urlObj.searchParams.has('table')) {
      urlObj.searchParams.set('table', 'block')
    }
    if (!urlObj.searchParams.has('id')) {
      urlObj.searchParams.set('id', block.id)
    }
    // Add cache busting with short expiry
    if (!urlObj.searchParams.has('cache')) {
      urlObj.searchParams.set('cache', 'v2')
    }
    
    return urlObj.toString()
  }

  // Optimize Unsplash images
  if (url && url.includes('images.unsplash.com')) {
    const urlObj = new URL(url)
    // Add width and quality parameters
    if (!urlObj.searchParams.has('w')) {
      urlObj.searchParams.set('w', '1200')
    }
    if (!urlObj.searchParams.has('q')) {
      urlObj.searchParams.set('q', '80')
    }
    if (!urlObj.searchParams.has('fit')) {
      urlObj.searchParams.set('fit', 'max')
    }
    return urlObj.toString()
  }

  return url
}
