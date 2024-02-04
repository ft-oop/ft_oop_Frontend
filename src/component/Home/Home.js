import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Logo from '../../core/Logo';

export default class Home extends Component {
  mounted() {
    new Logo();
  }
}
