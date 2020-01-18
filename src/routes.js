import welcome from './components/common/welcome.vue';
import dashboard from './components/dashboard.vue';
import user from './components/user/user.vue';
import viewUsers from './components/user/viewUsers.vue';
import category from './components/category/category.vue';
import viewCategories from './components/category/viewCategories.vue';
import vehicle from './components/vehicle/vehicle.vue';
import viewVehicles from './components/vehicle/viewVehicles.vue';
import places from './components/place/place.vue';
import viewPlaces from './components/place/viewPlaces.vue';
import trip from './components/trip/trip.vue';
import viewTrips from './components/trip/viewTrips.vue';
import viewFuel from './components/fuel/viewFuel.vue';
import fuelLogs from './components/fuel/fuelLogs.vue';
import maintenance from './components/maintenance/maintenance.vue';
import viewMaintenance from './components/maintenance/viewMaintenance.vue';
import resetPassword from './components/common/resetPassword.vue'

// reports
import categoryReport from './components/reports/categoryR.vue';
import userR from './components/reports/userR.vue';
import auditR from './components/reports/auditR.vue';
import vehicleR from './components/reports/vehicleR.vue';
import placeR from './components/reports/placeR.vue';
import fuelR from './components/reports/fuelR.vue'
import maintaR from './components/reports/maintaR.vue'
import financeR from './components/reports/financeR.vue'
import summaryR from './components/reports/summaryR.vue'
import tripR from './components/reports/tripR.vue'

import backupDb from './components/backupDb.vue'
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcome,

  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    
    meta: { permissions: ['admin', 'manager'],},
    
  }, {
    path: '/user',
    component: user,
    
    meta: { permissions: ['admin'],}
  },
  {
    path: '/viewUsers',
    component: viewUsers,
    meta: { permissions: ['admin'],}

  },
  {
    path: '/category',
    component: category,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  },
  {
    path: '/viewCategories',
    component: viewCategories,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/vehicle',
    component: vehicle,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/viewVehicles',
    component: viewVehicles,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/place',
    component: places,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/viewPlaces',
    component: viewPlaces,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/trip',
    component: trip,
    meta: { permissions: ['admin', 'staff', 'manager'],}

  }, {
    path: '/viewTrips',
    component: viewTrips,
    meta: { permissions: ['admin', 'staff', 'manager', 'driver'],}

  }, {
    path: '/viewFuel',
    component: viewFuel,
    meta: {
      permissions: ['admin', 'staff', 'manager', 'driver'],
}
  }, {
    path: '/fuelLogs',
    component: fuelLogs,
    meta: {
      permissions: ['admin', 'staff', 'manager', 'driver'],
}
  }, {
    path: '/maintenance',
    component: maintenance,
    meta: { permissions: ['admin', 'staff', 'manager', 'driver'],}

  }, {
    path: '/viewMaintence',
    component: viewMaintenance,
    meta: { permissions: ['admin', 'staff', 'manager', 'driver'],}

  },
  {
    path: '/categoryR',
    component: categoryReport,
    meta: {
      permissions: ['admin', 'manager'],
  
}
  },
  {
    path: '/userR',
    component: userR,
    meta: {
      permissions: ['admin', 'manager'],
  
}
  }, {
    path: '/auditR',
    component: auditR,
    meta: {
      permissions: ['admin', 'manager'],
  
}
  }, {
    path: '/vehicleR',
    component: vehicleR,
    meta: {
      permissions: ['admin', 'manager'],
  
}
  }, {
    path: '/placeR',
    component: placeR,
    meta: {
      permissions: ['admin', 'manager'],
  
}
  },
  {
    path: '/resetPassword',
    component: resetPassword,
    meta: { permissions: ['admin', 'staff', 'manager', 'driver'], }

  },
  {
    path: '/fuelR',
    component: fuelR,
    meta: {
      permissions: ['admin', 'manager'],

    }
  }, {
    path: '/maintaR',
    component: maintaR,
    meta: {
      permissions: ['admin', 'manager'],

    }

  },
  {
    path: '/financeR',
    component: financeR,
    meta: {
      permissions: ['admin', 'manager'],

    }

  },
  {
    path: '/summaryR',
    component: summaryR,
    meta: {
      permissions: ['admin', 'manager'],

    }

  },
  
   {
    path: '/backupdb',
    name: 'backup',
     component: backupDb,

   

  },
  {
    path: '/tripsR',
    name: 'tripsR',
    component: tripR,



  },
  
  
  

];

export default routes;
