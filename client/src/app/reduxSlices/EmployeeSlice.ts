import { Employee } from '../models/Employee';
import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../services/agent";
import { RootState } from '../store/configureStore';


interface EmployeeState {
    Employees: Employee[] | null;
    status: string;
}

const initialState: EmployeeState = {
    Employees: [],
    status: 'idle'
}

export const fetchEmployeesAsync = createAsyncThunk<Employee[], void, { state: RootState }>(
    'emp/fetchEmployeeAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Employee.getAllEmployees();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const addEmployee = createAsyncThunk<Employee, FieldValues>(
    'emp/addEmployee',
    async (data, thunkAPI) => {
        try {
            const result = await agent.Employee.addEmployee(data);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const editEmployee = createAsyncThunk<Employee, { id: number, data: Employee }>(
    'emp/editEmployee',
    async ({ id, data }, thunkAPI) => {
        try {
            const result = await agent.Employee.editEmployee(id, data);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeEmployeeAsync = createAsyncThunk<void,
    { Id: number }>(
        'emp/removeEmployeeAsync',
        async ({ Id }, thunkAPI) => {
            try {
                await agent.Employee.removeEmployee(Id);
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data })
            }
        }
    )


export const EmployeeSlice = createSlice({
    name: 'emp',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.Employees = action.payload
        },
        clearEmployee: (state) => {
            state.Employees = [];
        }
    },
    extraReducers: (builder => {
        ///add Employee
        builder.addCase(addEmployee.pending, (state, action) => {
            state.status = 'pendingAddItem';
        });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.Employees?.push(action.payload);
            state.status = 'idle';
        });
        builder.addCase(addEmployee.rejected, (state, action) => {
            state.status = 'idle';
        });

        ///edit Employee
        builder.addCase(editEmployee.pending, (state, action) => {
            state.status = 'pendingAddItem';
        });
        builder.addCase(editEmployee.fulfilled, (state, action) => {            
            const itemIndex = state.Employees?.findIndex(i => i.id === action.meta.arg.id);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.Employees?.splice(itemIndex, 1);
            state.Employees?.push(action.meta.arg.data);
            state.status = 'idle';
        });
        builder.addCase(editEmployee.rejected, (state, action) => {
            state.status = 'idle';
        });

        ///get Employees
        builder.addCase(fetchEmployeesAsync.pending, (state, action) => {
            state.status = 'pendingAddItem';
        });
        builder.addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
            state.Employees = action.payload
            state.status = 'idle';
        });
        builder.addCase(fetchEmployeesAsync.rejected, (state, action) => {
            state.status = 'idle';
        });

        ///Remove Employees
        builder.addCase(removeEmployeeAsync.pending, (state, action) => {
            state.status = 'pendingAddItem';
        });
        builder.addCase(removeEmployeeAsync.fulfilled, (state, action) => {
            const itemIndex = state.Employees?.findIndex(i => i.id === action.meta.arg.Id);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.Employees?.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeEmployeeAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
    })
})

export const { setEmployees, clearEmployee } = EmployeeSlice.actions; 