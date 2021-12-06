import express from 'express';
import { getUserData } from '@dni-connectors/onelogin';
import { DniProfile } from '../config/auth-data';

export const roleAuth = (roles: string[] | string): express.Handler =>
  (req, res, next) => {
    const rolesToCheck = Array.isArray(roles) ? roles : roles.split(',');
    const dniRoles = getUserData<DniProfile>(res)?.roles || [];

    const hasRequiredRole = rolesToCheck.length > 0
      ? rolesToCheck.some(role => dniRoles.length > 0 ? dniRoles.includes(role) : false)
      : true;

    if (hasRequiredRole) {
      next();
    } else {
      res.status(403).json({ 
        error: 'access_denied',
        details: 'Access forbidden'
      }).send();
    }
  };
