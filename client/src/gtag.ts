declare var gtag: any;

const id = "UA-102964622-1";

export function pageview(params: any) {
    gtag('config', 'UA-102964622-1', params);
}

export function event(action: any, category: any, label: any, value: any) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
}