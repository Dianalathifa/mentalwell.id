import React, { useState, useEffect } from "react";
import AdminLayout from "./layouts/AdminLayout";
import { Breadcrumb } from "react-bootstrap";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item active>
            <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>Welcome to Dashboard MentalWell!</h3>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
