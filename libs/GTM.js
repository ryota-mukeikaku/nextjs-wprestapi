export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// type Pageview = (url: string) => void;

// type Event = {
//     action?: string;
//     category?: string;
//     label?: string | number | boolean;
//     value?: string;
// };

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GTM_ID, {
        page_path: url
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
    })
}
