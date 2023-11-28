import React from "react";


function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isValidated: false };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": form.getAttribute("name"),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute("action")))
            .catch((error) => alert(error));
    };

    render() {
        return (
            <>

                        <div className="has-text-centered is-block is-quarterscreen">
                            <div className="container">
                                <div className="content">
                                    <div className="section">
                                        <div className="columns">
                                            <div className="column has-text-centered has-text-primary">
                                                <form
                                                    name="contact"
                                                    method="post"
                                                    action="/contact/thanks/"
                                                    data-netlify="true"
                                                    data-netlify-honeypot="bot-field"
                                                    onSubmit={this.handleSubmit}
                                                    className="contactinput"
                                                >
                                                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                                    <input type="hidden" name="form-name" value="contact" />
                                                    <div hidden>
                                                        <label>
                                                            Don’t fill this out:{" "}
                                                            <input name="bot-field" onChange={this.handleChange} />
                                                        </label>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label has-text-primary" htmlFor={"name"}>
                                                            Name
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                className="input contactinput"
                                                                type={"text"}
                                                                name={"name"}
                                                                onChange={this.handleChange}
                                                                id={"name"}
                                                                required={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label has-text-primary" htmlFor={"email"}>
                                                            Email
                                                        </label>
                                                        <div className="control">
                                                            <input
                                                                className="input contactinput"
                                                                type={"email"}
                                                                name={"email"}
                                                                onChange={this.handleChange}
                                                                id={"email"}
                                                                required={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label has-text-primary" htmlFor={"message"}>
                                                            Message
                                                        </label>
                                                        <div className="control">
                    <textarea
                        className="textarea input contactinput"
                        name={"message"}
                        onChange={this.handleChange}
                        id={"message"}
                        required={true}
                    />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <button className="button is-warning mt-2 is-primary is-outlined" type="submit">
                                                            Send
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </>
        );
    };
}