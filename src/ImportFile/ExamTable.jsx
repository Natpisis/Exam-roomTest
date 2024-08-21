import React from 'react';
import { Table } from 'react-bootstrap';

function ExamTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ref</th>
          <th>eDate</th>
          <th>eTime</th>
          <th>Course</th>
          <th>Lecturer</th>
          <th>no_st</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.Ref}>
            <td>{item.Ref}</td>
            <td>{item.Edate}</td>
            <td>{item.Etime}</td>
            <td>{item.Course}</td>
            <td>{item.Lecturer  }</td>
            <td>{item.Num_st}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ExamTable;
