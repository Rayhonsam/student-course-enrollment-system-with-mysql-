import React, { Component } from "react";
import axios from "axios";
import StudTable from "./studtable";
import CourseEnrollment from "./courseenrollment";
import { Link } from "react-router-dom";
import Attendance from "./attendance";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studlist: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { mail } = this.props;
    console.log("val:", mail);
    try {
      const response = await axios.get("http://localhost:3002/api/get");
      console.log("Response Data: ", response.data);
      this.setState({
        studlist: response.data,
      });
      console.log("Final: ", response.data, this.state.studlist);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  render() {
    const { studlist } = this.state;
    console.log("Current state: ", studlist);

    return (
      <>
        <h1>course enrollment page</h1>
        <StudTable studlist={studlist} />
        <br></br>
        <CourseEnrollment mail={this.props.mail} />
        <br></br>
        <Attendance studlist={studlist} />
        <br></br>
      </>
    );
  }
}

export default Course;
