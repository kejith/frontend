/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { Component, h } from "preact";

type ExampleState = {
    data: string;
}

type ExampleFetchOptions = {
    options: object;
    title: string;
    subtitle: string;
}

export class Example extends Component<ExampleFetchOptions, ExampleState> {
    constructor() {
        super();

        this.state = {
            data: "",
        }
    }

    fetchKeys = async (): Promise<void> => {
        const fetchOptions = {
            body: JSON.stringify(this.props.options),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
        const url = `http://localhost:9000/api/v1/keys/master_ID_1/enc_key`
        const response = await fetch(url, fetchOptions);

        if (response.ok || response.status === 400) {
            const data = await response.json();
            console.log(JSON.stringify(data, null, 2));
            this.setState({ data: JSON.stringify(data, null, 2) });
        } else {
            console.error("Failed to fetch keys");
        }
    };

    onClick = async (event: Event): Promise<void> => {
        event.preventDefault();
        await this.fetchKeys();
    };


    render() {
        return (
            <div>
                <article>
                    <hgroup>
                        <h2>{this.props.title}</h2>
                        <h3>{this.props.subtitle}</h3>
                    </hgroup>
                    <pre>
                        <code>
                            {JSON.stringify(this.props.options, null, 2)}
                        </code>
                    </pre>
                    <button type="submit" onClick={this.onClick}>Send</button>
                    {this.state.data &&
                        <footer>
                            <pre>
                                {this.state.data}
                            </pre>
                        </footer>
                    }
                </article>
            </div>
        );
    }
}
