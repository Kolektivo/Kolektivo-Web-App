import { SUPABASE_BUCKET } from '@/config/constants'
import FileUtils from '../files/fileUtils'
import { createClient } from './server'

const Bucket = {
  uploadFile: async (filePath: string, base64File: string) => {
    const supabaseClient = createClient()

    const fileBlob = await FileUtils.base64ImageSourceToBlob(base64File)
    const { data: dataUpload, error: errorUpload } = await supabaseClient.storage
      .from(SUPABASE_BUCKET)
      .upload(filePath, fileBlob, { upsert: true })

    if (errorUpload) {
      throw errorUpload
    } else {
      console.log('File uploaded successfully', dataUpload.id)
    }
  },
  downloadFile: async (filePath: string) => {
    if (filePath == '' || !filePath) return ''
    const supabaseClient = createClient()
    const { data, error } = await supabaseClient.storage.from(SUPABASE_BUCKET).download(filePath)

    if (error) {
      console.error('Error downloading file:', error.message)
    } else {
      const mimeType = filePath.endsWith('png') ? 'image/png' : 'image/jpeg'
      const base64 = await FileUtils.blobToImageSrc(data)
      const imageSource = `data:${mimeType};base64,${base64}`
      return imageSource
    }
  },
  deleteFile: async (filePath: string) => {
    if (filePath == '' || !filePath) return ''
    const supabaseClient = createClient()
    const { error } = await supabaseClient.storage.from(SUPABASE_BUCKET).remove([filePath])

    if (error) {
      throw error
    } else {
      console.log('File deleted successfully')
    }
  },
}

export default Bucket
