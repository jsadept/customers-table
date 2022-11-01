import React from 'react';

import Layout from "../Layout/Layout";
import CustomersList from "../CustomersList/CustomersList";
import Table from "../Table/Table";
import TableContainer from "../Table/TableContainer";




const App = () => {


    return (
        <Layout pageName={'Customers list'} >
            <TableContainer/>
        </Layout>
    );
};

export default App;
