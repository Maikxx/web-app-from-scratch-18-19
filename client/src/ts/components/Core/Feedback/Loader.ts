import { M } from '../../../utils/Engine'
import { Component } from '../../../utils/Component'

export class Loader extends Component {
    public render = () => {
        return M.create('i', { 'classList:add': 'Loader' })
    }
}
