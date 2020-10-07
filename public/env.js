(function (window) {
    if (window) {
        window.__env = window.__env || {};
        window.__env.beUrl = 'http://' + process.env.REACT_APP_SERVER_IP + '/backend-admin';
        window.__env.baseDomain = 'http://' + process.env.REACT_APP_SERVER_IP;
        window.__env.enableDebug = true;
        window.__env.refreshTokenTime = 5; //minutes
        window.__env.appArr = [
            {
                id: 1,
                name: `Admin`,
                nameAlt: `User Administration`,
                display: false,
                subDomain:"user-administration",
                feUrl: '',
                bgImgUrl: "/admin.png"
            },            
            {
                id: 2,
                name: `booking`,
                nameAlt: `Booking`,
                display: false,
                subDomain:"booking",
                feUrl: '',
                bgImgUrl: "/booking.png"
            },
            {
                id: 3,
                name: `pos`,
                nameAlt: `POS`,
                display: false,
                subDomain:"pos",
                feUrl: '',
                bgImgUrl: "/pos.png"
            }

        ];
    }
}(this));