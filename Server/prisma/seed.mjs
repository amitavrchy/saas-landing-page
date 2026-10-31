import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@orbit.app';
  const adminPassword = process.env.ADMIN_PASSWORD || 'DemoAdminOrbit26!';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: 'Orbit Admin', role: Role.ADMIN },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Orbit Admin',
      role: Role.ADMIN,
    },
  });

  await prisma.organization.upsert({
    where: { slug: 'orbit-hq' },
    update: { name: 'Orbit HQ' },
    create: { name: 'Orbit HQ', slug: 'orbit-hq', plan: 'TEAM' },
  });

  const org = await prisma.organization.findUnique({ where: { slug: 'orbit-hq' } });
  if (org) {
    await prisma.membership.upsert({
      where: {
        userId_organizationId: { userId: admin.id, organizationId: org.id },
      },
      update: { role: 'owner' },
      create: { userId: admin.id, organizationId: org.id, role: 'owner' },
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-orbit' },
    update: {},
    create: {
      slug: 'welcome-to-orbit',
      title: 'Welcome to Orbit',
      excerpt: 'Ship product cycles without the spreadsheet chaos.',
      body: 'Orbit helps product teams plan, ship, and learn in one workspace.',
      authorName: 'Orbit Team',
      tags: ['product', 'launch'],
      publishedAt: new Date(),
    },
  });

  await prisma.changelogEntry.createMany({
    data: [
      {
        title: 'Public beta',
        body: 'Orbit Cycle Board and waitlist are live.',
        version: '0.1.0',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Seed complete: admin ${adminEmail} (password from ADMIN_PASSWORD / seed.mjs default)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });