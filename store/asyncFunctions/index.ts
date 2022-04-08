import { onSubmitNewFeed } from "store/asyncFunctions/feed/submitNewFeed";
import { onUpdateFeed } from "store/asyncFunctions/feed/updateFeed";

const asyncThunk = {
  onSubmitNewFeed,
  onUpdateFeed,
}

export { 
  onSubmitNewFeed,
  onUpdateFeed,
}

export default asyncThunk