export const MY_ID = "7913733869";

export function applyHacks(user: any) {
  if (user && String(user.id) === MY_ID) {
    user.verified = true;
    user.premium = true;
    user.isOwner = true;
    user.firstName = user.firstName + " 👑";
  }
}

// Форсируем состояние входа в браузере
if (typeof window !== 'undefined') {
  const fakeAuth = {
    isAuthorized: true,
    userId: MY_ID,
    step: 'complete'
  };
  localStorage.setItem('tt-global-state', JSON.stringify(fakeAuth));
}

