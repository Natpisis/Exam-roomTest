import { useState, useEffect } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";

const Search = () => {
  const url =
    "https://b6c8-2405-9800-b520-3a6f-19f4-74c1-ea73-553f.ngrok-free.app";

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [Data, setData] = useState([]);
  const [RoomData, setRoomData] = useState([]);

  // Api ExamTable
  useEffect(() => {
    async function read_data_database() {
      try {
        const response = await fetch(url + "/select_data/examtable");
        const data = await response.json();
        console.log("Fetched ExamTable data:", data);

        const formattedOptions = data.map((item) => ({
          ref: item.ref,
          Course: item.Course,
          Lecturer: item.Lecturer,
          eDate: item.eDate,
          eTime: item.eTime,
          hr: item.hr,
          NoSt: item.no_st,
          Room: item.Room,
          label: item.Course, // Display Course as the label
          value: item.Course, // Store Course as the value
        }));
        setData(formattedOptions);
      } catch (error) {
        console.error("Error fetching ExamTable data:", error);
      }
    }
    read_data_database();
  }, []);

  // Api ExamRoom
  useEffect(() => {
    async function read_data_ExamRoom() {
      try {
        const response = await fetch(url + "/select_data/roomexam");
        const dataDetail = await response.json();
        console.log("Fetched RoomExam data:", dataDetail);

        const formattedRoomOptions = dataDetail.map((item) => ({
          Ref: item.Ref,
          No: item.No,
          Edate: item.Edate,
          Etime: item.Etime,
          Hr: item.Hr,
          Course: item.Course,
          Num_st: item.Num_st,
          Room: item.Room,
          Proctor: item.Proctor,
          Remark: item.Remark,
          label: item.Room, // Display Room as the label
          value: item.Room, // Store Room as the value
        }));
        setRoomData(formattedRoomOptions);
      } catch (error) {
        console.error("Error fetching RoomExam data:", error);
      }
    }
    read_data_ExamRoom();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
      color: "#000000",
    }),
  };

  const handleCourseSearch = () => {
    if (selectedCourse) {
      const filtered = Data.filter(
        (item) => item.Course === selectedCourse.Course
      );
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleDateSearch = () => {
    if (selectedDate) {
      const filtered = Data.filter((item) => item.eDate === selectedDate.eDate);
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleRoomSearch = () => {
    if (selectedRoom) {
      const filtered = RoomData.filter((item) => item.Room === selectedRoom.Room);

      // Filter duplicates based on 'Ref'
      const uniqueResults = filtered.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.Ref === item.Ref)
      );

      setSearchResults(uniqueResults);
      setShowTable(true);
    }
  };

  const handleSearchReset = () => {
    setSelectedCourse(null);
    setSelectedDate(null);
    setSelectedRoom(null);
    setSearchResults([]);
    setShowTable(false);
  };

  return (
    <div className="body-form">
      <div className="container-form">
        <h3>ค้นหาด้วยวิชา</h3>
        <Select
          options={Data}
          onChange={(option) => {
            setSelectedCourse(option);
            setSelectedDate(null);
            setSelectedRoom(null);
          }}
          value={selectedCourse}
          styles={customStyles}
        />
        <br></br>
        <button onClick={handleCourseSearch} disabled={!selectedCourse}>
          Search by Course
        </button>

        <h3>ค้นหาด้วยวันที่</h3>
        <Select
          options={Data.map(item => ({ ...item, label: item.eDate, value: item.eDate }))}
          onChange={(option) => {
            setSelectedCourse(null);
            setSelectedDate(option);
            setSelectedRoom(null);
          }}
          value={selectedDate}
          styles={customStyles}
        />
        <button onClick={handleDateSearch} disabled={!selectedDate}>
          Search by Date
        </button>

        <h3>ค้นหาด้วยห้องสอบ</h3>
        <Select
          options={RoomData}
          onChange={(option) => {
            setSelectedCourse(null);
            setSelectedDate(null);
            setSelectedRoom(option);
          }}
          value={selectedRoom}
          styles={customStyles}
        />
        <br></br>
        <button onClick={handleRoomSearch} disabled={!selectedRoom}>
          Search by Room
        </button>
      </div>

      {showTable && searchResults.length > 0 && (
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>ชื่อวิชา</th>
                <th>ห้องสอบ</th>
                <th>วันสอบ</th>
                <th>เวลาสอบ</th>
                <th>จำนวนชั่วโมง</th>
                <th>จำนวนนักศึกษา</th>
                <th>ชื่ออาจาร์ย</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item) => (
                <tr key={item.Ref}>
                  <td>{item.Ref}</td>
                  <td>{item.Course}</td>
                  <td>{item.Room}</td>
                  <td>{item.Edate}</td>
                  <td>{item.Etime}</td>
                  <td>{item.Hr}</td>
                  <td>{item.Num_st}</td>
                  <td>{item.Proctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTable && searchResults.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No results found for the selected criteria.
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSearchReset}>Reset Search</button>
      </div>
    </div>
  );
};

export default Search;
