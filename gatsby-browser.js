import netlifyIdentity from 'netlify-identity-widget';

export const onInitialClientRender = () => {
    netlifyIdentity.init();

    netlifyIdentity.on('login', user => {
        document.location.href = '/myprofile';
    });

    netlifyIdentity.on('logout', () => {
        document.location.href = '/'; // Redirect to home page after logout
    });
};
