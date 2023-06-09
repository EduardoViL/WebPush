console.log('Service worker');

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log(data)
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://www.derechoshumanosgto.org.mx/Recursos/logo_nuevo.png'
    })
})