import dotcmsApi from '../../dotcmsApi';
import { printError } from './index';

export const getToken = ({ user, password, expirationDays, host }) => {
    return dotcmsApi.auth
        .getToken({ user, password, expirationDays, host })
        .then(res => res)
        .catch(err => {
            if (err.status === 400 || err.status === 401) {
                console.log('\n');
                printError(err.message);
                return;
            }
            throw err;
        });
};
