export const FETCH_INDEX = 'FETCH_INDEX';
export const RESOLVE_INDEX = 'RESOLVE_INDEX';
export const REJECT = 'REJECT';

export const fetchIndex = () => ({
  type: FETCH_INDEX,
});
export const resolveIndex = companys => ({
  type: RESOLVE_INDEX,
  companys,
});
export const reject = err => ({
  type: REJECT,
  err,
});
