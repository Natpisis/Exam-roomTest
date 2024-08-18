import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import "./Examform.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function Examform(props) {
    console.log(props)

  const [isContentVisible, setIsContentVisible] = useState(false);
  const componentRef = useRef();
  //console.log(props.ref) 
  // สร้าง state เพื่อเก็บข้อมูลจาก API รายละเอียดข้อสอบ
  const [examDetails, setExamDetails] = useState([]);
  // สร้าง state เพื่อเก็บข้อมูลจาก API ห้องสอบ
  const [roomExam, setRoomExam] = useState([]);

  useEffect(() => {
    async function getData() {
      const data_detailexam = await fetch(
        "https://4327-2405-9800-b520-3a6f-4c47-28d8-ce86-dbc5.ngrok-free.app/select_data/detailexam"
      );
      const respond_detailexam = await data_detailexam.json();

      const data_roomexam = await fetch(
        "https://4327-2405-9800-b520-3a6f-4c47-28d8-ce86-dbc5.ngrok-free.app/select_data/roomexam"
      );
      const respond_roomexam = await data_roomexam.json();

      // เก็บข้อมูล API ที่ดึงมาใน state
      setExamDetails(respond_detailexam);
      setRoomExam(respond_roomexam);
    }
    getData();
  }, []);

  // ฟังก์ชันสำหรับการพิมพ์
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "แบบฟอร์มข้อสอบต้นฉบับ",
    pageStyle: "@page { size: A4; margin: 10mm; }", // ปรับขนาดหน้าและ margin สำหรับ A4
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsContentVisible(true);
        resolve();
      });
    },
    onAfterPrint: () => setIsContentVisible(false),
  });

  return (
    <div className="App">
      {/* ปุ่มสำหรับพิมพ์ */}
      <Button className="no-print" onClick={handlePrint} variant="primary">
        พิมพ์แบบฟอร์มข้อสอบต้นฉบับ
      </Button>
      <div className="hidden">
        {/* เนื้อหาที่จะพิมพ์ */}
        <div className={`content ${isContentVisible ? "content-visible" : ""}`}>
          <Card ref={componentRef} className="print-section mt-2 p-2">
            <Card.Body>
              <div className="exam-info-row d-flex justify-content-between mb-2">
                <p className="pdfprint">
                  ทำข้อสอบสี :{" "}
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].color : ""}
                  </span>
                </p>
                <p className="pdfprint">
                  ลำดับ :
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].NoSt : ""}
                  </span>
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].ref : ""}
                  </span>
                </p>
              </div>
              <hr />
              <p className="pdfprint mb-1">
                วิชา:{" "}
                <span style={{ color: "red" }}>
                  {roomExam.length > 0 ? roomExam[0].Course : ""}
                </span>
              </p>
              <div className="exam-time-row d-flex justify-content-between mb-2">
                <p className="pdfprint">
                  วันสอบ :{" "}
                  <span style={{ color: "red" }}>
                    {roomExam.length > 0 ? roomExam[0].Edate : ""}
                  </span>
                </p>
                <p className="pdfprint">
                  เวลา :
                  <span style={{ color: "red" }}>
                    {roomExam.length > 0 ? roomExam[0].Etime : ""}
                  </span>
                </p>
                <p className="pdfprint">
                  จำนวน :
                  <span style={{ color: "red" }}>
                    {roomExam.length > 0 ? roomExam[0].Hr : ""}
                  </span>{" "}
                  ชั่วโมง
                </p>
              </div>
              <hr />
              <div className="exam-time-row d-flex justify-content-between mb-2">
                <h2 className="headerprintpdf">***รายระเอียดข้อสอบ***</h2>
                <p className="pdfprint">
                  ข้อสอบมี:
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].copy : ""}
                  </span>{" "}
                  ชุด
                </p>
              </div>
              <p className="pdfprint mb-1">
                จำนวนข้อสอบ :
                <span style={{ color: "red" }}>
                  {examDetails.length > 0 ? examDetails[0].page : ""}
                </span>{" "}
                หน้า{" "}
                <span style={{ color: "red" }}>
                  {examDetails.length > 0 ? examDetails[0].staple_apart : ""}
                </span>
              </p>
              <div className="exam-time-row d-flex justify-content-between mb-2">
                <p className="pdfprint">
                  การเย็บข้อสอบ :{" "}
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].staple_apart : ""}
                  </span>
                </p>
                <p className="pdfprint">
                  เครื่องคำนวณ :{" "}
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].calculator : ""}
                  </span>
                </p>
              </div>
              <div className="exam-time-row d-flex justify-content-between mb-2">
                <p className="pdfprint">
                  กระดาษคำตอบ :{" "}
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].answerSheet : ""}
                  </span>
                </p>
                <p className="pdfprint">
                  สมุดคนละ :{" "}
                  <span style={{ color: "red" }}>
                    {examDetails.length > 0 ? examDetails[0].answerBookUse : ""}
                  </span>{" "}
                  เล่ม
                </p>
              </div>
              <p className="pdfprint mb-1">
                จำนวนนักศึกษา :{" "}
                <span style={{ color: "red" }}>
                  {examDetails.length > 0 ? examDetails[0].NoSt : ""}
                </span>{" "}
                หมายเหตุ :{" "}
                <span style={{ color: "red" }}>
                  {examDetails.length > 0 && examDetails[0].remark
                    ? examDetails[0].remark
                    : "ไม่มีหมายเหตุ"}
                </span>
              </p>
              <p className="pdfprint mb-1" style={{ textAlign: "center" }}>
                ลงชื่อ........................................ กรรมการออกข้อสอบ
              </p>
              <p
  className="pdfprint mb-1"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  ( <span style={{ color: "red" }}></span> )
</p>
              <div className="exam-time-row d-flex justify-content-between mb-2">
                <p className="pdfprint">
                  โทรศัพท์มือถือที่ติดต่อได้........................................
                </p>
                <p className="pdfprint">
                  E-mail...............................................
                </p>
              </div>
              <hr />
              <div>
                <h2 className="headerprintpdf">***สำหรับกรรมการคุมสอบ***</h2>
              </div>
              <div className="table-container">
                {/* ส่วนของตาราง */}
                <Table bordered className="w-50 me-2 mb-2">
                  <thead>
                    <tr>
                      <th>ห้องสอบ</th>
                      <th>จำนวน นศ</th>
                      <th>ข้อสอบสำรอง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                <Table bordered className="w-50 mb-2">
                  <thead>
                    <tr>
                      <th>ห้องสอบ</th>
                      <th>จำนวน นศ</th>
                      <th>ข้อสอบสำรอง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="d-flex flex-column">
                <div className="mb-1">
                  <input type="checkbox" id="checkbox1" />
                  <label htmlFor="checkbox1" className="ms-2">
                    ผู้รับข้อสอบ.................................................
                  </label>
                </div>
                <div className="mb-1">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2" className="ms-2">
                    สำเนา/copy Print โดย......................................
                  </label>
                </div>
                <div className="mb-1">
                  <input type="checkbox" id="checkbox3" />
                  <label htmlFor="checkbox3" className="ms-2">
                    บรรจุซอง โดย...............................................
                    จำนวน........ซอง
                  </label>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Examform;
