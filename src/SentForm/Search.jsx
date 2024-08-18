import { useState, useEffect } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";

const Search = () => {
  const url =
    "https://a4ee-2405-9800-b520-3a6f-25e2-5e87-9e26-79bc.ngrok-free.app";

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [RoomData, setRoomData] = useState([]);

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
        }));
        setRoomData(formattedRoomOptions);
      } catch (error) {
        console.error("Error fetching RoomExam data:", error);
      }
    }
    read_data_ExamRoom();
  }, []);

  const getUniqueDates = (data) => {
    const uniqueDates = [...new Set(data.map(item => item.Edate))];
    return uniqueDates.map(date => ({
      label: date,
      value: date,
    }));
  };

  const getUniqueRooms = (data) => {
    const uniqueRooms = [...new Set(data.map(item => item.Room))];
    return uniqueRooms.map(room => ({
      label: room,
      value: room,
    }));
  };

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
      const filtered = RoomData.filter(
        (item) => item.Ref === selectedCourse.Ref
      );
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleDateSearch = () => {
    if (selectedDate) {
      const filtered = RoomData.filter(
        (item) => item.Edate === selectedDate.value
      );
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleRoomSearch = () => {
    if (selectedRoom) {
      const filtered = RoomData.filter(
        (item) => item.Room === selectedRoom.value
      );
      setSearchResults(filtered);
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
          options={RoomData.map((item) => ({
            label: item.Course,
            value: item.Course,
            ...item,
          }))}
          onChange={(option) => {
            setSelectedCourse(option);
            setSelectedDate(null);
            setSelectedRoom(null);
          }}
          value={selectedCourse}
          styles={customStyles}
        />
        <br />
        <button onClick={handleCourseSearch} disabled={!selectedCourse}>
          Search by Course
        </button>

        <h3>ค้นหาด้วยวันที่</h3>
        <Select
          options={getUniqueDates(RoomData)}
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
          options={getUniqueRooms(RoomData)}
          onChange={(option) => {
            setSelectedCourse(null);
            setSelectedDate(null);
            setSelectedRoom(option);
          }}
          value={selectedRoom}
          styles={customStyles}
        />
        <br />
        <button onClick={handleRoomSearch} disabled={!selectedRoom}>
          Search by Room
        </button>
      </div>

      {showTable && searchResults.length > 0 && (
        <div className="table-container" style={{ marginTop: "20px" }}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>ลำดับ</th>
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
                <tr key={item.No}>
                  <td>{item.No}</td>
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
