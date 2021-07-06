export const toCamelCase = <T>(obj: Record<string, string>): T => {
  const newObj: Record<string, string> = {};
  for (const d in obj) {
    if (typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, d)) {
      newObj[d.replace(/(_\w)/g, (k) => k[1].toUpperCase())] = obj[d];
    }
  }
  return newObj as unknown as T;
};

// export function serializeNotification(payload: NotificationResponse[] = []): Notification[] {
//   return payload.map((item) => toCamelCase(item as unknown as Record<string, string>));
// }

// export function serializeNetworkNotification(payload: NetworkNotificationResponse[] = []): NetworkNotification[] {
//   return payload.map((item) => toCamelCase(item as unknown as Record<string, string>));
// }
