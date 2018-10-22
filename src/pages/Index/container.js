import { connect } from 'react-redux';
import { fetchIndex } from './antions';
import Index from './component';

const mapStateToProps = state => ({
  companys: state.indexPage.data,
  isFetching: state.indexPage.isFetching,
  isResolve: state.indexPage.isResolve,
});

const mapDispatchToProps = dispatch => ({
  fetchIndex: () => dispatch(fetchIndex()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
