const FileUtils = {
  base64ImageSourceToBlob: async (base64imageSource: string): Promise<Blob> => {
    const response = await fetch(base64imageSource)
    return await response.blob()
  },
  blobToImageSrc: async (blob: Blob): Promise<string> => {
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString('base64')
  },
  getFileExtensionFromBase64: (base64String: string) => {
    const matches = base64String.match(/^data:(.*);base64,/)

    if (matches && matches.length > 1) {
      const mimeType = matches[1]
      return mimeType.split('/')[1]
    }

    return null
  },
}

export default FileUtils
