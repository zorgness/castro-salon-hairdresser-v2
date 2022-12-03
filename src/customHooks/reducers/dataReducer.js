export const dataReducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return { status: "fetching", data: null, error: null };
    case "done":
      return { status: "done", data: action.payload, error: null };
    case "fail":
      return { status: "fail", data: null, error: action.error };
    default:
      throw new Error("Action non supporté");
  }
};
