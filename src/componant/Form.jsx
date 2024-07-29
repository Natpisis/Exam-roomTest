import { useState, useEffect } from "react";
import "./Form.css";
import Select from "react-select";




const Form = () => {
  /*const [formData, setFormData] = useState({
    total: '',
    page: '',
    color: '',
    date:'',
    type:'',
    calculator:'',
    paperans:'',
    conditions:'',
    fileexam:''
  });''*/
  
  const [Data, setData] = useState({
    Ref: "", // เลขลำดับ
    NoSt: "0", // จำนวนนศ
    Submit: "", //ส่งข้อสอบยัง
    SubDate: new Date(), //วันที่
    name: "อ. พู่",
    Copy: 2, // จำนวนชุด
    Page: 10, //มีกี่หน้า
    Receive: true, //มารับข้อสอบยัง
    RecDate: "2024-07-17", //
    Qty: 5, //----จำนวนข้อสอบ
    StapleApart: "", //เย็บยังไง
    Calculator: true, //เครื่องคิดเลข
    AnswerSheet: false, //ใช้กระดาษคำตอบไหม
    AnswerBookUse: "Math Book", //เปิดหนังสือได้ไหม
    Remark: "Urgent",
    Color: "Blue", //สีข้อสอบ
    Examday: new Date(),
    Timex: "12.00 - 14.00",
    hour: "3 hr",
  });

  

  const [dataE, setDatae] = useState([]);
  useEffect(() => {
    async function read_data_database() {
      try {
        const response = await fetch(
          "https://657c-184-22-13-155.ngrok-free.app/select_data/Examtable"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Inspect data structure

        // Transform the data into the format required by react-select
        const formattedOptions = data.map((item) => ({
          ref: item.ref, // Replace with the unique identifier
          course: item.Course,
          Lecturer: item.Lecturer,
          eDate: item.eDate,
          eTime: item.eTime,
          hr: item.hr,
          NoSt: item.no_st,
          label: item.Course,
        }));
        setDatae(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    read_data_database();
  }, []);
  console.log(dataE);

  //let ttt = formData.total +','+ formData.page+','+ formData.color+','+ formData.date+','+ formData.type+','+ formData.calculator+','+ formData.paperans+','+ formData.conditions;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", Data);
    //console.log(ttt);
    if (!Data.total) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
  };

  /*const insert = async () => {
    try {
         await axios.post('https://6228-184-22-12-234.ngrok-free.app/insert_detail_exam/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            } ,
        });

    } 
    catch (error) {

         }
    };*/
  const handleIdChangeWithid = (selectedOption) => {
    setData({ ...Data, Ref: selectedOption.ref, NoSt: selectedOption.NoSt });
    console.log("Selected option:", selectedOption);
  };

  return (
    <div className="body-form">
    <form className="container-form" onSubmit={handleSubmit}>
      <h1>โปรแกรมห้องข้อสอบ</h1>
      
      <div>
        <label htmlFor="type">ชื่อวิชา:</label>

        <Select options={dataE} onChange={handleIdChangeWithid} />

        <br></br>

        <br></br>

        <label htmlFor="name">ชื่อ อาจาร์ย:</label>

        <input
          className="form-row"
          type="text"
          id="name"
          name="name"
          value={Data.name}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <label htmlFor="page">วันสอบ</label>

        <input
          className="form-row"
          type="date"
          id="Examday"
          name="Examday"
          value={Data.Examday}
          onChange={handleChange}
        />

        <label htmlFor="page">เวลาสอบ</label>

        <input
          className="form-row"
          type="text"
          id="Timex"
          name="Timex"
          value={Data.Timex}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <label htmlFor="page">ชั่วโมง</label>

        <input
          className="form-row"
          type="text"
          id="hour"
          name="hour"
          value={Data.hour}
          onChange={handleChange}
        />

        <label htmlFor="page">จำนวน นศ.</label>

        <input
          className="form-row"
          type="text"
          id="NoSt"
          name="NoSt"
          value={Data.NoSt}
          onChange={handleChange}
        />

        <label htmlFor="page">สถานะการส่งข้อสอบ</label>

        <input
          className="form-row"
          type="text"
          id="Submit"
          name="Submit"
          value={Data.Submit}
          onChange={handleChange}
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
              name="Copy"
              value={Data.Copy}
              onChange={handleChange}
            />

            <label htmlFor="total">จำนวนหน้า:</label>
            <input
              className="form-row"
              type="text"
              id="Page"
              name="Page"
              value={Data.Page}
              onChange={handleChange}
            />

            <label htmlFor="color">สีข้อสอบ:</label>
            <input
              type="text"
              id="Color"
              name="Color"
              value={Data.Color}
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
            name="SubDate"
            value={Data.SubDate}
            onChange={handleChange}
          />

          <label htmlFor="StapleApart">รูปแบบการเย็บ:</label>
          <input
            type="datalist"
            id="StapleApart"
            name="StapleApart"
            list="typerOptions"
            value={Data.StapleApart}
            onChange={handleChange}
          />
          <datalist id="typerOptions">
            <option value="แนวขวาง"></option>
            <option value="แนวตรง"></option>
            <option value="เย็บมุม"></option>
          </datalist>
          <br></br>
          <br></br>
        </div>

        <div>
          <label>Calculator:</label>

          <input
            type="radio"
            id="Calculator-yes"
            name="Calculator"
            value="ใช้ได้"
            checked={Data.Calculator === "ใช้ได้"}
            onChange={handleChange}
          />
          <label htmlFor="calculator-yes">ใช้ได้</label>

          <input
            type="radio"
            id="Calculator-no"
            name="Calculator"
            value="ใช้ไม่ได้"
            checked={Data.Calculator === "ใช้ไม่ได้"}
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
            name="AnswerSheet"
            value="ใช้ได้"
            checked={Data.AnswerSheet === "ใช้ได้"}
            onChange={handleChange}
          />
          <label htmlFor="AnswerSheet-yes">ใช้ได้</label>

          <input
            type="radio"
            id="AnswerSheet-no"
            name="AnswerSheet"
            value="ใช้ไม่ได้"
            checked={Data.AnswerSheet === "ใช้ไม่ได้"}
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
            name="AnswerBookUse"
            value={Data.AnswerBookUse}
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
            value={Data.fileexam}
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
