import { createRoot } from 'react-dom/client';
import {HashRouter,Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './assets/pages/Home.jsx';
import Login from './assets/pages/Login.jsx';
import Layout from './assets/Routerlayout/Layout.jsx';
import Prises from './assets/pages/Prises.jsx';
import Test from './assets/pages/Test.jsx';
import Context from './contextapi/Context.jsx';

createRoot(document.getElementById('root')).render(
  <Context>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rent/:id" element={<Prises />} />
          <Route path='test' element={<Test />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </HashRouter>
  </Context>
);
