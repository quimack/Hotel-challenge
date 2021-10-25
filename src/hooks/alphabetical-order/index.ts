import { Booking } from "../../types";

const sortAlphabetically = (array: Booking[]) => {
    return array.sort((a,b) => {
        if (a.last_name < b.last_name) {
            return -1;
          }
          if (a.last_name > b.last_name) {
            return 1;
          }
          return 0;
    });
}

export { sortAlphabetically };