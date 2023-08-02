import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function CreateLiteURL(url, sURL="http://localhost:3000/bruh") {
  const urlRecord = await prisma.liteUrl.create({
    data: {
      originalUrl: url,
      shortUrl: sURL
    }
  })
}

CreateLiteURL()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })