import Loadable from 'react-loadable';
import Loading from '../../components/UI/loading/Loading';

const AsyncComponentLoader = opts =>
   Loadable({
      loading: Loading,
      ...opts
   });

export default AsyncComponentLoader;