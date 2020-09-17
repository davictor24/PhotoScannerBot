import Tesseract from 'tesseract.js';

export default async function scanPhoto(photoUrl: string): Promise<string> {
  const data = await Tesseract.recognize(
    photoUrl,
    'eng',
    { logger: m => console.log(m) }
  );
  return data.data.text;
}