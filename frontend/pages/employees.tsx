import React from "react";
import EmployeesPage from "src/components/UserList/Employees/EmployeesPage";
import Layout from "src/components/Layout/Layout";
import { NextPageWithLayout } from "src/types/types";

const Employees: NextPageWithLayout = () => {
  return <EmployeesPage />;
};

Employees.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Employees;
