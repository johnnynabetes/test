/* eslint-disable no-undef */
import { loadExternalJs } from './helpers'

const _sources = new Map([
    ['api_jdk', 'https://apis.google.com/js/api.js?v=weekly&onload=_google_provider_onload']
]);
const client_id = '353081789428-ndgpvpjn89pupcke2c2hhm4qfsb2p18h.apps.googleusercontent.com';

const GoogleWraper = {
    async login() {
        return new Promise(($resolve, $reject) => {
            gapi.auth2.getAuthInstance()
                .signIn({ scope: 'email' })
                .then(function (response) {
                    $resolve(GoogleWraper.getToken());
                }, $reject);
        });
    },
    async logOut() {
        gapi.auth2.getAuthInstance().signOut();
    },
    async connected() {
        return new Promise(($resolve, $reject) => {
            const auth = gapi.auth2.getAuthInstance();
            if (auth && auth.isSignedIn.get())
                $resolve(GoogleWraper.getToken());
            $reject();
        });
    },
    getToken() {
        return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    },
    async ready() {
        if (window.gapi)
            return;

        return new Promise(($resolve) => {
            window._google_provider_onload = () => {
                gapi.load('auth:client:auth2', () => {
                    gapi.auth2.init({
                        client_id,
                        scope: "email",
                        picture: {
                            size: 512
                        }
                    }).then($resolve);
                });
            }

            loadExternalJs(_sources.get('api_jdk'));
        });
    }
}

export default GoogleWraper;