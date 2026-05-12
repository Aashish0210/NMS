import prisma from './src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  const adminEmail = 'admin@nms.org'
  const adminPassword = 'admin123'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      fullName: 'System Administrator',
      passwordHash: hashedPassword,
      role: 'super_admin',
      status: 'approved',
      organizationPosition: 'Developer'
    }
  })

  console.log('--- Database Seeded ---')
  console.log(`Admin User: ${admin.email}`)
  console.log('-----------------------')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
