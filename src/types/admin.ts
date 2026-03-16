export interface AdminSession {
  isAuthenticated: true;
  loginAt: string;
  expiresAt: string;
}

export interface AdminSettings {
  menuSeeded: boolean;
  eventsSeeded: boolean;
  gallerySeeded: boolean;
  lastUpdated: string;
}
