import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = "bharuupinky@gmail.com";
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (user) {
    console.log("USER FOUND:", user.email);
    console.log("Has password?", !!user.password);
    console.log("2FA enabled?", user.twoFactorEnabled);
  } else {
    console.log("USER NOT FOUND IN DB!");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
