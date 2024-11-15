import {
  Appointment,
  User,
  UserRoles,
} from '@appointment-app-hdm/api-interfaces';

/** apps/workshop-ui/src/app/appointments/opening-hours-validator.service.ts */
export const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

export function isTimeInInterval(
  time: string,
  start: string,
  end: string
): boolean {
  const allInCorrectFormat =
    timeRegExp.test(time) && timeRegExp.test(start) && timeRegExp.test(end);
  if (allInCorrectFormat === false) {
    return false;
  }

  return allInCorrectFormat && time >= start && time <= end;
}

export function validateUserPermissionsForAppointment(
  appointment: Appointment,
  user: User
) {
  return user.role === UserRoles.ADMIN || user.id === appointment.createdByUser;
}

export function validateUserPermissionsForBranch(user: User) {
  return user.role === UserRoles.ADMIN;
}