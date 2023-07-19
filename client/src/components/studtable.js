import React from "react";

const StudTable = ({studlist}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reg</th>
        </tr>
      </thead>
      <tbody>
         {
           studlist.map((list)=>(
              <tr>
              <td>{list.name}</td>
              <td>{list.reg}</td>
            </tr>
           ))
         }
      </tbody>
    </table>
  );
};

export default StudTable;
