import { connect } from 'react-redux';
import CarList from './component';
import { async, updatePagination } from './actions';

const { fetchCars } = async;

const mapStateToProps = state => state.CarList;

const mapDispatchToProps = dispatch => ({
  fetchCars: payload => dispatch(fetchCars(payload)),
  updatePagination: payload => dispatch(updatePagination(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarList);
