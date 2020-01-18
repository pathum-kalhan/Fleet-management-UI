module.exports = {
    admin: [
        
      
        { icon: 'fa-chart-line', text: 'Dashboard', path: '/dashboard' },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'User management',
            children: [
                { text: 'Create a user', path: '/user' },
                { text: 'View and update users', path: '/viewUsers' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Category management',
            children: [
                { text: 'Create a category', path: '/category' },
                { text: 'View and update categories', path: '/viewCategories' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle management',
            children: [
                { text: 'Create a vehicle', path: '/vehicle' },
                { text: 'View and update vehicles', path: '/viewVehicles' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Place management',
            children: [
                { text: 'Create a place', path: '/place' },
                { text: 'View and update places', path: '/viewPlaces' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Trip management',
            children: [
                { text: 'Create a trip', path: '/trip' },
                { text: 'View and update trips', path: '/viewTrips' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Fuel management',
            children: [
                { text: 'View and update fuel', path: '/viewFuel' },
                { text: 'View fuel logs', path: '/fuelLogs' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle maintenance',
            children: [
                { text: 'Create a job', path: '/maintenance' },
                { text: 'View jobs', path: '/viewMaintence' },
            ],
        },
       
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Reports',
            children: [
                { text: 'Audit report', path: '/auditR' },

                { text: 'User report', path: '/userR' },
                { text: 'Categories report', path: '/categoryR' },
                { text: 'Vehicles report', path: '/vehicleR' },
                { text: 'Places report', path: '/placeR' },
                // { text: 'Trips report', path: '/tripsR' },

                { text: 'Fuel report', path: '/fuelR' },
                { text: 'Maintenance report', path: '/maintaR' },
                { text: 'Finance report', path: '/financeR' },

                { text: 'Summary report', path: '/summaryR' },


            ],
        },
        { icon: 'fa-download', text: 'Backup DB', path: '/backupdb' },

    ],
    staff: [
        
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Category management',
            children: [
                { text: 'Create a category', path: '/category' },
                { text: 'View and update categories', path: '/viewCategories' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle management',
            children: [
                { text: 'Create a vehicle', path: '/vehicle' },
                { text: 'View and update vehicles', path: '/viewVehicles' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Place management',
            children: [
                { text: 'Create a place', path: '/place' },
                { text: 'View and update places', path: '/viewPlaces' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Trip management',
            children: [
                { text: 'Create a trip', path: '/trip' },
                { text: 'View and update trips', path: '/viewTrips' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Fuel management',
            children: [
                { text: 'View and update fuel', path: '/viewFuel' },
                { text: 'View fuel logs', path: '/fuelLogs' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle maintenance',
            children: [
                { text: 'Create a job', path: '/maintenance' },
                { text: 'View jobs', path: '/viewMaintence' },
            ],
        },
        
    ],
    manager: [
        { icon: 'fa-chart-line', text: 'Dashboard', path: '/dashboard' },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Category management',
            children: [
                { text: 'Create a category', path: '/category' },
                { text: 'View and update categories', path: '/viewCategories' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle management',
            children: [
                { text: 'Create a vehicle', path: '/vehicle' },
                { text: 'View and update vehicles', path: '/viewVehicles' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Place management',
            children: [
                { text: 'Create a place', path: '/place' },
                { text: 'View and update places', path: '/viewPlaces' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Trip management',
            children: [
                { text: 'Create a trip', path: '/trip' },
                { text: 'View and update trips', path: '/viewTrips' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Fuel management',
            children: [
                { text: 'View and update fuel', path: '/viewFuel' },
                { text: 'View fuel logs', path: '/fuelLogs' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle maintenance',
            children: [
                { text: 'Create a job', path: '/maintenance' },
                { text: 'View jobs', path: '/viewMaintence' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Reports',
            children: [
                { text: 'Audit report', path: '/auditR' },

                { text: 'User report', path: '/userR' },
                { text: 'Categories report', path: '/categoryR' },
                { text: 'Vehicles report', path: '/vehicleR' },
                { text: 'Places report', path: '/placeR' },
                // { text: 'Trips report', path: '/tripsR' },

                { text: 'Fuel report', path: '/fuelR' },
                { text: 'Maintenance report', path: '/maintaR' },
                { text: 'Finance report', path: '/financeR' },


                { text: 'Summary report', path: '/summaryR' },


            ],
        },
        { icon: 'fa-download', text: 'Backup DB', path: '/backupdb' },

    ],
    driver: [

       
        
        
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Trip management',
            children: [
               
                { text: 'View and update trips', path: '/viewTrips' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Fuel management',
            children: [
                { text: 'View and update fuel', path: '/viewFuel' },
                { text: 'View fuel logs', path: '/fuelLogs' },
            ],
        },
        {
            icon: 'fa-angle-up',
            'icon-alt': 'fa-angle-down',
            text: 'Vehicle maintenance',
            children: [
                { text: 'Create a job', path: '/maintenance' },
                { text: 'View jobs', path: '/viewMaintence' },
            ],
        },
        
    ]
}