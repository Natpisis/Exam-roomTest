import  { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Altexamcalform.css";

function Altexamcalform() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "แบบฟอร์มคำนวนจำนวนข้อสอบ",
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      body { font-size: 14px; } 
      .card { padding: 0; }
      .card-body { padding: 10px; }
      .table { height: 50vh; } /* Set table height to half the viewport height */
      .table td, .table th { height: calc(50vh / 7); } /* Distribute the height equally */
    `,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setIsContentVisible(true);
        resolve();
      });
    },
    onAfterPrint: () => setIsContentVisible(false),
  });

  /*
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
*/
  return (
    <div className="app">
      <Button className="no-print" onClick={handlePrint} variant="primary">
        พิมพ์แบบฟอร์มคำนวนจำนวนข้อสอบ
      </Button>
      <div className="hidden">
      <div className={`content ${isContentVisible ? "content-visible" : ""}`} >
        <Card ref={componentRef} className="print-section mt-2 p-2">
          <Card.Body>
            <h2 className="text-center mb-4">
              แบบฟอร์มคำนวนจำนวนข้อสอบ กรณีมีข้อสอบ 2 ชุด
            </h2>
            <p
              className="caurse-no text-center"
              style={{ textAlign: "center" }}
            >
              วิชา :
              ..........................................................
              ลำดับ : .........................
            </p>
            <Table bordered className="table">
              <thead>
                <tr>
                  <th>ห้องข้อสอบ</th>
                  <th>จำนวน นศ</th>
                  <th>ข้อสอบชุด 1</th>
                  <th>สำรองชุด 1</th>
                  <th>ข้อสอบชุด 2</th>
                  <th>สำรองชุด 2</th>
                  <th>จำนวนซอง</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index}>
                    {index === 5 ? (
                      <>
                        <td>รวม</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </>
                    ) : (
                      [...Array(7)].map((_, cellIndex) => (
                        <td key={cellIndex}></td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <p>
                  ทำข้อสอบชุด 1 จำนวน:{" "}
                  <input
                    type="text"
                    className="border rounded-pill"
                    style={{ width: "100px", height: "30px" }}
                  />
                </p>
                <p>
                  ทำข้อสอบชุด 2 จำนวน:{" "}
                  <input
                    type="text"
                    className="border rounded-pill"
                    style={{ width: "100px", height: "30px" }}
                  />
                </p>
              </div>
              <div>
                <p>
                  จำนวนห้องข้อสอบ:{" "}
                  <input
                    type="text"
                    className="border rounded-pill"
                    style={{ width: "100px", height: "30px" }}
                  />
                </p>
                <p className="caurse-no text-center">วันที่............................................</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      </div>
    </div>
  );
}

export default Altexamcalform;
