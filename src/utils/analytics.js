import { init, track } from '@plausible-analytics/tracker'

// Initialize Plausible with auto pageviews
init({
  domain: 'kids-visual-schedule-builder.vercel.app',
})

// Track custom events: trackEvent('Routine Saved', { template: 'morning' })
export const trackEvent = (eventName, props = {}) => {
  track(eventName, { props })
}
