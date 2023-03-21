/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import { EventHandler, TargetedMouseEvent } from 'preact/compat';
import { h } from 'preact';
import { useState } from 'preact/hooks';

interface KeyContainer {
  keys: {
    [id: string]: string;
  };
  master?: string;
  slave?: string;
}

interface CheckedKeys {
  keys: {
    [id: string]: { isValid: boolean, key: string };
  };
}

export const KeyContainerTable = function KeyContainerTable(props: KeyContainer) {
  const { keys } = props;
  const checkedKeys: CheckedKeys = { keys: {} } as CheckedKeys;
  const [state, setState] = useState({ checkedKeys, keys });

  const onCheck: EventHandler<TargetedMouseEvent<HTMLButtonElement>> = async function onCheck({ currentTarget }: EventHandler<TargetedMouseEvent<HTMLButtonElement>>) {
    let fetchOptions = {
      headers: { "Content-Type": "application/json", },
      method: "GET",
    }
    let url = `http://178.254.28.176:9000/api/v1/keys/master_ID_1/dec_key`

    const ids = currentTarget.value.split(",")
    if (ids.length === 1) {
      url = url.concat(`?key_id=${ids[0]}`)
    } else {
      fetchOptions.method = "POST"
      fetchOptions = { ...fetchOptions, ...{ body: JSON.stringify({ "key_ids": ids }) } }
      console.log(fetchOptions)
    }

    const response = await fetch(url, fetchOptions);

    if (response.ok) {
      const data = await response.json();
      const newCheckedKeys = { keys: { ...state.checkedKeys.keys } } as CheckedKeys;
      Object.entries(data.keys).forEach(([id, value]) => {
        newCheckedKeys.keys[id] = { isValid: true, key: value as string }
      });

      setState({ ...state, checkedKeys: newCheckedKeys });
    } else {
      console.error("Failed to fetch keys");
    }
  }

  return (
    <footer className="code">
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Key</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(keys).map(([id, key], index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{id}</td>
              <td className="key-cell">{key}</td>
              <td>
                {!state.checkedKeys.keys[id] && <button type="submit" value={id} onClick={onCheck}>Check</button>}
                {state.checkedKeys.keys[id]?.isValid && <text>Valid</text>}
              </td>
            </tr>
          ))}
        </tbody>
        <button type="submit" value={Object.keys(keys)} onClick={onCheck}>Check all</button>
      </table>

    </footer>
  );
}
