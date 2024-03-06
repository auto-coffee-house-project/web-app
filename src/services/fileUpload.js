import { clearArrayExceptLast } from './helpers.js'

const getFileBlob = async file => {
  return await fetch(file.objectURL).then((response) => response.blob())
}


const parseBlobToBase64 = (blob, onFileParsedToBase64) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(blob)
  fileReader.onloadend = () => {
    onFileParsedToBase64(fileReader.result)
  }
}


export const createSingleFileUploader = onFileParsedToBase64 => {
  return async ({ files }) => {
    clearArrayExceptLast(files)
    const file = files[0]
    let blob = await getFileBlob(file)
    parseBlobToBase64(blob, onFileParsedToBase64)
  }
}
