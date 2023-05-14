import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    provinces: [],
    locations: [],
    crime_types: [],
    criminal_activities: [],
    filterDate: `${new Date()}`,
    selectedLocation: 'All Locations',
    selectedType: 'All Crime Types',
}
export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        setProvinces: (state, action) => {
            state.provinces = action.payload
        },
        setLocations: (state, action) => {
            state.locations = action.payload
        },
        setCrimeTypes: (state, action) => {
            state.crime_types = action.payload
        },
        setCriminalActivities: (state, action) => {
            state.criminal_activities = action.payload
        },
        setFilterDate: (state, action) => {
            state.filterDate = action.payload
        },
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload
        }
    }
})
export const { setProvinces,
    setLocations,
    setCrimeTypes,
    setCriminalActivities,
    setFilterDate,
    setSelectedLocation,
    setSelectedType
} = dataSlice.actions
export default dataSlice.reducer