import type { Gnb } from './nav.interface';

export const GNB_MENU: Gnb[] = [
    {
        id: 'gnb-basic',
        icon: 'pe-7s-rocket',
        label: 'Dashboard Example',
        to: '#/dashboards/basic',
        content: [],
    },
];

export const GNB_COMPONENTS: Gnb[] = [
    {
        id: 'gnb-components-elements',
        icon: 'pe-7s-diamond',
        label: 'Elements',
        to: null,
        content: [
            {
                id: 'lnb-elements-buttons',
                label: 'Standard Buttons',
                to: '#/elements/buttons-standard',
            },
            {
                id: 'lnb-elements-dropdowns',
                label: 'Dropdowns',
                to: '#/elements/dropdowns',
            },
            {
                id: 'lnb-elements-icons',
                label: 'Icons',
                to: '#/elements/icons',
            },
            {
                id: 'lnb-elements-badges',
                label: 'Badges',
                to: '#/elements/badges-labels',
            },
            {
                id: 'lnb-elements-cards',
                label: 'Cards',
                to: '#/elements/cards',
            },
            {
                id: 'lnb-elements-listgroup',
                label: 'List Groups',
                to: '#/elements/list-group',
            },
            {
                id: 'lnb-elements-navigation',
                label: 'Navigation Menus',
                to: '#/elements/navigation',
            },
            {
                id: 'lnb-elements-utilities',
                label: 'Utilities',
                to: '#/elements/utilities',
            },
        ],
    },
    {
        id: 'gnb-components-components',
        icon: 'pe-7s-car',
        label: 'Components',
        to: null,
        content: [
            {
                id: 'lnb-components-tabs',
                label: 'Tabs',
                to: '#/components/tabs',
            },
            {
                id: 'lnb-components-notifications',
                label: 'Notifications',
                to: '#/components/notifications',
            },
            {
                id: 'lnb-components-modals',
                label: 'Modals',
                to: '#/components/modals',
            },
            {
                id: 'lnb-components-progress',
                label: 'Progress Bar',
                to: '#/components/progress-bar',
            },
            {
                id: 'lnb-components-tooltips',
                label: 'Tooltips & Popovers',
                to: '#/components/tooltips-popovers',
            },
            {
                id: 'lnb-components-carousel',
                label: 'Carousel',
                to: '#/components/carousel',
            },
            {
                id: 'lnb-components-maps',
                label: 'Maps',
                to: '#/components/maps',
            },
        ],
    },
    {
        id: 'gnb-components-rtables',
        icon: 'pe-7s-display2',
        label: 'Regular Tables',
        to: '#/tables/regular-tables',
        content: [],
    },
];

export const GNB_WIDGETS: Gnb[] = [
    {
        id: 'gnb-widgets-dboxes',
        icon: 'pe-7s-graph2',
        label: 'Dashboard Boxes',
        to: '#/widgets/dashboard-boxes',
        content: [],
    },
];

export const GNB_FORMS: Gnb[] = [
    {
        id: 'gnb-forms-controls',
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '#/forms/controls',
        content: [],
    },
    {
        id: 'gnb-forms-layouts',
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '#/forms/layouts',
        content: [],
    },
    {
        id: 'gnb-forms-validation',
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '#/forms/validation',
        content: [],
    },
];

export const GNB_CHARTS: Gnb[] = [
    {
        id: 'gnb-charts-chartjs',
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '#/charts/chartjs',
        content: [],
    },
];
