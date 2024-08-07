import { useState, useEffect } from "react";
import Select from "react-select";
import "./Search.css";

const Search = () => {
  const url =
    "https://9454-2405-9800-b520-3a6f-7df5-36a2-3746-c6bc.ngrok-free.app";

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const [Data, setData] = useState({
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
          course: item.Course,
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

  const handleSelectChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
  };

  const handleSearchClick = () => {
    setShowTable(true);
  };

  return (
    <div className="body-form">
      <div className="container-form">
        <label htmlFor="type">ชื่อวิชา:</label>
        <Select options={Data} onChange={handleSelectChange} />
        <button onClick={handleSearchClick}>
          Search
        </button>
      </div>

      {showTable && selectedCourse && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Course</th>
                <th>Exam Date</th>
                <th>Exam Time</th>
                <th>Duration</th>
                <th>Number of Students</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCourse.ref}</td>
                <td>{selectedCourse.course}</td>
                <td>{selectedCourse.eDate}</td>
                <td>{selectedCourse.eTime}</td>
                <td>{selectedCourse.hr}</td>
                <td>{selectedCourse.NoSt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
