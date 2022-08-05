import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Add from './app/components/Add'; 
import AddEdit from './app/components/AddEdit';
import List from './app/components/List';
import Navbar from './app/components/Navbar';
import Update from './app/components/Update';
import { fetchEmployeesAsync } from './app/reduxSlices/EmployeeSlice';
import { useAppDispatch } from './app/store/configureStore';

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {

      await dispatch(fetchEmployeesAsync());

    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/update" element={<Update />} />
        <Route path="/add" element={<Add />} />
        <Route path="/addedit/:id" element={<AddEdit />} />
      </Routes>
    </>
  );
}

export default App;
