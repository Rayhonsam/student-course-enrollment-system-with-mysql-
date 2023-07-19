import React, { useState } from "react";
import axios from "axios";

const CourseEnrollment = ({ mail }) => {
  const [arr, setarr] = useState([]);

  const handleslot1 = async (sub) => {
    console.log("slota");
    try {
      const response = await axios.get("http://localhost:3002/api/slot", {
        params: {
          slot: "slota",
          mail: mail,
          sub: sub,
        },
      });
      console.log("res:", response.data);
      setarr([...arr, response.data]);
      alert(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleslot2 = async (sub) => {
    console.log("slotb");
    try {
      const response = await axios.get("http://localhost:3002/api/slot", {
        params: {
          slot: "slotb",
          mail: mail,
          sub: sub,
        },
      });
      console.log("res:", response.data);
      alert(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <table>
      <tr>
        <td></td>
        <td>slot a</td>
        <td>slot b</td>
      </tr>
      <tr>
        <td>information security</td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot1("info_sec")}
          />
        </td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot2("info_sec")}
          />
        </td>
      </tr>
      <tr>
        <td>web tech</td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot1("web_tech")}
          />
        </td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot2("web_tech")}
          />
        </td>
      </tr>
      <tr>
        <td>data mining</td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot1("data_mining")}
          />
        </td>
        <td>
          <input
            type="submit"
            value="enroll"
            onClick={() => handleslot2("data_mining")}
          />
        </td>
      </tr>
    </table>
  );
};

export default CourseEnrollment;
