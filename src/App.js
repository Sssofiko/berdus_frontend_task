import React, { useState } from 'react';
import './App.css';

function App() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [distribs, setDistribs] = useState(false);
  const [softs, setSofts] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addRole = () => {
    if (roleName.trim()) {
      const newRole = { role_name: roleName, distribs, softs };
      if (editIndex !== null) {
        const updatedRoles = roles.map((role, index) =>
          index === editIndex ? newRole : role
        );
        setRoles(updatedRoles);
        setEditIndex(null);
      } else {
        setRoles([...roles, newRole]);
      }
      resetForm();
    }
  };

  const deleteRole = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
  };

  const editRole = (index) => {
    const role = roles[index];
    setRoleName(role.role_name);
    setDistribs(role.distribs);
    setSofts(role.softs);
    setEditIndex(index);
  };

  const resetForm = () => {
    setRoleName('');
    setDistribs(false);
    setSofts(false);
  };

  return (
    <div className="App">
      <h1>Roles Management</h1>
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Distribs</th>
                <th>Softs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.role_name}</td>
                  <td>{role.distribs ? 'Yes' : 'No'}</td>
                  <td>{role.softs ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="update" onClick={() => editRole(index)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => deleteRole(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-container">
          <h3>{editIndex !== null ? 'Edit Role' : 'Add New Role'}</h3>
          <input
            type="text"
            placeholder="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <label>
            Distribs
            <input
              type="checkbox"
              checked={distribs}
              onChange={(e) => setDistribs(e.target.checked)}
            />
          </label>
          <label>
            Softs
            <input
              type="checkbox"
              checked={softs}
              onChange={(e) => setSofts(e.target.checked)}
            />
          </label>
          <button className="add" onClick={addRole}>
            {editIndex !== null ? 'Update Role' : 'Add Role'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
