import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./modules/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./modules/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'events/category/:category',
    loadComponent: () => import('./pages/events/event-list/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'events/:category',
    redirectTo: 'events/category/:category'
  },
  {
    path: 'events/details/:id',
    loadComponent: () => import('./pages/events/event-details/event-details.component').then(m => m.EventDetailsComponent)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/user/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./modules/user/bookings/bookings.component').then(m => m.BookingsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/user/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'ticket/:id',
        loadComponent: () => import('./modules/user/ticket/ticket.component').then(m => m.TicketComponent)
      },
      {
        path: 'ticket',
        loadComponent: () => import('./modules/user/ticket/ticket.component').then(m => m.TicketComponent)
      }
    ]
  },
  {
    path: 'booking',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'seats/:showId',
        loadComponent: () => import('./modules/booking-flow/seats/seats.component').then(m => m.SeatsComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./modules/booking-flow/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'payment',
        loadComponent: () => import('./modules/booking-flow/payment/payment.component').then(m => m.PaymentComponent)
      },
      {
        path: 'success',
        loadComponent: () => import('./modules/booking-flow/success/success.component').then(m => m.SuccessComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'create-event',
        loadComponent: () => import('./modules/admin/create-event/create-event.component').then(m => m.CreateEventComponent)
      },
      {
        path: 'manage-venues',
        loadComponent: () => import('./modules/admin/manage-venues/manage-venues.component').then(m => m.ManageVenuesComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./modules/admin/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'add-venue',
        loadComponent: () => import('./modules/admin/add-venue/add-venue.component').then(m => m.AddVenueComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
