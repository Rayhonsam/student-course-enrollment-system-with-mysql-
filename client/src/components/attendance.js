import React, { Component } from "react";
import axios from "axios";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      data: [],
    };
  }

  set = () => {
    const { studlist } = this.props;
    const updatedData = [];

    for (let i = 0; i < studlist.length; i++) {
      console.log("i")
      const regno = studlist[i].reg;
      updatedData.push({ regno, attendance: true });
    }

    this.setState({
      data: updatedData,
    });

    console.log("Updated", updatedData);
  }

  handleattendance = (index) => {
    console.log("up")
    const updatedlist = this.state.data;
    console.log(updatedlist, index)
    updatedlist[index].attendance = !updatedlist[index].attendance;
    console.log(updatedlist[index].regno, updatedlist[index].attendance)
    this.setState({
      data: updatedlist
    });
    console.log("updateds:",this.state.data);
  };

  handleupdateattendance = async () => {
    try {
      console.log("updateds:",this.state.data);
      const { list } = this.state;
      const response = await axios.get("http://localhost:3002/api/update", {
        params: {
          list: this.state.data,
        },
      });
      alert(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  initState = () => {
      const updatedData = [];

      for (let i = 0; i < this.props.studlist.length; i++) {
        console.log("i")
        const regno = this.props.studlist[i].reg;
        updatedData.push({ regno, attendance: true });
      }
      if (this.state.data.length !== updatedData.length) {
        this.setState({
          data: updatedData
        });
      }
  }

  render() {
    const { data } = this.state;

    this.initState(this.props.studlist);

    return (
      <>
        <button type="button" onClick={this.set}>set</button>
        <table>
          <thead>
            <tr>
              <td>name</td>
              <td>regno</td>
              <td>attendance</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={index}>
                <td>{item.regno}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.handleattendance(index)}
                  >
                    {item.attendance ? "present" : "absent"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          value="update"
          onClick={this.handleupdateattendance}
        >
          update
        </button>
      </>
    );
  }
}

export default Attendance;
