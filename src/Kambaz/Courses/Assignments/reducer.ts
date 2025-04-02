import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments", 
    initialState,
    reducers: {
        setAssignmnets: (state, { payload: assignments }) => {
            state.assignments = assignments as any;
        },
        addAssignment: (state, { payload: assignment }) => {
        state.assignments = [...state.assignments, assignment] as any;
        },
        editAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.map((a) =>
            a._id === assignmentId ? { ...a, editing: true } : a
        );
        },
    },
});

export const { setAssignmnets, addAssignment, editAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;