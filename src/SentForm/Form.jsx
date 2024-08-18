import { useState, useEffect } from "react";
import "./Form.css";
import Select from "react-select";
import axios from "axios";
import Examform from "../Printpdf/Examform.jsx";
import Altexamcalform from "../Printpdf/Altexamcalform.jsx";

// Const ส่งข้อมูลไปเก็บ
const Form = () => {
  const url =
    "https://a4ee-2405-9800-b520-3a6f-25e2-5e87-9e26-79bc.ngrok-free.app";

  const [Data, setData] = useState({
    Ref: 0,
    NoSt: "",
    submit: false,
    sub_date: new Date(),
    Lecturer: "",
    copy: "",
    page: "",
    recive: false,
    recDate: "",
    qty: "",
    staple_conner: "",
    staple_apart: "",
    calculator: "อนุญาต",
    answerSheet: "ใช้ได้",
    answerBookUse: "",
    remark: "",
    color: "",
    eDate: "",
    eTime: "",
    hr: "",
  });

  const [dataE, setDataE] = useState([]);
  const [dataExamDetail, setDataExamDetail] = useState([]);
  const [lecturerOptions, setLecturerOptions] = useState([]);

  // Api จาก Exam Table
  useEffect(() => {
    async function read_data_database() {
      try {
        const response = await fetch(url + "/select_data/examtable");
        const data = await response.json();
        console.log("Fetched data:", data);

        const formattedOptions = data.map((item) => ({
          ref: item.Ref,
          course: item.Course,
          lecturers: item.Lecturer.split(",").map((lecturer) =>
            lecturer.trim()
          ), // แยกชื่ออาจารย์
          eDate: item.Edate,
          eTime: item.Etime,
          hr: item.Hr,
          NoSt: item.Num_st,
          label: item.Course,
        }));

        setDataE(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    read_data_database();
  }, []);

  // Api จาก Exam-detail
  useEffect(() => {
    async function read_data_Examdetail() {
      try {
        const response = await fetch(url + "/select_data/detailexam");
        const dataDetail = await response.json();
        console.log("Feact ExamDetail:", dataDetail);

        const formattedDataExamDetail = dataDetail.map((item) => ({
          ref: item.Ref,
          no_st: item.no_st,
          submit: item.submit,
          copy: item.copy,
          page: item.page,
          recive: item.recive,
          recDate: item.recDate,
          qty: item.qty,
          staple_conner: item.staple_conner,
          staple_apart: item.staple_apart,
          calculator: item.calculator,
          answerSheet: item.answerSheet,
          answerBookUse: item.answerBookUse,
          remark: item.remark,
          color: item.color,
        }));
        setDataExamDetail(formattedDataExamDetail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    read_data_Examdetail();
  }, []);

  // เปลี่ยนค่าในช่อง INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  // เมื่อเลือก Ref จาก Dropdown
  const handleIdChangeWithref = (selectedOption) => {
    const selectedDetail =
      dataExamDetail.find((detail) => detail.ref === selectedOption.ref) || {};
    setData({
      ...Data,
      Ref: selectedOption.ref,
      NoSt: selectedOption.NoSt,
      Lecturer: "", // เคลียร์ชื่ออาจารย์ก่อนเพื่อให้เลือกใหม่จาก datalist
      eDate: selectedOption.eDate,
      eTime: selectedOption.eTime,
      hr: selectedOption.hr,
      copy: selectedDetail.copy,
      page: selectedDetail.page,
      color: selectedDetail.color,
      sub_date: new Date(),
      staple_conner: selectedDetail.staple_conner,
      staple_apart: selectedDetail.staple_apart,
      calculator: selectedDetail.calculator,
      answerBookUse: selectedDetail.answerBookUse,
      remark: selectedDetail.remark,
    });
    // อัปเดตรายการอาจารย์ตาม Ref ที่เลือก
    setLecturerOptions(selectedOption.lecturers);
    console.log("Selected option:", selectedOption);
    console.log("Select Detail:", selectedDetail);
  };

  //เช็คว่ากรอกครบไหม
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", Data);
    if (!Data.total) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      Sentdata();
      return;
    }
  };

  async function Sentdata() {
    const response = await axios.post(
      url + "/Edit_DetailExam/" + JSON.stringify(Data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  }

  // css select
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

  return (
    <>
    
    <div className="body-form">
      <form className="container-form" onSubmit={handleSubmit}>
        <h1>โปรแกรมห้องข้อสอบ</h1>

        <div>
          <label htmlFor="type">ชื่อวิชา:</label>
          <Select
            options={dataE}
            onChange={handleIdChangeWithref}
            styles={customStyles}
          />
          <br></br>
          <br></br>
          <label htmlFor="page">Ref </label>
          <input
            className="form-row"
            type="number"
            id="ref"
            name="ref"
            value={Data.Ref}
            readOnly
          />
          <br></br>
          <br></br>
          <label htmlFor="Lecturer">ชื่อ อาจาร์ย:</label>
          <select
            className="form-row"
            id="Lecturer"
            name="Lecturer"
            value={Data.Lecturer}
            onChange={handleChange}
          >
            <option value="">เลือกชื่ออาจารย์</option>
            {lecturerOptions.map((lecturer, index) => (
              <option key={index} value={lecturer}>
                {lecturer}
              </option>
            ))}
          </select>

          <br></br>
          <br></br>
          <label htmlFor="page">วันสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Examday"
            name="Examday"
            value={Data.eDate}
            readOnly
          />
          <label htmlFor="page">เวลาสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Timex"
            name="Timex"
            value={Data.eTime}
            readOnly
          />
          <br></br>
          <br></br>
          <label htmlFor="page">ชั่วโมง</label>
          <input
            className="form-row"
            type="text"
            id="hr"
            name="hr"
            value={Data.hr}
            readOnly
          />
          <label htmlFor="page">จำนวน นศ.</label>
          <input
            className="form-row"
            type="text"
            id="NoSt"
            name="NoSt"
            value={Data.NoSt}
            readOnly
          />
          <label htmlFor="page">สถานะการส่งข้อสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Submit"
            name="Submit"
            value={Data.submit ? "ส่งแล้ว" : "ยังไม่ได้ส่ง"}
            readOnly
          />
        </div>
        <br></br>
        <br></br>
        <div>
          <h1>รายละเอียดการสอบ</h1>
        </div>

        <div>
          <div>
            <div>
              <label htmlFor="page">จำนวนชุด:</label>
              <input
                className="form-row"
                type="text"
                id="Copy"
                name="copy"
                value={Data.copy}
                onChange={handleChange}
              />
              <label htmlFor="total">จำนวนหน้า:</label>
              <input
                className="form-row"
                type="text"
                id="Page"
                name="page"
                value={Data.page}
                onChange={handleChange}
              />
              <label htmlFor="color">สีข้อสอบ:</label>
              <input
                type="text"
                id="Color"
                name="color"
                value={Data.color}
                onChange={handleChange}
              />
              <br></br>
              <br></br>
            </div>
          </div>

          <div>
            <label htmlFor="date">วันที่ส่ง:</label>
            <input
              className="form-row"
              type="date"
              id="SubDate"
              name="sub_date"
              value={Data.sub_date}
              onChange={handleChange}
            />
            <label htmlFor="StapleApart">รูปแบบการเย็บ:</label>
            <input
              className="form-row"
              type="datalist"
              id="StapleApart"
              name="staple_conner"
              list="typerOptions"
              value={Data.staple_conner}
              onChange={handleChange}
            />
            <datalist id="typerOptions">
              <option value="เย็บมุมรวม"></option>
              <option value="เย็บแยกตอน"></option>
            </datalist>
            <label htmlFor="staple_apart">จำนวนตอน:</label>
            <input
              type="text"
              id="staple_apart"
              name="staple_apart"
              value={Data.staple_apart}
              onChange={handleChange}
            />
            <br></br>
            <br></br>
          </div>

          <div>
            <label>Calculator:</label>
            <input
              type="radio"
              id="Calculator-yes"
              name="calculator"
              value="อนุญาต"
              checked={Data.calculator === "อนุญาต"}
              onChange={handleChange}
            />
            <label htmlFor="calculator-yes">อนุญาต</label>
            <input
              type="radio"
              id="Calculator-no"
              name="calculator"
              value="ไม่อนุญาต"
              checked={Data.calculator === "ไม่อนุญาต"}
              onChange={handleChange}
            />
            <label htmlFor="Calculator-no">ไม่อนุญาต</label>
            <br></br>
            <br></br>
          </div>

          <div>
            <label>กระดาษคำตอบ:</label>
            <input
              type="radio"
              id="AnswerSheet-yes"
              name="answerSheet"
              value="ใช้ได้"
              checked={Data.answerSheet === "ใช้ได้"}
              onChange={handleChange}
            />
            <label htmlFor="AnswerSheet-yes">ใช้ได้</label>
            <input
              type="radio"
              id="AnswerSheet-no"
              name="answerSheet"
              value="ใช้ไม่ได้"
              checked={Data.answerSheet === "ใช้ไม่ได้"}
              onChange={handleChange}
            />
            <label htmlFor="AnswerSheet-no">ใช้ไม่ได้</label>
            <br></br>
            <br></br>
          </div>

          <div>
            <label htmlFor="remark">เงื่อนไขการสอบ:</label>
            <input
              type="datalist"
              id="remark"
              name="remark"
              list="RemarkOptions"
              value={Data.remark}
              onChange={handleChange}
            />
            <datalist id="RemarkOptions">
              <option value="เอากระดาษเข้าได้"></option>
            </datalist>
            <br></br>
            <br></br>
          </div>

          <div>
            <label htmlFor="fileexam">ไฟล์ข้อสอบ:</label>
            <input
              type="file"
              id="fileexam"
              name="fileexam"
              onChange={handleChange}
            />
            <br></br>
            <br></br>
          </div>

          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
        
      </form>
      
    </div> 
    <div className="button-row">
      <Examform  ref = {dataExamDetail.ref}/>
      <Altexamcalform/>
    </div>
    </>
  );
};

export default Form;
