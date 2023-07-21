export const pages = {
  dashboard: 'dashboard',
  login: 'login',
  logout: 'logout',
  profile: 'profile',
  extensions: 'extensions',
  alerts: 'alerts',
  settings: 'settings',
  support: 'support',
  academy: 'academy',
  chatweb3: 'chatweb3',
} as const;

export type PageView = keyof typeof pages;
