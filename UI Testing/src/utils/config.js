const CONFIG = {
    BASE_URL: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    CREDENTIALS: {
        ADMIN: {
            USERNAME: 'Admin',
            PASSWORD: 'admin123'
        }
    },
    TIMEOUTS: {
        IMPLICIT_WAIT: 90000,
        EXPLICIT_WAIT: 10000,
        PAGE_LOAD: 30000
    },
    ROUTES: {
        ADMIN: 'admin/viewSystemUsers',
        PIM: 'pim/viewEmployeeList',
        LEAVE: 'leave/viewLeaveList',
        MY_INFO: 'pim/viewPersonalDetails',
        DIRECTORY: 'directory/viewDirectory'
    }
};

module.exports = CONFIG;