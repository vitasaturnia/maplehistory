import React from "react";
import { useAuth } from "../hooks/useAuth";


export default function Login() {
    const { login } = useAuth();
    return (
        <section>
            <div className="has-text-centered">
                <h1>Welcome to the App</h1>

                <p>You can try out logging in below!</p>

                <button className="button is-warning"
                    onClick={() => {
                        return login().catch((e) => {
                            console.error(e);
                        });
                    }}
                >
                    Log in
                </button>
            </div>
        </section>
    );
}
