export const ADMIN_ID = "ID_ИЗ_БОТА";

export function patchUser(user: any) {
  if (user && String(user.id) === ADMIN_ID) {
    user.verified = true;
    user.premium = true;
    user.flags2 = (user.flags2 || 0) | 512;
  }
}

// @ts-ignore
window.patchUser = patchUser;

