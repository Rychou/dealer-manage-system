import { async, UPDATE_PAGINATION } from './actions';

const { fetchCarsInfo } = async;

const initState = {
    cars: [],
    pagination: {},
    isFetching: false,
    isRejected: false,
    isResolve: false,
};

const cars = (state = initState, action) => {
    switch (action.type) {
        case fetchCarsInfo.TYPE:
            return {
                ...state,
                isFetching: true,
            };
        case fetchCarsInfo.SUCCESS:
            return {
                ...state,
                cars: action.payload.cars,
                isFetching: false,
                isResolve: false,
            };
        case fetchCarsInfo.FAILURE:
            return {
                ...state,
                isRejected: true,
            };
        case UPDATE_PAGINATION:
            return {
                ...state,
                pagination: action.pagination,
            };
        default:
            return state;
    }
};

export default cars;
