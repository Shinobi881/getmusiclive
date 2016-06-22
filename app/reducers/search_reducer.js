import { SEARCH_EVENTS } from '../actions/action_types';

const searchReducer = (state = {}, action) => {
  console.log(action.type);
  switch (action.type) {
    case SEARCH_EVENTS:
      // console.log('Searching!', action.payload)
      let newState = {...action.payload};

      console.log(newState);
      let searchedEvents = newState.state.filter((event) => {
        let queryTest = `${event.name.text} ${event.description.text}`.toUpperCase()
                      .indexOf(newState.query.toUpperCase());
        if (queryTest >= 0) return event;
      });

      return {
        events: searchedEvents,
        searchQuery: newState.query
      };
    default:
      return state;
  }
};

export default searchReducer;
