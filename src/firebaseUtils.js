const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already in use by another account.';
        case 'auth/invalid-email':
            return 'The email address is invalid.';
        case 'auth/operation-not-allowed':
            return 'Email/Password accounts are not enabled. Please contact support.';
        case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
};
