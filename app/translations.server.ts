import {prisma} from './db.server';


export async function getTranslations(shopId: string, locale: string) {
  return prisma.translation.findMany({
    where: {
      shopId,
      locale,
    },
  });
}

export async function updateTranslation(
  shopId: string,
  key: string,
  locale: string,
  value: string
) {
  return prisma.translation.upsert({
    where: {
      shopId_key_locale: {
        shopId,
        key,
        locale,
      },
    },
    update: { value },
    create: {
      shopId,
      key,
      locale,
      value,
    },
  });
}
