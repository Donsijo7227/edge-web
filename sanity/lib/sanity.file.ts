/**
 * Helper function to get the file URL from a Sanity file reference
 */
export function getFileUrl(ref: string): string {
    // Using the Sanity CDN URL pattern
    if (!ref) return '';
    
    // Extract the file ID from the reference
    const fileId = ref.replace('file-', '').replace('-pdf', '');
    
    // Construct the Sanity CDN URL
    return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.pdf`;
  }