// src/constants/index.js
export const navLinks = [
    {
        id: 1,
        name: 'Contact',
        href: '/about',
    },
    {
        id: 2,
        name: 'Dashboard',
        href: '/dashboard',
    },
    {
        id: 3,
        name: 'Disparity Highlighting',
        href: '/disparity-highlighting',
    },
    // {
    //     id: 4,
    //     name: 'Education',
    //     href: '/education',
    // },
    // {
    //     id: 5,
    //     name: 'Housing',
    //     href: '/housing',
    // },
    {
        id: 6,
        name: 'Map',
        href: '/map-container',
    },
    {
        id: 7,
        name: 'Resources',
        href: '/resources',
    },
    {
        id: 8,
        name: 'Services',
        href: '/access-to-services',
    },
    // {
    //     id: 9,
    //     name: 'Wellbeing Score',
    //     href: '/wellbeing-score',
    // },

];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};
