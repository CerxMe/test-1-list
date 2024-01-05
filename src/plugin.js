const ctx_pref = 'lifehash-vue'

// const fakeResponse = new Response(_, {
//     headers: [
//
//     ]
// })


export default {
    install: (app, options) => {
        // Plugin code goes here
        try {
            app.runWithContext(()=> { // self.activate()

                self.caches.open(ctx_pref).then(async cache => {

                // jacks the `/lifehash-vue` URL
                self.addEventListener('fetch', (event) => {
                    event.every((request) => {
                        if (request) {
                            console.log(request.url)
                            if (request.url && request.url.startsWith(ctx_pref)) {
                                event.respondWith(cache.match(request))
                            }
                        }
                    })
                })
                return 'hello'

                })

            })
        }
        catch (e){
            console.error(e)
        }
    },
}

//     TODO: REGISTER WORKER? WHY THO
//     if ("serviceWorker" in navigator) {
//         navigator.serviceWorker
//             .register("worker.js", {
//                 scope: "./lifehash-vue/",
//             })
//             .then((registration) => {
//                 let serviceWorker;
//                 if (registration.installing) {
//                     serviceWorker = registration.installing;
//                     document.querySelector("#kind").textContent = "installing";
//                 } else if (registration.waiting) {
//                     serviceWorker = registration.waiting;
//                     document.querySelector("#kind").textContent = "waiting";
//                 } else if (registration.active) {
//                     serviceWorker = registration.active;
//                     document.querySelector("#kind").textContent = "active";
//                 }
//                 if (serviceWorker) {
//                     // logState(serviceWorker.state);
//                     serviceWorker.addEventListener("statechange", (e) => {
//                         // logState(e.target.state);
//                     });
//                 }
//             })
//             .catch((error) => {
//                 // Something went wrong during registration. The service-worker.js file
//                 // might be unavailable or contain a syntax error.
//             });
//     } else {
//         // The current browser doesn't support service workers.
//         // Perhaps it is too old or we are not in a Secure Context.
//     }
