import "@picocss/pico";
import { Example } from "./components/Example";
import { GetKeysForm } from './components/GetKeysForm'
import { h } from 'preact'

const exampleAdditionalSAEsOptions = {
  "additional_slave_SAE_IDs": [
    "ABCDEFG",
    "HIJKLMN"
  ],
  "number": 1,
  "size": 32,
};

const exampleExtensionMandatory = {
  "extension_mandatory": [
    {
      "abc_route_type": "direct"
    },
    {
      "abc_transfer_method": "qkd"
    }
  ],
  "extension_optional": [
    {
      "abc_max_age": 30000
    }
  ],
  "number": 20,
  "size": 128,
};

export default function App() {
  return (
    <div className="container">
      <GetKeysForm />
      <Example
        title="Example 1"
        subtitle="Sending additional slave SAE ids"
        options={exampleAdditionalSAEsOptions} />
      <Example
        title="Example 2"
        subtitle="Sending extension_mandatory and extension_optional information"
        options={exampleExtensionMandatory} />
      {/* <ExampleExtensionMandatory /> */}
    </div>
  )
}





