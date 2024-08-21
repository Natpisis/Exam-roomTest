import React from 'react';
import { Table } from 'react-bootstrap';

function RoomExam({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Ref</th>
          <th>Hr</th>
          <th>Course</th>
          <th>Num_st</th>
          <th>Room</th>
          <th>Proctor</th>
          <th>Remark</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.No}>
            <td>{item.No}</td>
            <td>{item.Ref}</td>
            <td>{item.Hr}</td>
            <td>{item.Course}</td>
            <td>{item.Num_st}</td>
            <td>{item.Room}</td>
            <td>{item.Proctor}</td>
            <td>{item.Remark}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RoomExam;
