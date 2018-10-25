import { connect } from 'react-redux';
import CarList from './component';
import { async } from './actions';

const { fetchCars } = async;

const mapStateToProps = state => state.CarList;

const mapDispatchToProps = dispatch => ({
  fetchCars: () => dispatch(fetchCars()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarList);
