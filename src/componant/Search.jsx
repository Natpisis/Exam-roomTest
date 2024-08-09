import { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.css";

const Search = () => {
  const url =
    "https://2cee-2405-9800-b520-3a6f-7df5-36a2-3746-c6bc.ngrok-free.app";

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [Data, setData] = useState({ 
        course:"", 
        Ref: "", // เลขลำดับ
        NoSt: "", // จำนวนนศ
        submit: false, //ส่งข้อสอบยัง
        sub_date: new Date(), //วันที่
        Lecturer: "",
        copy: "", // จำนวนชุด
        page: "", //มีกี่หน้า
        recive: false, //มารับข้อสอบยัง
        recDate: "", //
        qty: "", //----จำนวนข้อสอบ
        staple_conner: "", //เย็บยังไง
        staple_apart: "", //มีกี่ตอน
        calculator: false, //เครื่องคิดเลข
        answerSheet: false, //ใช้กระดาษคำตอบไหม
        answerBookUse: "", //เปิดหนังสือได้ไหม
        remark: "",
        color: "", //สีข้อสอบ
        eDate: "",
        eTime: "",
        hr: "",
  });

  useEffect(() => {
    async function read_data_database() {
      try {
        const response = await fetch(
          url+"/select_data/Examtable"
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        const formattedOptions = data.map((item) => ({
          ref: item.ref,
          Course: item.Course,
          Lecturer: item.Lecturer,
          eDate: item.eDate,
          eTime: item.eTime,
          hr: item.hr,
          NoSt: item.no_st,
          label: item.Course,
        }));
        setData(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    read_data_database();
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
      const filtered = Data.filter((item) => item.course === selectedCourse.course);
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleDateSearch = () => {
    if (selectedDate) {
      const filtered = Data.filter((item) => item.eDate === selectedDate);
      setSearchResults(filtered);
      setShowTable(true);
    }
  };

  const handleSearchReset = () => {
    setSelectedCourse(null);
    setSelectedDate(null);
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
            setSelectedDate(null); // Reset date when course is selected
          }}
          value={selectedCourse}
          styles={customStyles}
        />
        <br></br>
        <button onClick={handleCourseSearch} disabled={!selectedCourse}>
          Search by Course
        </button>
      </div>

      <div className="container-form" style={{ marginTop: '20px' }}>
        <h3>ค้นหาด้วยวันที่</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedCourse(null); // Reset course when date is selected
          }}
          value={selectedDate}
          styles={customStyles}
        />
        <button onClick={handleDateSearch} disabled={!selectedDate}>
          Search by Date
        </button>
      </div>

      {showTable && searchResults.length > 0 && (
        <div className="table-container" style={{ marginTop: '20px' }}>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>ชื่อวิชา</th>
                <th>วันสอบ</th>
                <th>เวลาสอบ</th>
                <th>จำนวนชั่วโมง</th>
                <th>จำนวนนักศึกษา</th>
                <th>ชื่ออาจาร์ย</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item) => (
                <tr key={item.ref}>
                  <td>{item.ref}</td>
                  <td>{item.Course}</td>
                  <td>{item.eDate}</td>
                  <td>{item.eTime}</td>
                  <td>{item.hr}</td>
                  <td>{item.NoSt}</td>
                  <td>{item.Lecturer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTable && searchResults.length === 0 && (
        <p style={{ marginTop: '20px' }}>No results found for the selected criteria.</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSearchReset}>Reset Search</button>
      </div>
    </div>
  );
};

export default Search;
