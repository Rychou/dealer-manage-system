import { connect } from 'react-redux';
import { async } from './antions';
import Index from './component';

const { fetchCompanies } = async;
const mapStateToProps = state => state.companies;

const mapDispatchToProps = dispatch => ({
  fetchCompanies: () => dispatch(fetchCompanies()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
