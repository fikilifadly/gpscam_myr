export interface UseLocation {
  hasSensorPermission: boolean;
  hasLocationPermission: boolean;
  isCheckingLocation: boolean;
  requestLocationPermissions: () => Promise<boolean>
};
