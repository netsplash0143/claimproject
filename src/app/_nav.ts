const assessornavItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Edit Profile',
    url: '/assessor/profile',
    icon: 'icon-note'
  },
  {
    name: 'Active claim request',
    url: '/assessor/activeclaims',
    icon: 'icon-cursor'
  },
  {
    name: 'Claim request History',
    url: '/assessor/old-claim-list',
    icon: 'icon-badge'
  },
  {
    name:'Work Location',
    url:'/assessor/work-location',
    icon:'icon-target'
  },
  {
    divider: true
  }
];

//Garage role navigation
const garagenavItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Edit Profile',
    url: '/garage/profile',
    icon: 'icon-note'
  },
  {
    name: 'New Claim Offers',
    url: '/garage/new-offer-list',
    icon: 'icon-envelope-letter'
  },
  {
    name: 'Offers History',
    url: '/garage/old-offer-list',
    icon: 'icon-social-dropbox'
  },
  {
    divider: true
  }
];

//Admin role navigation
const adminnavItems = [
  {
    name: 'Dashboard',
    url: '/admin-dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Active Claim List',
    url: '/admin-dashboard/active-list',
    icon: 'icon-energy'
  },
  {
    name: 'New Claim',
    url: '/admin-dashboard/new-claim',
    icon: 'icon-plus'
  },
  {
    name: 'Claim History',
    url: '/admin-dashboard/history-list',
    icon: 'icon-book-open'
  },
  {
    name: 'Insurance Company',
    url: '/admin-dashboard/insurance-coy',
    icon: 'icon-globe'
  },
  {
    name: 'Assessor',
    url: '/admin-dashboard/assessors',
    icon: 'icon-user-following'
  },
  {
    name: 'Garage',
    url: '/admin-dashboard/garage',
    icon: 'icon-home'
  },
  {
    divider: true
  }
];


//insurance-coy role navigation
const insurancenavItems = [
  {
    name: 'Dashboard',
    url: '/insurance-dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Active Claim List',
    url: '/insurance-dashboard/active-list',
    icon: 'icon-energy'
  },
  {
    name: 'Claim History',
    url: '/insurance-dashboard/history-list',
    icon: 'icon-book-open'
  },
  {
    divider: true
  }
];


export {
  assessornavItems, garagenavItems, adminnavItems,insurancenavItems
}