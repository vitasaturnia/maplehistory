import { AuthProvider } from './src/context/Authcontext';

export const wrapRootElement = ({ element }) => {
    return (
        <AuthProvider>
            {element}
        </AuthProvider>
    );
};