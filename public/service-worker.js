self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.routing.registerRoute(
  ({ url }) => url.href.includes('/rest/v1/prospects'),
  new workbox.strategies.NetworkFirst({ cacheName: 'prospects' })
)

workbox.routing.registerRoute(
  ({ url }) => url.origin.includes('googleapis.com') || url.origin.includes('gstatic.com'),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: 'map-tiles' })
)
