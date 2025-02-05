import React, { useState } from 'react';

const ProjectTable = () => {
  const [projects, setProjects] = useState([{
    projectId: 1002,
    projectName: "New Production Website",
    projectDescription: "The company needs a new website that is modern and up to date",
    startDate: "2025-03-01T00:00:00",
    endDate: "2025-05-01T00:00:00",
    status: "Not Started",
    service: "Web Konstruktion",
    price: 3900.00,
    customer: {
      id: 2,
      companyName: "Globex AB",
      email: "info@globexab.com",
      contactPerson: {
        id: 2,
        firstName: "Lisa",
        lastName: "Simpson",
        email: "lisi@globexab.com",
        phoneNumber: "0103001010",
        customerId: 2
      }
    },
    projectManager: {
      employmentNumber: 101,
      firstName: "Erik",
      lastName: "Andersson",
      email: "erik.andersson@comanydomain.com",
      phoneNumber: "0101002030",
      role: {
        id: 5,
        roleName: "Manager"
      }
    }
  }]);

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [newProject, setNewProject] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    statusId: 1,
    customerId: "",
    serviceId: "",
    projectManagerId: ""
  });

  const toggleRow = (projectId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(projectId)) {
      newExpandedRows.delete(projectId);
    } else {
      newExpandedRows.add(projectId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const projectToAdd = {
      ...newProject,
      projectId: Math.max(...projects.map(p => p.projectId)) + 1,
      status: "Not Started",
      service: "Web Konstruktion"
    };
    setProjects([...projects, projectToAdd]);
    setShowAddModal(false);
    setNewProject({
      projectName: "",
      projectDescription: "",
      startDate: "",
      endDate: "",
      statusId: 1,
      customerId: "",
      serviceId: "",
      projectManagerId: ""
    });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.projectId !== projectId));
    }
  };

  const handleEditProject = (project) => {
    setEditingProject({
      ...project,
      statusId: 1,
      customerId: project.customer.id,
      serviceId: 4,
      projectManagerId: project.projectManager.employmentNumber
    });
    setShowEditModal(true);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => 
      p.projectId === editingProject.projectId ? 
      {...p, ...editingProject, status: "Not Started", service: "Web Konstruktion"} : 
      p
    ));
    setShowEditModal(false);
    setEditingProject(null);
  };

  // Modal component
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-8 px-4 py-2"></th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">End Date</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="w-24 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <React.Fragment key={project.projectId}>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleRow(project.projectId)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedRows.has(project.projectId) ? '▼' : '▶'}
                    </button>
                  </td>
                  <td className="px-4 py-2">{project.projectName}</td>
                  <td className="px-4 py-2">{project.status}</td>
                  <td className="px-4 py-2">{new Date(project.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{project.service}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.projectId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.has(project.projectId) && (
                  <tr>
                    <td colSpan={6} className="px-4 py-2">
                      <div className="bg-gray-50 p-4 rounded">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold mb-2">Project Details</h3>
                            <p><span className="font-medium">Description:</span> {project.projectDescription}</p>
                            <p><span className="font-medium">Start Date:</span> {new Date(project.startDate).toLocaleDateString()}</p>
                            <p><span className="font-medium">Price:</span> ${project.price}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Customer Information</h3>
                            <p><span className="font-medium">Company:</span> {project.customer.companyName}</p>
                            <p><span className="font-medium">Email:</span> {project.customer.email}</p>
                            <p><span className="font-medium">Contact:</span> {project.customer.contactPerson.firstName} {project.customer.contactPerson.lastName}</p>
                          </div>
                          <div className="md:col-span-2">
                            <h3 className="font-semibold mb-2">Project Manager</h3>
                            <p>{project.projectManager.firstName} {project.projectManager.lastName}</p>
                            <p>{project.projectManager.email}</p>
                            <p>{project.projectManager.phoneNumber}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Project"
      >
        <form onSubmit={handleAddProject}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={newProject.projectName}
                onChange={(e) => setNewProject({...newProject, projectName: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                value={newProject.projectDescription}
                onChange={(e) => setNewProject({...newProject, projectDescription: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={newProject.startDate.split('T')[0]}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={newProject.endDate.split('T')[0]}
                onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Project"
      >
        {editingProject && (
          <form onSubmit={handleUpdateProject}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={editingProject.projectName}
                  onChange={(e) => setEditingProject({...editingProject, projectName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  value={editingProject.projectDescription}
                  onChange={(e) => setEditingProject({...editingProject, projectDescription: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded"
                  value={editingProject.startDate.split('T')[0]}
                  onChange={(e) => setEditingProject({...editingProject, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded"
                  value={editingProject.endDate.split('T')[0]}
                  onChange={(e) => setEditingProject({...editingProject, endDate: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Project
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ProjectTable;