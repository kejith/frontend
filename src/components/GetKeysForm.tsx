/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { Component, h } from "preact";
import { KeyContainerTable } from "./KeyContainerTable";

type GetKeysFormState = {
    keySize: number;
    keyCount: number;
    keys: Record<string, string>;
    master: string;
    slave: string;
}

export class GetKeysForm extends Component<{}, GetKeysFormState> {
    constructor() {
        super();

        this.state = {
            keyCount: 1,
            keySize: 8,
            keys: {},
            master: "",
            slave: "",
        }
    }

    fetchKeys = async (): Promise<void> => {
        const { keySize, keyCount } = this.state;
        const response = await fetch(
            "http://178.254.28.176:9000/api/v1/keys/178.254.28.176:9000/enc_key",
            {
                body: JSON.stringify({
                    number: keyCount,
                    size: keySize,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );

        if (response.ok) {
            const data = await response.json();
            this.setState({ keys: data.keys });
        } else {
            console.error("Failed to fetch keys");
        }
    };

    onSubmit = async (event: Event): Promise<void> => {
        event.preventDefault();
        await this.fetchKeys();
    };

    onInput = (event: Event): void => {
        const { id, value, type } = event.target as HTMLInputElement;
        switch (type) {
            case "range":
                this.setState({ [id]: Number(value) });
                break;
            case "text":
                this.setState({ [id]: value });
                break;

            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <article>
                    <hgroup>
                        <h2>Get Keys from KME</h2>
                        <h3>Set the Parameters</h3>
                    </hgroup>
                    <form onSubmit={this.onSubmit}>
                        {/* <fieldset className="get-keys-form">
                            <legend>Master/Slave Settings</legend>
                            <div className="grid">
                                <label htmlFor="num-keys">Master
                                    <input
                                        id="master"
                                        name="master"
                                        value={this.state.master}
                                        onInput={this.onInput}
                                        required />
                                </label>
                                <label htmlFor="num-keys">Slave
                                    <input
                                        id="slave"
                                        name="slave"
                                        value={this.state.slave}
                                        onInput={this.onInput}
                                        required />
                                </label>
                            </div>
                        </fieldset> */}
                        <fieldset className="get-keys-form">
                            <legend>Key Size</legend>
                            <input
                                type="range"
                                id="keySize"
                                name="key_size"
                                min="8"
                                max="1024"
                                value={this.state.keySize}
                                step="8"
                                onInput={this.onInput}
                                required />
                            <label htmlFor="num-keys">{this.state.keySize}</label>
                        </fieldset>
                        <fieldset className="get-keys-form">
                            <legend>Amount of Keys</legend>
                            <input
                                type="range"
                                id="keyCount"
                                name="key_count"
                                min="1"
                                max="128"
                                value={this.state.keyCount}
                                onInput={this.onInput}
                                required />
                            <label htmlFor="num-keys">{this.state.keyCount}</label>
                        </fieldset>
                        <div className="submit">
                            <button type="submit">Get Keys</button>
                        </div>
                    </form>
                    {Object.keys(this.state.keys).length > 0 &&
                        <KeyContainerTable
                            master={this.state.master}
                            slave={this.state.slave}
                            keys={this.state.keys} />
                    }
                </article>
            </div>
        );
    }
}
