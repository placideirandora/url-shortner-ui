import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import UserInputMask from './components/pages/UserInputMask';
import AdminOverview from './components/pages/AdminOverview';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserInputMask />} />
        <Route path="/user-input-mask" element={<UserInputMask />} />
        <Route path="/admin-overview" element={<AdminOverview />} />
      </Routes>
    </Layout>
  );
}

export default App;
