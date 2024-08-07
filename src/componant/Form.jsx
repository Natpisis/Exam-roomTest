import { useState, useEffect } from "react";
import "./Form.css";
import Select from "react-select";

// Const ส่งข้อมูลไปเก็บ
const Form = () => {
  const url = "https://cd45-2405-9800-b520-3a6f-7df5-36a2-3746-c6bc.ngrok-free.app";

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

  const [dataE, setDataE] = useState([]);
  const [dataExamDetail, setDataExamDetail] = useState([]);
 //Api จาก Exam Table
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
        const response = await fetch(
          url+"/select_data/DetailExam"
        );
        const dataDetail = await response.json();
        console.log("Feact ExamDetail:", dataDetail);

        const formattedDataExamDetail = dataDetail.map((item) => ({
          ref: item.ref,
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

  //เปลี่ยนค่าในช่อง INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };
  //เช็คว่ากรอกครบไหม
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", Data);
    if (!Data.total) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
  };
  //Set ข้อมูล Examtable - Detail
  const handleIdChangeWithref = (selectedOption) => {
    const selectedDetail = dataExamDetail.find(detail => detail.ref === selectedOption.ref) || {};
    setData({
      ...Data,
      Ref: selectedOption.ref,
      NoSt: selectedOption.NoSt,
      Lecturer: selectedOption.Lecturer,
      eDate: selectedOption.eDate,
      eTime: selectedOption.eTime,
      hr: selectedOption.hr,
      copy: selectedDetail.copy,
      page: selectedDetail.page,
      color: selectedDetail.color,
      sub_date: new Date(),
      staple_conner: selectedDetail.staple_conner,
      staple_apart : selectedDetail.staple_apart,
      calculator : selectedDetail.calculator,
      answerBookUse : selectedDetail.answerBookUse,
      remark : selectedDetail.remark,
    });
    console.log("Selected option:", selectedOption);
    console.log("Select Detail : ", selectedDetail);
  };

  //css select 
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
    <div className="body-form">
      <form className="container-form" onSubmit={handleSubmit} >
        <h1>โปรแกรมห้องข้อสอบ</h1>

        <div>
          <label htmlFor="type">ชื่อวิชา:</label>
          <Select options={dataE} onChange={handleIdChangeWithref} styles={customStyles} />
          <br></br>
          <br></br>
          <label htmlFor="page">Ref</label>
          <input
            className="form-row"
            type="text"
            id="ref"
            name="ref"
            value={Data.Ref}
          />
          <br></br>
          <br></br>
          <label htmlFor="Lecturer">ชื่อ อาจาร์ย:</label>
          <input
            className="form-row"
            type="text"
            id="Lecturer"
            name="Lecturer"
            value={Data.Lecturer}
          />
          <br></br>
          <br></br>
          <label htmlFor="page">วันสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Examday"
            name="Examday"
            value={Data.eDate}
          />
          <label htmlFor="page">เวลาสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Timex"
            name="Timex"
            value={Data.eTime}
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
          />
          <label htmlFor="page">จำนวน นศ.</label>
          <input
            className="form-row"
            type="text"
            id="NoSt"
            name="NoSt"
            value={Data.NoSt}
          />
          <label htmlFor="page">สถานะการส่งข้อสอบ</label>
          <input
            className="form-row"
            type="text"
            id="Submit"
            name="Submit"
            value={Data.submit ? "ส่งแล้ว" : "ยังไม่ได้ส่ง"}
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
              value="ใช้ได้"
              checked={Data.calculator === "ใช้ได้"}
              onChange={handleChange}
            />
            <label htmlFor="calculator-yes">ใช้ได้</label>
            <input
              type="radio"
              id="Calculator-no"
              name="calculator"
              value="ใช้ไม่ได้"
              checked={Data.calculator === "ใช้ไม่ได้"}
              onChange={handleChange}
            />
            <label htmlFor="Calculator-no">ใช้ไม่ได้</label>
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
            <label htmlFor="AnswerBookUse">เงื่อนไขการสอบ:</label>
            <input
              type="text"
              id="AnswerBookUse"
              name="answerBookUse"
              value={Data.answerBookUse}
              onChange={handleChange}
            />
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
  );
};

export default Form;
