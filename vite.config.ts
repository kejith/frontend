import type { UserConfig } from 'vite'
import preactRefresh from '@prefresh/vite'
import { resolve } from 'path'


const config: UserConfig = {
  alias: {
    '/@/': resolve(__dirname, 'src'),
  },
  jsx: {
    factory: 'h',
    fragment: 'Fragment',
  },
  plugins: [preactRefresh()],
}

export default config
