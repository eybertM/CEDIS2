import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'prestamos',      loadChildren: () => import('../../prestamos/prestamos.module').then(m => m.PrestamosModule) },
    { path: 'documentos',     loadChildren: () => import('../../documentos/documentos.module').then(m => m.DocumentosModule) },
    { path: 'lectores',       loadChildren: () => import('../../lectores/lectores.module').then(m => m.LectoresModule) },
    { path: 'reportes',       loadChildren: () => import('../../reportes/reportes.module').then(m => m.ReportesModule) },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
